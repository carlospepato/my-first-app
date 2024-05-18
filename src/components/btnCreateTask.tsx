import React from 'react';
import { CirclePlus } from 'lucide-react';

interface btnCreateTaskProps {
  task: string;
  setSubmittedTask: React.Dispatch<React.SetStateAction<string>>;
}

export function BtnCreateTask(props : btnCreateTaskProps){
  const handleClick = () => {
    props.setSubmittedTask(props.task);
  };
    return(
        <div className='bg-sky-700 h-14 w-24 rounded-md justify-center items-center flex'>
          <a 
            className='text-zinc-200 flex gap-2 items-center justify-center size-full'
            onClick={handleClick}
          >
            Criar
            <CirclePlus className='w-4 h-4'/>
          </a>
        </div>
    )
}