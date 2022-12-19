from flask import Blueprint, request, jsonify, session, make_response
from flask_login import login_user, logout_user, current_user,login_required
from spending import Spending
from category import Category
from datetime import datetime, timedelta
from user import User
import json


spending_bp = Blueprint('spendings', __name__)
user_bp = Blueprint('user', __name__)
category_bp = Blueprint('categories',__name__)

@user_bp.route('/login', methods=["POST","GET"])
def login():
    email = request.args.get('email')
    password = request.args.get('password')
    if password and email:
        user = User.query.filter_by(email=email).first()
        if user:
            if user.password == password:
                login_user(user)
                response = make_response({'response': 'ok'})
                response.headers['Access-Control-Allow-Credentials'] = 'true'
                return response
            else:
                response = make_response({'response': 'wrongpass'})
                response.headers['Access-Control-Allow-Credentials'] = 'true'
                return response,404
        else:
            response = make_response({'response': 'nouser'})
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            return response,404
    else:
        response = make_response({'response': 'empty'})
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response,404

@user_bp.route('/verifysession')  
def verify_session():
    if current_user.is_authenticated:
        if User.query.filter_by(id=session['_user_id']):
            response = make_response({'response': 'ok'})
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            return response
    else:
        response = make_response({'response': 'notok'})
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

@user_bp.route('/userdetails')
def get_user_details():
    if current_user.is_authenticated:
        id=current_user.id
        user_details = User.user_details(id)
        response = make_response(user_details)
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
    else: 
        response = make_response({"username":"none",'email':'none'})
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
    
@user_bp.route('/verifyemail')
def verify_email():
    email=request.args.get('email')
    if(User.query.filter_by(email=email).first()):
        return {"response":"True"}
    else:
        return {"response":"False"}

@user_bp.route('/logout')
def logout():
    session.pop('id', None)
    logout_user()
    response = make_response({'response': 'logged out'})
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


@user_bp.route('/register', methods=["POST","GET"]) 
def create_user():
    name = request.args.get('full_name')
    email = request.args.get('email')
    password = request.args.get('password')
    confirm_password = request.args.get('confirm_password')
    if User.query.filter_by(email=email).first():
        return {'response':'used'},404
    if password == confirm_password:
        User.create(name, email, password)
        return {'response':'registered'},201
    else:
        return {'response':'different'},404

@spending_bp.route("/insertspending",methods=["POST"])
def insert_spending():
    name = request.args.get('name')
    category = request.args.get('category')
    value = float(request.args.get('value'))
    currency = request.args.get("currency")
    date = datetime.strptime(request.args.get('date'),'%d/%m/%Y')
    email = request.args.get('email')
    Spending.create(name,category,value,currency,date,email)
    return {'response':'Spending inserted'},200

@spending_bp.route("/retrievespendings",methods=["GET"])
def retrieve_spendings():
    email = request.args.get('email')
    start = datetime.strptime(request.args.get('start'),'%d/%m/%Y')
    end = datetime.strptime(request.args.get('end'),'%d/%m/%Y')
    spendings = Spending.read(email,start,end)
    return jsonify({'spendings':spendings})

@spending_bp.route("/updatespending",methods=["PUT"])
def update_spending():
    id = int(request.args.get('id'))
    name = request.args.get('name')
    category = request.args.get('category')
    value = float(request.args.get('value'))
    currency = request.args.get("currency")
    date = datetime.strptime(request.args.get('date'),'%d/%m/%Y')
    print(date)
    Spending.update(id,name,category,value,currency,date)
    return {'response':'Spending updated'},200

@spending_bp.route("/deletespending",methods=["DELETE"])
def delete_spending():
    id = int(request.args.get('id'))
    Spending.delete(id)
    return {'response':f'Spending with ID {id} deleted'},200

@spending_bp.route("/average",methods=["GET"])
def calculate_average():
    email = request.args.get('email')
    start = datetime.strptime(request.args.get('start'),'%d/%m/%Y')
    end = datetime.strptime(request.args.get('end'),'%d/%m/%Y')
    average = Spending.average(email,start,end)
    return average

@spending_bp.route("/total",methods=["GET"])
def calculate_total():
    email = request.args.get('email')
    start = datetime.strptime(request.args.get('start'),'%d/%m/%Y')
    end = datetime.strptime(request.args.get('end'),'%d/%m/%Y')
    total = Spending.total(email,start,end)
    return total

@spending_bp.route("/accountdata",methods=["GET"])
def get_biggest_spending():
    email = request.args.get('email')
    start = datetime.strptime(request.args.get('start'),'%d/%m/%Y')
    end = datetime.strptime(request.args.get('end'),'%d/%m/%Y')
    response = Spending.accountData(email,start,end)
    return response

@spending_bp.route("/linechart",methods=["GET"])
def line_chart_data():
    delta = timedelta(days=1)
    chart_data = []
    email = request.args.get('email')
    start = datetime.strptime(request.args.get('start'),'%d/%m/%Y')
    end = datetime.strptime(request.args.get('end'),'%d/%m/%Y')
    while start <= end:
        chart_data.append({"value":Spending.total(email,start,start),"date":start})
        start += delta
    return {"data": chart_data}

@spending_bp.route("/piebarchart",methods=["GET"])
def pie_bar_chart():
    chart_data = []
    email = request.args.get('email')
    start = datetime.strptime(request.args.get('start'),'%d/%m/%Y')
    end = datetime.strptime(request.args.get('end'),'%d/%m/%Y')
    categories = Category.read()
    categories.remove("All")
    for ct in categories:
        chart_data.append({"total":Spending.totalFilter(email,start,end,ct),"category":ct})
    return {"data": chart_data}


@category_bp.route("/insertcategory",methods=["POST"])
def insert_category():
    category = request.args.get("name")
    Category.create(category)
    return {'response':'Category inserted'},200

@category_bp.route("/readcategories",methods=["GET"])
def get_categories():
    categories = Category.read()
    return {'categories':categories},200

def insert_categories():
    categories_file = open('jsonFiles/categories.json')
    categories = json.load(categories_file)
    for category in categories['categories']:
        exists = Category.query.filter_by(name=category['name']).first()
        if not exists:
            Category.create(category['name'])
    categories_file.close()

insert_categories()