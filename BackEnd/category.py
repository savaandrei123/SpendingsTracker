from __init__ import db

class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, name:str):
        self.name = name

    @staticmethod
    def read():
        categories = Category.query.all()
        categories_list = []
        for ct in categories:
            categories_list.append(ct.name)
        return categories_list

    @staticmethod
    def create(name):
        new_category = Category(name)
        db.session.add(new_category)
        db.session.commit()