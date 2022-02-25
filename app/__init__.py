import pathlib
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
import sqlite3
import pathlib, os

from sqlalchemy import Unicode

app=Flask(__name__)


try:
    app.config['SECRET_KEY']= os.environ['SCRTK']
except:
    app.config['SECRET_KEY']= "wassimks98761234"
""" print(os.environ['SCRTK']) """

login_manager=LoginManager(app)
login_manager.login_view="get_login"

pd='sqlite://'+str(pathlib.Path().resolve())+'/app/test.db'

print(pd)

app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///test.db'
db=SQLAlchemy(app)


from . import views