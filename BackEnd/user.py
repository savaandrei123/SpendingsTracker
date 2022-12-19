from __init__ import db, ma
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))
    
    
    def __init__(self, username:str, email:str, password:str):
        self.username = username
        self.email = email
        self.password = password
        
    def create(username, email, password):
        new_user = User(username, email, password)
        db.session.add(new_user)
        db.session.commit()
    
    @staticmethod
    def user_details(id):
        user_details = User.query.filter_by(id=id).first()
        details_schema = UserSchema()
        details = details_schema.dump(user_details)
        print(details)
        return {'name':details['username'],'email':details['email']}

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User