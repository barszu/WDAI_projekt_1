from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.exc import IntegrityError
from marshmallow import ValidationError
from marshmallow.decorators import post_load
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# from collections import OrderedDict

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app) #database
ma = Marshmallow(app)

# Model
class Person(db.Model):
    __tablename__ = 'Person'
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String)
    surname: str = db.Column(db.String)
    job: str = db.Column(db.String)

# Schema
class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person

# Inicjalizacja bazy danych
with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(Person(name="ser", surname="serowy", job='producent sera'))
    db.session.add(Person(name="Andzrej", surname="Andzejowski", job='bezrobocie'))
    db.session.add(Person(name="Tytus", surname="Bomba", job='zawodowiec'))
    db.session.commit()

# Routy
@app.route('/', methods=['GET'])
def home():
    return "Strona root"

@app.route('/persons', methods=['GET'])
def get_persons():
    persons = Person.query.all()
    person_schema = PersonSchema(many=True)
    persons_list = person_schema.dump(persons)
    return jsonify({'persons': persons_list})
    # return jsonify(dict(persons_list))

@app.route('/persons/<int:id>', methods=['GET'])
def get_person(id):
    person = db.session.query(Person).get_or_404(id)
    person_schema = PersonSchema()
    person_data = person_schema.dump(person)
    return jsonify({f'person {id}': person_data})
    # return jsonify(dict(person_data))

@app.route('/createperson', methods=['POST'])
def add_person():
    try:
        json_data = request.get_json()
        person_schema = PersonSchema()
        # new_person = person_schema.load(json_data)
        new_person_data = person_schema.load(json_data, session=db.session)
        new_person = Person(**new_person_data)
        
        db.session.add(new_person)
        db.session.commit()
        return jsonify({'message': 'Person added successfully!'})
    except ValidationError as e:
        return jsonify({'error': str(e)}), 400
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Person with the same ID already exists!'}), 400

# app run when executed
if __name__ == '__main__':
    app.run()
