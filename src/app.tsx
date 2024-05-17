import { CirclePlus } from 'lucide-react';

import logo from './assets/Logo.png'

export function App() {

  return (
    <>
      <div className="bg-zinc-950 justify-center items-center flex h-52">
          <img src={logo} alt="logo TodoList" />
      </div>
      <div className='flex flex-col-2 gap-4 justify-center -my-6'>
        <div className='flex flex-row bg-zinc-800 h-14 p-2 w-[40rem] border-2 border-zinc-800 rounded-md'>
            <input className='bg-transparent text-zinc-300 w-full focus:outline-none' type="text" placeholder='Adicione uma nova tarefa'/>
        </div>
        <div className='bg-sky-700 h-14 w-24 rounded-md justify-center items-center flex'>
          <a className='text-zinc-200 flex gap-2 items-center justify-center size-full' href="#">
            Criar
            <CirclePlus className='w-4 h-4'/>
          </a>
        </div>
      </div>
    </>
  )
}
