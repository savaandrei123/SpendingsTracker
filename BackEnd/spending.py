from __init__ import db, ma
from datetime import datetime
from forex_python.converter import CurrencyRates



class Spending(db.Model):
    __tablename__ = "spendings"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    category = db.Column(db.String)
    value_eur = db.Column(db.Float)
    value_usd = db.Column(db.Float)
    value_gbp = db.Column(db.Float)
    value_ron = db.Column(db.Float)
    date = db.Column(db.Date)
    email = db.Column(db.String)

    def __init__(self, name:str, category:str, value_eur:float, value_usd:float, value_gbp:float, value_ron:float, date:datetime, email:str):
        self.name = name
        self.category = category
        self.value_eur = value_eur
        self.value_usd = value_usd
        self.value_gbp = value_gbp
        self.value_ron = value_ron
        self.date = date
        self.email = email

    @staticmethod
    def create(name,category,value,currency,date,email):
        converted_values = Spending.convert_currencies(value,currency,date)
        new_spending = Spending(name,category,converted_values[0],converted_values[1],converted_values[2],converted_values[3],date,email)
        db.session.add(new_spending)
        db.session.commit()

    @staticmethod
    def read(email_to_srch,start,end):
        spendings = Spending.query.filter(Spending.date.between(start,end)).filter(Spending.email == email_to_srch)
        spendings_schema = SpendingSchema(many=True)
        spendings_list = spendings_schema.dump(spendings)
        for sp in spendings_list:
            new_date = datetime.strptime(sp["date"],'%Y-%m-%d')
            sp["date"] =  new_date.strftime("%d/%m/%Y") 
        return spendings_list

    @staticmethod
    def update(id,name,category,value,given_currency,date):
        converted_currencies = Spending.convert_currencies(value,given_currency,date)
        spending_to_upd = Spending.query.get(id)
        spending_to_upd.name = name
        spending_to_upd.category = category
        spending_to_upd.value_eur = converted_currencies[0]
        spending_to_upd.value_usd = converted_currencies[1]
        spending_to_upd.value_gbp = converted_currencies[2]
        spending_to_upd.value_ron = converted_currencies[3]
        spending_to_upd.date = date
        db.session.commit()

    @staticmethod
    def delete(id_to_del):
        Spending.query.filter_by(id=id_to_del).delete()
        db.session.commit()

    @staticmethod
    def convert_currencies(value,given_currency,date):
        currencies = ['EUR','USD','GBP','RON']
        final_values = []
        converter = CurrencyRates()
        converted_value = 0
        for currency in currencies:
            if given_currency != currency:
                try:
                       converted_value = converter.convert(given_currency,currency,value,date)
                except Exception as e:
                    print(e)
                finally:
                        final_values.append(round(converted_value,2))
            else:
                final_values.append(round(value,2))
        return final_values

    @staticmethod
    def average(email_to_srch,start,end):
        spendings = Spending.query.filter(Spending.date.between(start,end)).filter(Spending.email == email_to_srch)
        spendings_schema = SpendingSchema(many=True)
        spendings_list = spendings_schema.dump(spendings)
        total_eur,total_usd,total_gbp,total_ron = 0,0,0,0
        for sp in spendings_list:
            total_eur += sp['value_eur']
            total_usd += sp['value_usd']
            total_gbp += sp['value_gbp']
            total_ron += sp['value_ron']
        return {'average_eur':round(total_eur/len(spendings_list),2),'average_usd':round(total_usd/len(spendings_list),2),
                'average_gbp':round(total_gbp/len(spendings_list),2),'average_ron':round(total_ron/len(spendings_list),2)}

    @staticmethod
    def total(email_to_srch,start,end):
        spendings = Spending.query.filter(Spending.date.between(start,end)).filter(Spending.email == email_to_srch)
        spendings_schema = SpendingSchema(many=True)
        spendings_list = spendings_schema.dump(spendings)
        total_eur,total_usd,total_gbp,total_ron = 0,0,0,0
        for sp in spendings_list:
            total_eur += sp['value_eur']
            total_usd += sp['value_usd']
            total_gbp += sp['value_gbp']
            total_ron += sp['value_ron']
        return {'total_eur':round(total_eur,2),'total_usd':round(total_usd,2),'total_gbp':round(total_gbp,2),'total_ron':round(total_ron,2)}

    @staticmethod
    def totalFilter(email_to_srch,start,end,category):
        spendings = Spending.query.filter(Spending.date.between(start,end)).filter(Spending.email == email_to_srch).filter(Spending.category == category)
        spendings_schema = SpendingSchema(many=True)
        spendings_list = spendings_schema.dump(spendings)
        total_eur,total_usd,total_gbp,total_ron = 0,0,0,0
        for sp in spendings_list:
            total_eur += sp['value_eur']
            total_usd += sp['value_usd']
            total_gbp += sp['value_gbp']
            total_ron += sp['value_ron']
        return {'total_eur':total_eur,'total_usd':total_usd,'total_gbp':total_gbp,'total_ron':total_ron}

    @staticmethod
    def accountData(email_to_srch,start,end):
        spendings = Spending.query.filter(Spending.date.between(start,end)).filter(Spending.email == email_to_srch)
        spendings_schema = SpendingSchema(many=True)
        spendings_list = spendings_schema.dump(spendings)
        total_eur,total_usd,total_gbp,total_ron = 0,0,0,0
        list_eur,list_usd,list_gbp,list_ron = [],[],[],[]
        for sp in spendings_list:
            total_eur += sp['value_eur']
            total_usd += sp['value_usd']
            total_gbp += sp['value_gbp']
            total_ron += sp['value_ron']
            list_eur.append(sp['value_eur'])
            list_usd.append(sp['value_usd'])
            list_gbp.append(sp['value_gbp'])
            list_ron.append(sp['value_ron'])
        return {'total_eur':round(total_eur,2),'total_usd':round(total_usd,2),'total_gbp':round(total_gbp,2),'total_ron':round(total_ron,2),
                'big_eur':round(max(list_eur),2),'big_usd':round(max(list_usd),2),'big_gbp':round(max(list_gbp),2),
                'big_ron':round(max(list_ron),2)}

class SpendingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Spending