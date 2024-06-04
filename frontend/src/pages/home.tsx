
import logo from '../assets/Logo.png'
import { useEffect, useState } from 'react';
import { CreateTask } from '../components/createTask';
import { BtnCreateTask } from '../components/btnCreateTask';
import { InfoTask } from '../components/infoTask';
import { NoTask } from '../components/noTask';
import { CardTask } from '../components/cardTask';
 //import { config } from "../../config.ts"

export function Home() {
  const baseUrl = "https://todo-app-gsc5.vercel.app";
  const [task, setTask] = useState<string>('')
  const [submittedTask, setSubmittedTasks] = useState<string[]>([]);
  const [doneTask, setDoneTask] = useState<number[]>([]);

  useEffect(()=>{
    fetch(`${baseUrl}/users`)
    .then(response => response.json())
    .then(json => {
     console.log(json)
    })
  })

  const handleAddTask = () => {
    if (task.trim() !== '') {
        setSubmittedTasks([...submittedTask, task]);
        setTask('');
    }
};

  const deleteTask = (index: number) => {
    const newTasks = [...submittedTask];
    newTasks.splice(index, 1);
    setSubmittedTasks(newTasks);
    setDoneTask(doneTask.filter(i => i !== index));
  };

    const taskCheckeded = (index: number) => {
      if (doneTask.includes(index)) {
          setDoneTask(doneTask.filter(i => i !== index));
      } else {
          setDoneTask([...doneTask, index]);
      }
  };

  return (
    <>
      <div className="bg-zinc-950 justify-center items-center flex h-52">
          <img src={logo} alt="logo TodoList" />
      </div>
      <div className='flex flex-col-2 gap-4 justify-center -my-6'>
        <CreateTask 
          task={task}
          setTask={setTask}/>
        <BtnCreateTask 
          task={task}
          handleAddTask={handleAddTask}/>
      </div>
      <div className="flex flex-col w-[46rem] gap-4 mx-auto mt-40">
        <div className='flex items-center justify-between w-full border-b-2 border-zinc-800'>
            <InfoTask
              fontColor='text-sky-500'
              taskCreate={submittedTask.length}
              taskDone={doneTask.length}/>
        </div> 
        {submittedTask.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-24 gap-2">
            <NoTask/>
          </div>
        ) : (
          submittedTask.map((task, index) =>(
            <div key={index} className="bg-zinc-800 h-18 w-full p-4 flex flex-col gap-2 rounded-lg border-2 border-zinc-700">
              <CardTask 
                textContent={task}
                del={deleteTask}
                index={index}
                checkDoneTask={taskCheckeded}
                isCheck={doneTask.includes(index)}
              />
            </div>
          ))
        )}
      </div>
    </>
  )
}
