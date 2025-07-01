from flask import render_template, redirect, url_for, flash, request
from werkzeug.urls import url_parse
from flask_login import login_user, logout_user, current_user, login_required
from app import db
from app.auth import bp
from app.auth.forms import LoginForm, NunnyRegistrationForm, ClientRegistrationForm, \
    RequestPasswordResetForm, ResetPasswordForm
from app.models import User, Service, Region, County # Added Region, County
from app.auth.email import send_password_reset_email, send_verification_email
# For file uploads
import os
from werkzeug.utils import secure_filename
from flask import current_app

# Helper function to save uploaded files
def save_file(file, subfolder='uploads'):
    if not file or not file.filename: # Added check for empty filename
        return None
    filename = secure_filename(file.filename)
    # Ensure static directory exists at the app level
    static_dir = os.path.join(current_app.root_path, 'static')
    if not os.path.exists(static_dir):
        os.makedirs(static_dir)

    upload_folder = os.path.join(static_dir, subfolder)
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    file_path = os.path.join(upload_folder, filename)
    file.save(file_path)
    # Return a web-accessible path, assuming 'static' is served directly
    return os.path.join(subfolder, filename).replace('\\', '/')


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        # Redirect based on role
        if current_user.role == 'nunny':
            return redirect(url_for('main.nunny_dashboard'))
        elif current_user.role == 'client':
            return redirect(url_for('main.client_dashboard'))
        return redirect(url_for('main.index'))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid email or password')
            return redirect(url_for('auth.login'))

        if not user.is_verified:
            flash('Your account is not verified. Please check your email for a verification link.')
            # Consider adding a 'Resend verification email' link/button here
            # For now, they can try logging in again after verifying or request password reset (which might also trigger verification)
            return redirect(url_for('auth.login'))

        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            if user.role == 'nunny':
                next_page = url_for('main.nunny_dashboard')
            elif user.role == 'client':
                next_page = url_for('main.client_dashboard')
            else:
                next_page = url_for('main.index')
        return redirect(next_page)
    return render_template('auth/login.html', title='Sign In', form=form)

@bp.route('/logout')
@login_required # Good practice to ensure only logged-in users can logout
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('main.index'))


def populate_nunny_form_choices(form):
    form.region.choices = [(0, 'Select Region...')] + [(r.id, r.name) for r in Region.query.order_by('name').all()]

    # Attempt to keep selected county if form is re-displayed due to errors
    current_region_id = form.region.data
    if current_region_id and current_region_id != 0 : # Check if a valid region is selected
        form.county.choices = [(0, 'Select County...')] + [(c.id, c.name) for c in County.query.filter_by(region_id=current_region_id).order_by('name').all()]
    else:
        form.county.choices = [(0, 'Select County...')]

    form.services_offered.choices = [(s.id, s.name) for s in Service.query.order_by('name').all()]
    return form

@bp.route('/register_nunny', methods=['GET', 'POST'])
def register_nunny():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))

    form = NunnyRegistrationForm(request.form if request.method == 'POST' else None) # Handle POST data for county repopulation
    form = populate_nunny_form_choices(form)


    if form.validate_on_submit():
        # Secure file saving
        id_image_file = form.id_image.data
        profile_picture_file = form.profile_picture.data

        id_image_path = save_file(id_image_file, 'id_images') if id_image_file else None
        profile_picture_path = save_file(profile_picture_file, 'profile_pics') if profile_picture_file else None

        nunny = User(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            gender=form.gender.data,
            region_id=form.region.data if form.region.data != 0 else None,
            county_id=form.county.data if form.county.data != 0 else None,
            email=form.email.data,
            id_number=form.id_number.data,
            id_image_path=id_image_path,
            profile_picture_path=profile_picture_path,
            age_range=form.age_range.data,
            role='nunny',
            is_verified=False # Explicitly set to false initially
        )
        nunny.set_password(form.password.data)

        selected_services = Service.query.filter(Service.id.in_(form.services_offered.data)).all()
        for service in selected_services:
            nunny.services_offered.append(service)

        db.session.add(nunny)
        db.session.commit()

        send_verification_email(nunny)
        flash('Congratulations, you are now a registered Nunny! Please check your email to verify your account.')
        return redirect(url_for('auth.login'))

    # If form validation fails, repopulate dynamic choices.
    # This is especially important for counties if a region was selected.
    if request.method == 'POST' and form.errors: # Check if it's a POST request with errors
         form = populate_nunny_form_choices(form)


    return render_template('auth/register_nunny.html', title='Register as Nunny', form=form)

@bp.route('/register_client', methods=['GET', 'POST'])
def register_client():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    form = ClientRegistrationForm()
    if form.validate_on_submit():
        id_image_file = form.id_image.data
        profile_picture_file = form.profile_picture.data

        id_image_path = save_file(id_image_file, 'id_images') if id_image_file else None
        profile_picture_path = save_file(profile_picture_file, 'profile_pics') if profile_picture_file else None

        client = User(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            gender=form.gender.data,
            email=form.email.data,
            id_number=form.id_number.data,
            id_image_path=id_image_path,
            profile_picture_path=profile_picture_path,
            service_description_needed=form.service_description.data,
            daily_rate_offered=float(form.daily_rate.data),
            role='client',
            is_verified=False # Explicitly set to false initially
        )
        client.set_password(form.password.data)
        db.session.add(client)
        db.session.commit()

        send_verification_email(client)
        flash('Congratulations, you are now a registered Client! Please check your email to verify your account.')
        return redirect(url_for('auth.login'))
    return render_template('auth/register_client.html', title='Register as Client', form=form)

@bp.route('/verify_email/<token>')
def verify_email_route(token): # Renamed to avoid conflict with email sending function
    user = User.verify_verification_token(token)
    if not user:
        flash('The verification link is invalid or has expired.')
        return redirect(url_for('main.index')) # Or a specific error page
    if user.is_verified:
        flash('Your account is already verified. Please log in.')
    else:
        user.is_verified = True
        db.session.commit()
        flash('Your email has been verified! You can now log in.')
    return redirect(url_for('auth.login'))


@bp.route('/request_password_reset', methods=['GET', 'POST'])
def request_password_reset():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    form = RequestPasswordResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            send_password_reset_email(user)
            flash('Check your email for the instructions to reset your password. The link will expire in 15 minutes.')
        else:
            # Avoid confirming if email exists for security, but still show generic message
            flash('If an account with that email exists, instructions to reset your password have been sent.')
        return redirect(url_for('auth.login'))
    return render_template('auth/request_password_reset.html',
                           title='Request Password Reset', form=form)

@bp.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    user = User.verify_reset_password_token(token)
    if not user:
        flash('The password reset link is invalid or has expired.')
        return redirect(url_for('main.index'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        user.is_verified = True # Also verify account if not already, as they proved email ownership
        db.session.commit()
        flash('Your password has been reset. You can now log in.')
        return redirect(url_for('auth.login'))
    return render_template('auth/reset_password.html', title="Reset Password", form=form)

# This route would be called by JavaScript to update counties based on region selection
@bp.route('/get_counties_for_region/<int:region_id>')
def get_counties_for_region(region_id):
    if region_id == 0: # Handle 'Select Region...'
        return {'counties': []}
    region = Region.query.get(region_id)
    if not region:
        return {'counties': []} # Or an error
    counties = [{'id': c.id, 'name': c.name} for c in region.counties.order_by('name').all()]
    return {'counties': counties}
