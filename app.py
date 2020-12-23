from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/pokemon'
mongo = PyMongo(app)

@app.route("/")
def index():
	# Get all pokemon info entries
	cursor = mongo.db.info.find({})
	pokemon_info = loads(dumps(cursor))
	print(pokemon_info)
	return render_template("index.html", info=pokemon_info)


@app.route("/fight.html")
def fight():
	cursor = mongo.db.info.find({})
	pokemon_info = loads(dumps(cursor))
	print(pokemon_info)

	return render_template("fight.html", info=pokemon_info)

@app.route("/breed.html")
def breed():
	cursor = mongo.db.info.find({})
	pokemon_info = loads(dumps(cursor))
	print(pokemon_info)

	return render_template("breed.html", info=pokemon_info)

@app.route("/graph.html")
def graph():
	cursor = mongo.db.info.find({})
	pokemon_info = loads(dumps(cursor))
	print(pokemon_info)

	return render_template("graph.html", info=pokemon_info)

if __name__ == "__main__":
	app.run(debug=True)