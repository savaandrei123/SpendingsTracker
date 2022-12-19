from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
db = SQLAlchemy()
ma = Marshmallow()

def init_app():
    app = Flask(__name__, instance_relative_config=False)

    app.config.from_object('config.Config')  

    db.init_app(app)
    ma.init_app(app)

    login_manager = LoginManager()
    login_manager.session_protection = "strong"
    login_manager.init_app(app)
    
    
    from user import User
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    with app.app_context():
        from spending import Spending
        from user import User
        from category import Category
        db.create_all()

        from routes import spending_bp as spendings_bp
        from routes import user_bp as users_bp
        from routes import category_bp as category_bp
        app.register_blueprint(spendings_bp)
        app.register_blueprint(users_bp)
        app.register_blueprint(category_bp)
        return app