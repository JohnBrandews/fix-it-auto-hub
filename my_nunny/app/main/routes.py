from flask import render_template, redirect, url_for, flash
from flask_login import current_user, login_required
from app.main import bp
# from app.models import User, ClientRequisition, Service # etc. - will be used later

@bp.route('/')
@bp.route('/index')
def index():
    # Later this will display client requisitions
    return render_template('index.html', title='Home - Welcome to My Nunny')

@bp.route('/about') # Changed from about_us to align with plan
def about_us(): # Kept function name as about_us for clarity if preferred, or can change to about
    return render_template('about_us.html', title='About Us')


# Placeholder dashboards - to be fleshed out later
@bp.route('/nunny_dashboard')
@login_required
def nunny_dashboard():
    if not current_user.is_authenticated or current_user.role != 'nunny': # More robust check
        flash("Access denied. You must be logged in as a Nunny to view this page.", "warning")
        return redirect(url_for('main.index'))
    # Later: Fetch client requisitions
    return render_template('nunny_dashboard.html', title='Nunny Dashboard')

@bp.route('/client_dashboard')
@login_required
def client_dashboard():
    if not current_user.is_authenticated or current_user.role != 'client': # More robust check
        flash("Access denied. You must be logged in as a Client to view this page.", "warning")
        return redirect(url_for('main.index'))
    # Later: Fetch nunny profiles
    return render_template('client_dashboard.html', title='Client Dashboard')
