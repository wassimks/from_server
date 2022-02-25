from wsgiref.validate import validator
from app import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return users.query.get(int(user_id))


class users(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True )
    username = db.Column(db.String() )
    password = db.Column(db.String() )

class quizz(db.Model):
    id= db.Column(db.Integer(), primary_key=True)
    question= db.Column(db.BLOB())
    propositions= db.Column(db.BLOB())
    r_prop= db.Column(db.TEXT())
    year= db.Column(db.Integer())
    unit= db.Column(db.String())
    module= db.Column(db.String())
    creator= db.Column(db.String())
    rate= db.Column(db.Integer())