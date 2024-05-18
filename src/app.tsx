
import logo from './assets/Logo.png'
import { CreateTask } from './components/createTask';
import { BtnCreateTask } from './components/btnCreateTask';
import { InfoTask } from './components/infoTask';
import { NoTask } from './components/noTask';
import { useState } from 'react';
import { DisplayTask } from './components/display';

export function App() {
  const [task, setTask] = useState('')
  const [submittedTask, setSubmittedTask] = useState('');

  return (
    <>
      <div className="bg-zinc-950 justify-center items-center flex h-52">
          <img src={logo} alt="logo TodoList" />
      </div>
      <div className='flex flex-col-2 gap-4 justify-center -my-6'>
        <CreateTask task={task} setTask={setTask}/>
        <BtnCreateTask task={task} setSubmittedTask={setSubmittedTask}/>
        <DisplayTask submittedTask={submittedTask} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className='flex items-center justify-between w-[46rem] mt-24 border-b-2 border-zinc-800'>
            <InfoTask title='Tarefas criadas' fontColor='text-sky-500' textContent='0'/>
            <InfoTask title='Concluidas' fontColor='text-violet-500' textContent='0'/>
        </div> 
        <div className="flex flex-col justify-center items-center mt-24 gap-2">
          <NoTask/>
        </div>
      </div>
    </>
  )
}
