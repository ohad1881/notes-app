import { useState } from "react";

export default App;

const ViewNotes = [
  {
    id: 0,
    title: "homeWork",
    description: "homeWork is due in 2 days",
    checked: false,
  },
  {
    id: 1,
    title: "groceries",
    description: "apples, bananas, milk, bread",
    checked: false,
  },
  {
    id: 2,
    title: "meeting",
    description: "Team meeting at 10:00 AM tomorrow",
    checked: false,
  },
  {
    id: 3,
    title: "doctor appointment",
    description: "Visit Dr. Smith at 4:00 PM",
    checked: false,
  },
  {
    id: 4,
    title: "call mom",
    description: "Check on mom this evening",
    checked: false,
  },
  {
    id: 5,
    title: "car service",
    description: "Oil change and tire rotation next Monday",
    checked: false,
  },
  {
    id: 6,
    title: "pay bills",
    description: "Pay electricity and internet bills",

    checked: false,
  },
];

function App() {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isAddNote, setIsAddNote] = useState(false);
  const [noteCount, setNoteCount] = useState(6);
  const [notes, setNotes] = useState(ViewNotes);
  const [showView, setShowView] = useState({
    id: -1,
    title: "",
    description: "",
    checked: false,
  });
  function deleteNote(id) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
    if (id === showView.id) {
      setShowView({ id: -1, title: "", description: "" });
    }
    setNoteCount((prevCount) => prevCount - 1);
  }
  function addNote(note) {
    if (!note.title.trim() || !note.description.trim()) {
      alert("Both title and description are required!");
      return;
    }
    setNotes((notes) => [...notes, note]);
    setNoteCount((prevCount) => prevCount + 1);
    setDescriptionInput((x) => "");
    setTitleInput((x) => "");
    setIsAddNote((isAdd) => !isAdd);
    setShowView(note);
  }
  function checkNote(id) {
    setNotes((notes) =>
      notes.map((note) =>
        note.id === id ? { ...note, checked: !note.checked } : note
      )
    );
  }
  function addNoteView() {
    setIsAddNote((isAdd) => !isAdd);
  }

  return (
    <div className="App">
      <AllNotes
        handleDelete={deleteNote}
        notes={notes}
        handleClickOnNote={setShowView}
        handleChecked={checkNote}
        noteCount={noteCount}
        handleAddNote={addNoteView}
        isAddNote={isAddNote}
        setIsAddNote={setIsAddNote}
        showView={showView}
      />
      <Note
        showView={showView}
        isAddNote={isAddNote}
        setIsAddNote={setIsAddNote}
        handleAddition={addNote}
        noteCount={noteCount}
        titleInput={titleInput}
        handleTitleInput={setTitleInput}
        descriptionInput={descriptionInput}
        handleDescInput={setDescriptionInput}
      />
    </div>
  );
}
function AllNotes({
  noteCount,
  notes,
  handleChecked,
  handleDelete,
  handleClickOnNote,
  handleAddNote,
  isAddNote,
  setIsAddNote,
  showView,
}) {
  return (
    <div className="all_notes">
      <div className="flex-me2">
        Notes
        <button
          className="add-button"
          style={isAddNote ? { backgroundColor: "rgb(255, 201, 24)" } : {}}
          onClick={() => handleAddNote()}
        >
          {isAddNote ? "-" : "+"}
        </button>
      </div>
      <AllNotesContainer
        handleDelete={handleDelete}
        notes={notes}
        handleClickOnNote={handleClickOnNote}
        handleChecked={handleChecked}
        noteCount={noteCount}
        handleAddNote={handleAddNote}
        isAddNote={isAddNote}
        setIsAddNote={setIsAddNote}
        showView={showView}
      />
    </div>
  );
}
function AllNotesContainer({
  handleDelete,
  handleChecked,
  notes,
  handleClickOnNote,
  setIsAddNote,
  showView,
  isAddNote,
}) {
  return (
    <div className="notes_container">
      {notes.map((note) => (
        <div className="whole-note" key={note.id}>
          <div className="delete-btn" onClick={() => handleDelete(note.id)}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
          <div
            onClick={() => {
              handleClickOnNote({
                id: note.id,
                title: note.title,
                description: note.description,
              });
              setIsAddNote((isAdd) => (isAdd ? !isAdd : isAdd));
            }}
            className="note_title"
            key={note.id}
            style={{
              textDecoration: note.checked ? "line-through" : "none",
              backgroundColor:
                note.id === showView.id && !isAddNote
                  ? "rgb(255, 201, 24)"
                  : note.checked
                  ? "lightgray"
                  : "",
            }}
          >
            {note.title}
          </div>
          <div
            style={
              note.checked ? { color: "darkgreen", fontWeight: "bolder" } : {}
            }
            className="check-btn"
            onClick={() => handleChecked(note.id)}
          >
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </div>
        </div>
      ))}
    </div>
  );
}
function Note({
  showView,
  isAddNote,
  setIsAddNote,
  handleAddition,
  noteCount,
  titleInput,
  handleTitleInput,
  descriptionInput,
  handleDescInput,
}) {
  return (
    <div className="note">
      View Notes
      <View
        showView={showView}
        isAddNote={isAddNote}
        setIsAddNote={setIsAddNote}
        handleAddition={handleAddition}
        noteCount={noteCount}
        titleInput={titleInput}
        handleTitleInput={handleTitleInput}
        descriptionInput={descriptionInput}
        handleDescInput={handleDescInput}
      />
    </div>
  );
}
function View({
  showView,
  isAddNote,
  setIsAddNote,
  handleAddition,
  noteCount,
  titleInput,
  handleTitleInput,
  descriptionInput,
  handleDescInput,
}) {
  return (
    <div className="view">
      {!isAddNote ? (
        <>
          <div className="title">{showView.title}</div>
          <div className="description">{showView.description}</div>
        </>
      ) : (
        <div>
          <form className="form">
            <div>
              <label for="title">Title</label>
              <input
                type="text"
                placeholder="Title"
                className="title-input"
                id="title"
                value={titleInput}
                onChange={(e) => handleTitleInput(e.target.value)}
              />
            </div>
            <div className="flex-me">
              <label for="description">description</label>
              <input
                type="text"
                className="desc-input"
                id="description"
                value={descriptionInput}
                onChange={(e) => handleDescInput(e.target.value)}
              />
            </div>
          </form>
          <div className="buttons-flex">
            <button onClick={() => setIsAddNote()} className="btn-cancel">
              Cancel
            </button>
            <button
              onClick={() =>
                handleAddition({
                  id: noteCount + 1,
                  title: titleInput,
                  description: descriptionInput,
                  checked: false,
                })
              }
              className="btn-add-note"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
