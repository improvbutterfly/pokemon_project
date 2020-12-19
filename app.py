from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/pokemon'
mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/fight")
def fight():
    return render_template("fight.html")

@app.route("/breed")
def breed():
    return render_template("breed.html")

@app.route("/graph")
def graph():
    return render_template("graph.html")

if __name__ == "__main__":
    app.run(debug=True)