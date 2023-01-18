import { useState } from 'react';
// Import components
import Button from './components/Button';
import './App.css';

function App() {
  const [activity, setActivity] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState('');

  const getId = () => {
    return Date.now();
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (!activity) {
      return setMessage('Silahkan isi aktifitas!');
    }

    setMessage('');

    if (edit.id) {
      const updatedTodo = {
        id: edit.id,
        activity,
      };

      // Cari index todo yang diedit dengan menggunakan findIndex
      const editTodoIndex = todos.findIndex((todo) => todo.id == edit.id);

      // Kita copy isi dari variabel menjadi updatedtodos menggunakan spread operator(...)
      const updatedTodos = [...todos];

      // Replace todo yang akan diupdate menggunakan index dari editTodoIndex
      updatedTodos[editTodoIndex] = updatedTodo;

      // Mengubah array todos dengan yang baru
      setTodos(updatedTodos);

      return cancelEditHandler;
    }

    setTodos([
      ...todos,
      {
        id: getId(),
        activity,
        isFinish: false,
      },
    ]);
    setActivity('');
  };

  const editActivityHandler = (todo) => {
    // console.log(activity);
    setActivity(todo.activity);
    setEdit(todo);
  };

  const cancelEditHandler = () => {
    setEdit({});
    setActivity('');
    setMessage('');
  };

  const removeActivityHandler = (activityId) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== activityId;
    });

    // console.log(filteredTodos);
    setTodos(filteredTodos);
    if (edit.id) cancelEditHandler();
  };

  const isFinishHandler = (todo) => {
    const updatedTodo = {
      ...todo,
      isFinish: todo.isFinish ? false : true,
    };

    const currentTodoIndex = todos.findIndex(
      (currentTodo) => currentTodo.id == todo.id
    );
    const updatedTodos = [...todos];
    updatedTodos[currentTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="App">
        <h1>Todo List App</h1>
        {message && (
          <div className="wrapperAlert">
            <p>{message}</p>
          </div>
        )}
        <form className="formData" onSubmit={formSubmit}>
          <input
            type="text"
            className="inputSearch"
            placeholder="Masukkan aktifitas"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <button type="submit" className="btnTambah">
            {edit.id ? 'Simpan Perubahan' : 'Tambah'}
          </button>
          {edit.id && (
            <button onClick={cancelEditHandler} className="btnBatal">
              Batal
            </button>
          )}
        </form>
      </div>

      {todos.length !== 0 ? (
        <div className="hasil">
          <ul>
            {todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    onChange={() => isFinishHandler(todo)}
                  />
                  {todo.activity} ({todo.isFinish ? 'Selesai' : 'Belum Selesai'}
                  )
                  <button
                    className="btnEdit"
                    onClick={() => editActivityHandler(todo)}
                  >
                    Edit Aktifitas
                  </button>
                  <button
                    className="btnHapus"
                    onClick={() => removeActivityHandler(todo.id)}
                  >
                    Hapus
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="hasil">
          <p className="textNone">Todo masih kosong!</p>
        </div>
      )}
    </>
  );
}

export default App;
