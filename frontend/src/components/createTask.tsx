import React from "react"

interface createTaskProps {
    task: string
    setTask: React.Dispatch<React.SetStateAction<string>>
}

export function CreateTask(props: createTaskProps){
    const handleChange = (e: { target: { value: any } }) => {
        props.setTask(e.target.value)
    }

    return(
        <div className='flex flex-row bg-zinc-800 h-14 p-2 w-[40rem] border-2 border-zinc-800 rounded-md'>
            <input  
                    className='bg-transparent text-zinc-300 w-full focus:outline-none'
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    value={props.task}
                    onChange={handleChange}
            />
        </div>
    )
}