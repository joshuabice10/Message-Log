from flask import Flask
from flask import request
from flask import make_response
from dummydb import DummyDB

app = Flask(__name__)

@app.route("/notes", methods=["GET"])
def get_note():
    db = DummyDB("notesdb.txt")
    notes = db.readAllRecords()
    return notes, {"Access-Control-Allow-Origin":"*"}

@app.route("/notes", methods=["POST"])
def create_trail():
    db = DummyDB("notesdb.txt")
    d = {"notetext": request.form["notetext"]}
    db.saveRecord(d)

    return "Created", 201, {"Access-Control-Allow-Origin":"*"}

@app.errorhandler(404)
def not_found(error):
    response = make_response(
        "<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>",
        404
    )
    response.headers["Content-Type"] = "text/html"
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


def main():
    app.run()

main()