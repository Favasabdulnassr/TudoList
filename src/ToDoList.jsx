import React, {useState} from "react";
import './ToDolist.css';


function ToDoList(){

    const [tasks,setTasks] = useState([]);
    const [newTask,setNewTask] = useState("");
    const [isIndex,setIsIndex] = useState(false);
    const [currentTaskIndex,setCurrentTaskIndex] = useState(null);
    const [editTaskText,setEditTaskText] = useState("");
    
     
    function handleInputChange(event){

        setNewTask(event.target.value)

    }

    function addTask(){

      if (newTask.trim() !== ""){
         setTasks(t => [...t, newTask]);
         setNewTask("");
      }

    }


    function deleteTask(index){

      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks)
    }


    function moveTaskUp(index){

      if (index > 0){
         const updatedTasks = [...tasks];
         [updatedTasks[index], updatedTasks[index-1]] =
         [updatedTasks[index-1],updatedTasks[index]]
         setTasks(updatedTasks);

      }

    }


    function moveTaskDown(index){

      
      if (index < tasks.length-1){
         const updatedTasks = [...tasks];
         [updatedTasks[index], updatedTasks[index+1]] =
         [updatedTasks[index+1],updatedTasks[index]]
         setTasks(updatedTasks);

         
      }

    }


   function editTask(index){

      setIsIndex(true);
      setCurrentTaskIndex(index)
      setEditTaskText(tasks[index])


   }
    

   function saveTask(){

      if(editTaskText.trim() !== "") {

         var updatedTasks = tasks.map((task,index) => 
            
            index === currentTaskIndex ? editTaskText :task
         
         );
      }

      setTasks(updatedTasks);
      setIsIndex(false);
      setCurrentTaskIndex(null);
      setEditTaskText("");


   } 


   
    return(<div className="to-do-list">

        <h1>TO-DO-LIST</h1>

        <div>
            <input
               type = "text"
               placeholder="Enter a task..."
               value={newTask}
               onChange={handleInputChange}
            />

            <button
            
            className="add-button"
            onClick={addTask}>
                
              Add
            </button>
        </div>
          

          <ol>
            {tasks.map((task,index)=>
               <li key={index}>
                           {isIndex && currentTaskIndex === index?
                           (
                              <div>
                                 <input
                                    type="text"
                                    value={editTaskText}
                                    onChange={ (e)=>setEditTaskText(e.target.value)
                                              
                                    }       
                                 />

                                 <button className="save-button"
                                    onClick={saveTask}   
                                 >
                                    Save
                                 </button>  
                              </div>


                           ):(
                              

                        

                        <div>

                           <span className="text">{task}</span>

                           <button className="edit-button"

                           onClick={ () => editTask(index)   }
                           
                           >

                              Edit
                           </button>

                           <button
                              className="delete-button"
                              onClick={ () => deleteTask(index)}
                           >
                           Delete
                           </button>


                           <button
                              className="move-button"
                              onClick={ () => moveTaskUp(index)}
                           >
                           Up
                           </button>

                           <button
                              className="move-button"
                              onClick={ () => moveTaskDown(index)}
                           >
                           Down
                           </button>

                        
                        </div>


                     )}

            </li> 
             
        
                )}
          </ol>

        </div>);

}


export default ToDoList