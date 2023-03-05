from flask import Flask, request
import json
app = Flask(__name__)

@app.route("/sendData", methods=['POST'])
def get_dates():
    data = request.json
    jsonData = json.dumps(data)
    return data

@app.route('/')
def index():
    return "<h1 > Home Page </hi>"

if __name__ == '__main__':
    app.run(debug = True)