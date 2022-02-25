from ast import Return
from crypt import methods
import json

from flask import current_app, redirect, request, session, abort, make_response
from flask_login import current_user, login_required, login_user, logout_user
from flask.templating import render_template
from sqlalchemy import JSON

from .database import quizz, users
from .dbManagement import *

from app import app, db


@app.route('/login', methods=['GET', 'POST'])
def get_login():
    msg = ''
    r_f = request.form

    if request.method == 'POST':
        if 'username' and 'password' in r_f:
            matched_user = users.query.filter_by(
                username=r_f.get('username')).one()
            if matched_user.username and matched_user.password == r_f.get(
                    'password'):
                login_user(matched_user)
                print('[LOGIN]: user matched successfully and user loged in')
                next = request.args.get('next')
                if next:
                    return redirect(next)
                else:
                    return redirect(request.url_root)
            else:
                print(
                    '[LOGIN]: user not loged in, probably because of unfoundable user name or unmatched password'
                )
        else:
            print(
                '[LOGIN]: user not loged in, probably because of empty name or password field'
            )
            print(r_f['username'])
            print(r_f['password'])
            return redirect(request.url_root)

    return render_template('registration/login.html')


@app.route('/register', methods=['GET', 'POST'])
def get_register():
    msg = ''

    r_f = request.form
    if request.method == 'POST':
        if 'n_username' and 'n_password' and 'n_c_password' in r_f:
            username = r_f['n_username']
            password = r_f['n_password']
            c_password = r_f['n_c_password']
            if password == c_password:
                new_user = users(username=username, password=password)
                db.session.add(new_user)
                db.session.commit()
                login_user(new_user)
                print('[REGISTER]: user had been added successfully')
                return redirect(request.url_root)
            else:
                print(
                    '[REGISTER]: user had not been added, probably because of unmatched password'
                )
                msg = 'password unmatch'
        else:
            print('[REGISTER]: an error occured, user had not been added')
    return render_template('registration/register.html', msg=msg)

@app.route('/logout')
def get_logout():
    logout_user()
    return redirect(request.url_root)


@app.route('/')
def get_first():
    return render_template('home.html')


@app.route('/quizz')
def get_quizz():
    return render_template('/Quizz.html')


@app.route('/profile')
@login_required
def get_profile_p():
    return render_template('profile_p.html')


@app.route('/playing_with_default')
def get_playing_with_default():
    return render_template("playing_with_default.html")


@app.route('/challenge/quizzes')
def get_onevone_p():
    return render_template('online_withf.html')


@app.route('/challenge/openChallenges')
def get_open_challenges():
    return render_template('open_challenge.html')


@app.route('/challenge/createqcm', methods=['GET', 'POST'])
@login_required
def get_create_qcm():
    jsn = request.json
    if jsn:
        print('[CREATE_QCMs]:')
        print(jsn)
        if 'question' and 'prop' and 'r_prop' and 'year' and 'unit' and 'module' in jsn:
            question = jsn.get('question')
            prop = jsn.get('prop')
            r_prop = jsn.get('r_prop')
            year = jsn.get('year')
            unit = jsn.get('unit')
            module = jsn.get('module')

            new_q = quizz(question=question.encode('utf-8'),
                          propositions=prop.encode('utf-8'),
                          r_prop=r_prop,
                          year=year,
                          unit=unit,
                          module=module,
                          creator=current_user.id)
            db.session.add(new_q)
            db.session.commit()
            print('[CREATE_QCMs]: qcm had been added successfully')
        else:
            print(
                '[CREATE_QCMs]: qcm had NOT been added, probably because on of the question elements is missing'
            )
    else:
        print('[CREATE_QCMs]: no json were recieved')
    return render_template('create_qcm.html')


@app.route('/challenge/offline', methods=['GET', 'POST'])
def get_offline_quizz():
    q=''
    allq=[]


    if request.is_json:
        print('[OFFLINE_QUIZZ]: json recieved')
        jsn=request.get_json()

        year=jsn['year']
        unit=jsn['unit']
        module=jsn['module']
        q_num=jsn['q_num']
        t=jsn['t']

        print(year, unit, module)
        q=filter_questions(year, unit, module)
        for i in q:
            oneq={
                'question':'',
                'proposition':'',
                'r_prop':'',
                'creator':''
            }
            oneq['question']=i.question.decode()
            oneq['proposition']=i.propositions.decode()
            oneq['r_prop']=i.r_prop
            oneq['creator']=i.creator
            
            allq.append(oneq)
        allQcms = json.dumps(allq)
        res=make_response(allQcms)
        return res

    return render_template('offline_quizz.html')


@app.route('/challenge/createChallenge')
def get_create_challenge():
    return render_template('create_challenge.html')