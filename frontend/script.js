export const BASE_URL = "https://be-1013759214686.us-central1.run.app";

document.addEventListener("DOMContentLoaded", () => {
  fetchNotes();

  document.getElementById("add-note-btn").addEventListener("click", addNote);
  document
    .getElementById("update-note-btn")
    .addEventListener("click", updateNote);
  document
    .getElementById("delete-note-btn")
    .addEventListener("click", deleteNote);
});

function fetchNotes() {
  const status = document.getElementById("notes-status");
  status.textContent = "Loading notes...";

  fetch(`${BASE_URL}/api/`)
    .then((response) => response.json())
    .then((notes) => {
      const notesContainer = document.getElementById("notes");
      notesContainer.innerHTML = "";

      if (!Array.isArray(notes) || notes.length === 0) {
        notesContainer.innerHTML = "<p>No notes available.</p>";
        status.textContent = "";
        return;
      }

      notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
          <p><strong>ID:</strong> ${note.id}</p>
          <h3>${note.title}</h3>
          <p><strong>Category:</strong> ${note.category}</p>
          <p>${note.content}</p>
        `;

        // Populate update/delete form when note clicked
        noteElement.addEventListener("click", () => {
          document.getElementById("update-id").value = note.id;
          document.getElementById("update-title").value = note.title;
          document.getElementById("update-category").value = note.category;
          document.getElementById("update-content").value = note.content;
          document.getElementById("delete-id").value = note.id;
        });

        notesContainer.appendChild(noteElement);
      });

      status.textContent = "";
    })
    .catch((error) => {
      console.error("Error fetching notes:", error);
      document.getElementById("notes").innerHTML =
        "<p>Error loading notes.</p>";
      status.textContent = "";
    });
}

function addNote() {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !category || !content) {
    alert("Please fill all fields!");
    return;
  }

  fetch(`${BASE_URL}/api/add-notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, category, content }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.error || "Failed to add note");
        });
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message || "Note added successfully!");
      fetchNotes();
      clearForm();
    })
    .catch((error) => {
      console.error("Error adding note:", error);
      alert("Error: " + error.message);
    });
}

function updateNote() {
  const id = document.getElementById("update-id").value.trim();
  const title = document.getElementById("update-title").value.trim();
  const category = document.getElementById("update-category").value.trim();
  const content = document.getElementById("update-content").value.trim();

  if (!id || !title || !category || !content) {
    alert("Please fill all fields for update!");
    return;
  }

  fetch(`${BASE_URL}/api/update-notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, category, content }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.error || "Failed to update note");
        });
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message || "Note updated successfully!");
      fetchNotes();
      clearForm();
    })
    .catch((error) => {
      console.error("Error updating note:", error);
      alert("Error: " + error.message);
    });
}

function deleteNote() {
  const id = document.getElementById("delete-id").value.trim();

  if (!id) {
    alert("Please provide the Note ID to delete.");
    return;
  }

  fetch(`${BASE_URL}/api/delete-notes/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      alert("Note deleted successfully!");
      fetchNotes();
      clearForm();
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
      alert("Error: " + error.message);
    });
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("content").value = "";
  document.getElementById("update-id").value = "";
  document.getElementById("update-title").value = "";
  document.getElementById("update-category").value = "";
  document.getElementById("update-content").value = "";
  document.getElementById("delete-id").value = "";
}
