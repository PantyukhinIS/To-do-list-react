import React, { useEffect, useState } from 'react';
import './App.css';
import ToDoItem from './toDo/ToDoItem';
import todosData from './toDo/todosData';

function App() {

  const storage = JSON.parse(localStorage.getItem('tasks'));
  const initialState = storage && storage.length > 0 ? storage : todosData;
  
  const [arrTodos, setArrTodos] = useState(initialState);
  const [taskValue, setTaskValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(arrTodos));
  }, [arrTodos]);

  const checkboxChange = id => {
    const updatedArr = arrTodos.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    })
    setArrTodos([...updatedArr]);
  }

  const addTask = () => {
    const task = {
      id : Math.max(...arrTodos.map(item => item.id)) + 1,
      text : taskValue,
      completed : false,
    };
    if (taskValue.length < 1 || !isNaN(taskValue)) {
      alert('Недопустимое значение!');
    } else {
      setArrTodos([...arrTodos, task]);
      setTaskValue('');
    }
  }

  const taskDelete = id => {
    const filteredArr = arrTodos.filter(item => item.id !== id);
    setArrTodos([...filteredArr]);
  }

  const activeItems = arrTodos.filter(item => item.completed === false);
  const completedItems = arrTodos.filter(item => item.completed === true);

  const todosItems = [...activeItems, ...completedItems].map((item) => {
    return (
      <ToDoItem
        key = {item.id}
        description = {item.text}
        completed = {item.completed}
        handleChange = {() => checkboxChange(item.id)}
        handleDelete = {() => taskDelete(item.id)}
      />
    );
  })
  return (
    <div className="App">
      <div className="input-task">
        <div className='title'>
          Добавить новое задание
        </div>
        <input type="text" className='input' value={taskValue} onChange={(e) => setTaskValue(e.target.value)}/>
        <button onClick={addTask}>Добавить задание</button>
      </div>
      <h2>Все задания</h2>
      {todosItems}
    </div>
  )
}

export default App;