
import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'


function App() {


  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');


  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList);
  }

  function deleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex)=>{
     return todoIndex != index;
    })
    persistData(newTodoList)
    setTodos(newTodoList);
  }

  function editTodo(index){
    const valueTobeEdited = todos[index];
    setTodoValue(valueTobeEdited);
    deleteTodo(index);
  }

  useEffect(() =>{
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos');
    if(!localTodos){
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  } , [] )

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList
    }))
  }

  return (
    <main>
      <TodoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue}/>
      <TodoList deleteTodo={deleteTodo} todos={todos} editTodo={editTodo}/>
    </main>
  )
}

export default App
