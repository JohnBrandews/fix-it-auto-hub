from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, SelectField, TextAreaField, FileField, SelectMultipleField, RadioField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, Length
from app.models import User, Region # Assuming regions will be populated in the DB

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

class NunnyRegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(min=2, max=64)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=2, max=64)])
    gender = SelectField('Gender', choices=[('Female', 'Female'), ('Male', 'Male'), ('Other', 'Other')], validators=[DataRequired()])
    # Regions and Counties will be dynamically populated
    region = SelectField('Region', coerce=int, validators=[DataRequired()])
    county = SelectField('County', coerce=int, validators=[DataRequired()])
    email = StringField('Email Address', validators=[DataRequired(), Email()])
    id_number = StringField('Identification Number (ID/Passport)', validators=[DataRequired()])
    id_image = FileField('Upload ID Image (Front)') # Add more if needed (e.g., back)
    profile_picture = FileField('Upload Profile Picture')
    # Services will be dynamically populated
    services_offered = SelectMultipleField('Services Offered', coerce=int, validators=[DataRequired()])
    age_range = SelectField('Age Range', choices=[
        ('18-25', '18-25'), ('26-35', '26-35'), ('36-45', '36-45'),
        ('46-55', '46-55'), ('56+', '56+')], validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register as Nunny')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')

    def validate_id_number(self, id_number):
        user = User.query.filter_by(id_number=id_number.data).first()
        if user is not None:
            raise ValidationError('This ID number is already registered.')

class ClientRegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(min=2, max=64)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=2, max=64)])
    gender = SelectField('Gender', choices=[('Female', 'Female'), ('Male', 'Male'), ('Other', 'Other')], validators=[DataRequired()])
    email = StringField('Email Address', validators=[DataRequired(), Email()])
    id_number = StringField('Identification Number (ID/Passport)', validators=[DataRequired()])
    id_image = FileField('Upload ID Image')
    profile_picture = FileField('Upload Profile Picture')
    service_description = TextAreaField('Describe Services Needed', validators=[DataRequired(), Length(min=10, max=500)])
    daily_rate = StringField('Daily Rate Offered (Ksh)', validators=[DataRequired()]) # Consider FloatField if strict numeric input is needed and validated
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register as Client')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')

    def validate_id_number(self, id_number):
        user = User.query.filter_by(id_number=id_number.data).first()
        if user is not None:
            raise ValidationError('This ID number is already registered.')


class RequestPasswordResetForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Request Password Reset')

class ResetPasswordForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password')
