import { CirclePlus } from 'lucide-react';
export function BtnCreateTask(){
    return(
        <div className='bg-sky-700 h-14 w-24 rounded-md justify-center items-center flex'>
          <a className='text-zinc-200 flex gap-2 items-center justify-center size-full' href="#">
            Criar
            <CirclePlus className='w-4 h-4'/>
          </a>
        </div>
    )
}