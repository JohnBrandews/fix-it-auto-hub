from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
from flask_bootstrap import Bootstrap4

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = 'auth.login'
login.login_message_category = "info"
mail = Mail()
bootstrap = Bootstrap4()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    mail.init_app(app)
    bootstrap.init_app(app)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    # Import and register the main blueprint (will be created fully in next steps)
    from app.main import bp as main_bp # Ensure this import is here
    app.register_blueprint(main_bp)


    # Add a context processor to make 'now' available in all templates (for footer year)
    from datetime import datetime
    @app.context_processor
    def inject_now():
        return {'now': datetime.utcnow}

    if not app.debug and not app.testing:
        import logging
        from logging.handlers import RotatingFileHandler
        import os
        if not os.path.exists('logs'):
            os.makedirs('logs', exist_ok=True) # Added exist_ok=True
        file_handler = RotatingFileHandler('logs/my_nunny.log', maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('My Nunny startup')

    return app

# Import models here to ensure they are known to Flask-Migrate
# but after db is defined to avoid circular imports if models use db.
from app import models # This should be fine here.
# If models.py also imports 'app' directly for 'db' or 'login',
# ensure it's not creating a circular dependency that breaks at import time.
# Typically, models import 'db' from 'app' or 'current_app.extensions['sqlalchemy'].db'
# The current structure where models.py imports 'db' from 'app' (which is the current __init__.py)
# should work as 'db' is defined before this import.
