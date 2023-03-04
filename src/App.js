import  React, { useState } from 'react';
import { FaCheckCircle, FaPen, FaTrashAlt } from "react-icons/fa";

export default function App() {
  
    // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);

  // Temp State
  const [newTask, setNewTask] = useState('');

  const [updateData, setUpdateData] = useState('');

////////// Add task functions
function addTask (){
    if(newTask) {
        let num = Date.now(); 
        let newEntry = {id: num, title: newTask, status: false}
        setToDo([...toDo, newEntry]);
        setNewTask('');
      }
}

// Delete task functions
function deleteTask (id){
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
}

// mark task as done or completed function
function markDone (id){
    const newTasks = toDo.map((task) => {
        if (task.id === id){
          return ({ ...task, status: !task.status })
        }
        return task;
      });
      setToDo(newTasks);
}

 // cancel update
function cancelUpdate (){
    setUpdateData('');
    }

// Change task for update (edit)
function changeTask (e){
    let newEntry = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status ? true : false
      }
      setUpdateData(newEntry);
}

// update task 
function updateTask (){
    let filterRecords = [...toDo].filter( task=>task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
}

    return (

        <div className="container App">
      
      <br /><br />
      <h2>To Do List App (ReactJS)</h2>
      <br /><br />

      {/* Update Task*/}
      {updateData && updateData ? (
    <>
    <div className="row">
            <div className="col">
              <input 
                value={updateData && updateData.title} 
                onChange={ (e) => changeTask(e) } 
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
              <button 
              onClick={updateTask}
                className="btn btn-lg btn-success mr-20" 
              >Update</button>
              <button 
              onClick={cancelUpdate}
                className="btn btn-lg btn-warning" 
              >Cancel</button>
            </div>
          </div>
          <br />
    </>
      ) : (
        <>
{/* Add Task*/}
<div className="row">
            <div className="col">
              <input 
              value={newTask}
              onChange={ (e) => setNewTask(e.target.value)}
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
              <button 
                onClick={addTask}
                className="btn btn-lg btn-success" 
              >Add Task</button>
            </div>
          </div>
          <br />
        </>
      )}

      {/* Display ToDos   */}

      {toDo && toDo.length ? '' : 'No tasks...'}

      {toDo && toDo
        .sort((a,b) => a.id > b.id? 1 : -1)
        .map( (task, index) => {
        return(
            <React.Fragment key={task.id}>

            <div className="col taskBg">

            <div className={ task.status ? 'done' : '' }>
                <span className="taskNumber">{index + 1}</span> 
                <span className="taskText">{task.title}</span>
              </div>

              <div className="iconsWrap">
                <span title="Completed/Not Completed"
                onClick={(e) => markDone(task.id)}
                >
                  <FaCheckCircle />
                </span>
                {task.status ? null : (
                   <span title="Edit"
                   onClick={ () => setUpdateData({ 
                    id: task.id, 
                    title: task.title, 
                    status: task.status ? true : false }) }
                   >
                   <FaPen />
                  </span>
                )}
                <span title="Delete"
                 onClick={() => deleteTask(task.id)}
                >
                  <FaTrashAlt />
                </span>
              </div>

           </div>

           </React.Fragment>
 )
 
        })
    }
         
<footer><a href="https://github.com/traez/to-do-list-app-react" target="_blank">https://github.com/traez</a></footer>

</div>
)}

/*
-How to Install the "React Developer Tools" Google chrome extension to aid troubleshooting while building
-How to import icons into React
-That the useState hook is basically React's alternative to variables in Vanilla JavaScript
-About React.Fragment and its shortcut syntax <></>
-More understanding on useEffect to manipulate other variables outside React's control
-For this app was basically just breaking code down into bits and pieces and digesting from the master [https://www.youtube.com/watch?v=TmDNBEdHzVs](https://www.youtube.com/watch?v=TmDNBEdHzVs). But proudly refactored originally though by using Date.now() to generate keys so they're truly all unique even when manipulated. Note that there's however room to refactor code into smaller components. 
-This project was a handful, and I think I need numerous more lighter practice so I can better independently build.
*/