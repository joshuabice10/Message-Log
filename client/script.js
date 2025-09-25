"use strict";

const textBox = document.querySelector(".text-box");
const postBtn = document.querySelector(".submission-submit-btn");
const notesArea = document.querySelector(".notes-area");

function load() {
  notesArea.innerHTML = "";

  fetch("http://127.0.0.1:5000/notes").then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      data.forEach((note) => load_notes(note));
    });
  });
}

function load_notes(note) {
  let content = note["notetext"];

  let noteDiv = document.createElement("div");
  noteDiv.classList.add("notes");
  noteDiv.textContent = content;
  notesArea.append(noteDiv);
}

function addNewNote() {
  let notestext = textBox.value;

  let data = "notetext=" + encodeURIComponent(notestext);

  console.log(data);

  fetch("http://127.0.0.1:5000/notes", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    console.log("Saved");
    load();
  });
}

function wrong_route() {
  fetch("http://127.0.0.1:5000/invalidpath", {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => console.log("Response:", data))
    .catch((error) => console.error("Error:", error));
}

postBtn.addEventListener("click", function () {
  addNewNote();
  textBox.value = "";

  // wrong_route();
});

load();
