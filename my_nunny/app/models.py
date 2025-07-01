from datetime import datetime, timedelta # Added timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import db, login # Assuming db and login are initialized in app/__init__.py
from flask import current_app
import jwt
from time import time


# Helper table for the many-to-many relationship between Nunnies and Services
nunny_services = db.Table('nunny_services',
    db.Column('nunny_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('service_id', db.Integer, db.ForeignKey('service.id'), primary_key=True)
)

class User(UserMixin, db.Model):
    __tablename__ = 'user' # Explicitly define table name
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), index=True)
    last_name = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    gender = db.Column(db.String(10))
    id_number = db.Column(db.String(64), unique=True, index=True)
    id_image_path = db.Column(db.String(256))
    profile_picture_path = db.Column(db.String(256))
    is_verified = db.Column(db.Boolean, default=False, index=True, nullable=False)
    role = db.Column(db.String(10), index=True, nullable=False) # nunny or client

    # Nunny specific fields
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    county_id = db.Column(db.Integer, db.ForeignKey('county.id'))
    age_range = db.Column(db.String(20))

    # Using a string for services_offered relationship to avoid import issues if Service is defined later
    services_offered = db.relationship(
        'Service', secondary=nunny_services,
        back_populates='nunnies', lazy='dynamic') # Changed backref to back_populates

    # Client specific fields
    service_description_needed = db.Column(db.Text)
    daily_rate_offered = db.Column(db.Float)

    # Relationships
    # For Nunny role:
    region = db.relationship('Region', foreign_keys=[region_id], back_populates='users_in_region')
    county = db.relationship('County', foreign_keys=[county_id], back_populates='users_in_county')

    # For Client role:
    client_requisitions_authored = db.relationship('ClientRequisition', back_populates='author_client_user', lazy='dynamic', foreign_keys='ClientRequisition.client_id')

    # For Ratings:
    # Ratings given by this user (if they are a Nunny)
    ratings_given_by_user = db.relationship('Rating', back_populates='rater_nunny_user', lazy='dynamic', foreign_keys='Rating.nunny_id')
    # Ratings received by this user (if they are a Client)
    ratings_received_by_user = db.relationship('Rating', back_populates='rated_client_user', lazy='dynamic', foreign_keys='Rating.client_id')


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        if self.password_hash is None: # Handle cases where password might not be set (e.g. social logins in future)
            return False
        return check_password_hash(self.password_hash, password)

    def get_verification_token(self, expires_in=3600): # Token expires in 1 hour
        return jwt.encode(
            {'verify_email': self.id, 'exp': time() + expires_in},
            current_app.config['SECRET_KEY'], algorithm='HS256')

    @staticmethod
    def verify_verification_token(token):
        try:
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = payload.get('verify_email')
            if user_id is None: return None
            return db.session.get(User, user_id) # Use db.session.get for SQLAlchemy 2.0+
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, jwt.DecodeError): # Catch more specific JWT errors
            return None

    def get_reset_password_token(self, expires_in=900): # Token expires in 15 minutes
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            current_app.config['SECRET_KEY'], algorithm='HS256')

    @staticmethod
    def verify_reset_password_token(token):
        try:
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = payload.get('reset_password')
            if user_id is None: return None
            return db.session.get(User, user_id)
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, jwt.DecodeError):
            return None

    def __repr__(self):
        return f'<User {self.id}: {self.email} ({self.role})>'

@login.user_loader
def load_user(user_id): # Parameter name changed to user_id for clarity
    return db.session.get(User, int(user_id))

class Region(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, index=True, nullable=False)
    # Relationship back to User (Nunnies in this region)
    users_in_region = db.relationship('User', back_populates='region', lazy='dynamic', foreign_keys='User.region_id')
    # Relationship to Counties in this Region
    counties_in_region = db.relationship('County', back_populates='region_of_county', lazy='dynamic', foreign_keys='County.region_id')

    def __repr__(self):
        return f'<Region {self.id}: {self.name}>'

class County(db.Model):
    __tablename__ = 'county'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'), nullable=False)
    # Relationship back to User (Nunnies in this county)
    users_in_county = db.relationship('User', back_populates='county', lazy='dynamic', foreign_keys='User.county_id')
    # Relationship back to Region
    region_of_county = db.relationship('Region', back_populates='counties_in_region', foreign_keys=[region_id])


    def __repr__(self):
        return f'<County {self.id}: {self.name} in Region ID {self.region_id}>'

class Service(db.Model):
    __tablename__ = 'service'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True, index=True, nullable=False)
    description = db.Column(db.String(256))
    # Relationship to Nunnies offering this service
    nunnies = db.relationship(
        'User', secondary=nunny_services,
        back_populates='services_offered', lazy='dynamic') # Changed backref to back_populates


    def __repr__(self):
        return f'<Service {self.id}: {self.name}>'

class ClientRequisition(db.Model):
    __tablename__ = 'client_requisition'
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    amount_offered_daily = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # Relationship back to the User (Client) who authored this
    author_client_user = db.relationship('User', back_populates='client_requisitions_authored', foreign_keys=[client_id])

    # Relationship to ratings received for this requisition
    ratings_for_requisition = db.relationship('Rating', back_populates='rated_requisition_detail', lazy='dynamic', foreign_keys='Rating.requisition_id')


    def __repr__(self):
        return f'<ClientRequisition ID {self.id} by Client ID {self.client_id}>'


class Rating(db.Model):
    __tablename__ = 'rating'
    id = db.Column(db.Integer, primary_key=True)
    nunny_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # Nunny who is rating
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # Client being rated
    requisition_id = db.Column(db.Integer, db.ForeignKey('client_requisition.id'), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # Relationship back to User (Nunny who gave the rating)
    rater_nunny_user = db.relationship('User', back_populates='ratings_given_by_user', foreign_keys=[nunny_id])
    # Relationship back to User (Client who received the rating)
    rated_client_user = db.relationship('User', back_populates='ratings_received_by_user', foreign_keys=[client_id])
    # Relationship back to the ClientRequisition this rating is for
    rated_requisition_detail = db.relationship('ClientRequisition', back_populates='ratings_for_requisition', foreign_keys=[requisition_id])


    def __repr__(self):
        return f'<Rating {self.stars} stars for Client ID {self.client_id} by Nunny ID {self.nunny_id} for Req ID {self.requisition_id}>'
