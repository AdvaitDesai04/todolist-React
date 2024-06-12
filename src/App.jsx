import Navbar from './components/navbar'
import Home from './components/home';
import About from './components/about';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

export default function App() {
  const router = createBrowserRouter([
    {
      path:"/hi",
      element:<Home/>
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/",
      
    },
  ])


  const [todo , newTodo] = useState("");
  const [todos , newTodos] = useState([]);  // todos  a array of all the todos
  const [finish, setfinish] = useState(true)



  

  const saveTols = (parms) =>
  {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      newTodos(todos)
      
    }
   
  }, [])
  

  const togglefinished = () =>{
    
    setfinish(!finish)
  }
  const editfun = (e, id, text) =>{
    
     newTodo(text)

     let setTodos = todos.filter(item=>{
      return item.id!=id
    });

    newTodos(setTodos)
    saveTols()
  }

  const deletefun = (e,id) =>{
    let setTodos = todos.filter(item=>{
      return item.id!=id
    });

    newTodos(setTodos)
    saveTols()

  }

  const addfun = (e) => {
    e.preventDefault();
  if (todo.trim() !== "") {
    newTodos([...todos, {id: uuidv4(), todo, isCompleted: false }]);
    newTodo("");
    console.log(todos);
    saveTols();
  }
    
  }
  

  const changefun = (e) =>{
    newTodo(e.target.value)
  }

  const checkboxfun = (e) =>{
     let id = e.target.name;
     console.log(id)
     let index = todos.findIndex(item=>{
      
      return item.id == id;
     })
     let setTodos = [...todos];
     console.log(todo)
     setTodos[index].isCompleted = !setTodos[index].isCompleted;
     newTodos(setTodos)
     console.log(newTodos)
     saveTols()

  }


  return (
    <div className = "flex-col gap-12">
    <Navbar/>
    <RouterProvider router= {router}/>
    <div className = "min-mx-auto min-w-7/8  min-h-screen h-auto   rounded-xl mx-5 my-4  p-4 flex-row justify-center sm:flex-row sm:justify-center bg-slate-300">
    <h1 className="text-3xl font-medium text-center">
      Todo list
    </h1>
<div>
    <div className='mx-10 flex-col gap-20'>
      <div className='text-3xl my-3 font-medium text-blue-4
      00 text-center md:text-left'>Add a todo</div>

<div className=''>
  <div className='flex-col gap-10'>

    <div className='flex gap-5 font-medium justify-start align-middle text-xl my-8 flex-wrap'>
     
      <input onChange ={changefun} value = {todo} className="text-lg font-light px-4 w-full sm:w-1/2  rounded-sm"  type="text" id="fname" name="fname"></input>
      <button onClick = {addfun} disabled = {todo.length<=1} className='bg-green-500 rounded-sm px-4 hover:bg-green-600 active:bg-green-800 text-lg disabled:bg-green-400 transation-all w-full sm:w-auto'>Add</button>
    </div>
    <div className=' flex gap-4 text-lg'>
    <input name ="" onChange ={togglefinished}   checked = {finish} className="ckboxtodo rounded-sm"   type="checkbox" id=""></input>  finsihed
    </div>
    <div className='sm:w-3/4 bg-black h-px my-3'></div>
    
    {todos.length == 0 && <div className='text-blue-600 text-4xl my-10 font-bold' > No todos to display</div>}
    {todos.map(item=>{
     return(finish || !item.isCompleted) && <div key = {item.id} className='flex gap-5 my-8 sm:w-3/4  justify-between'>
      <input name = {item.id} onChange ={checkboxfun}  className="ckboxtodo rounded-sm"  checked ={item.isCompleted} type="checkbox" id=""></input>
      <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
      <div className='flex gap-4 button flex-wrap'>
      <button onClick = {(e) => {editfun(e, item.id ,item.todo)}} className='bg-green-400 rounded-sm px-4  hover:bg-green-600 text-lg flex align-center justify-center gap-2'><CiEdit/></button>
      <button onClick={(e) => {deletefun(e, item.id)}} className='bg-green-400 rounded-sm px-4 hover:bg-green-600 text-lg flex align-center jusftify-center gap-2 py-1'><MdOutlineDelete /></button>
      
      </div>

      
      
    </div>
    })}
         
  </div>

  <div></div>
</div>



    </div>
    </div>
    </div>
    </div>
  )
}