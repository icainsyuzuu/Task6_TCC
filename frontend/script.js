export const BASE_URL = "https://be-1013759214686.us-central1.run.app";

document.addEventListener("DOMContentLoaded", () => {
  fetchNotes();

  document.getElementById("add-note-btn").addEventListener("click", addNote);
  document.getElementById("update-note-btn").addEventListener("click", updateNote);
  document.getElementById("delete-note-btn").addEventListener("click", deleteNote);
});

function fetchNotes() {
  fetch(`${BASE_URL}/`)
    .then((response) => response.json())
    .then((notes) => {
      const notesContainer = document.getElementById("notes");
      notesContainer.innerHTML = "";

      if (notes.length === 0) {
        notesContainer.innerHTML = "<p>No notes available.</p>";
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
        notesContainer.appendChild(noteElement);
      });
    })
    .catch((error) => console.error("Error fetching notes:", error));
}

function addNote() {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !category || !content) {
    alert("Please fill all fields!");
    return;
  }

  fetch(`${BASE_URL}/add-notes`, {
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
      fetchNotes(); // Refresh list
      clearForm(); // Clear form after adding
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

  fetch(`${BASE_URL}/update-notes/${id}`, {
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
      fetchNotes(); // Refresh list
      clearForm(); // Clear form after update
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

  fetch(`${BASE_URL}/delete-notes/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      alert("Note deleted successfully!");
      fetchNotes(); // Refresh list
      clearForm(); // Clear form after delete
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
