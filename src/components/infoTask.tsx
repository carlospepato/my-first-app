interface infoTaskProps{
    taskCreate: number;
    taskDone?: number;
    fontColor: string;
}

export function InfoTask(props: infoTaskProps){
    return(
        <>
            <div className='flex justify-between items-center w-full'>
                <div className="flex gap-2 items-center">
                    <span className={`text-sky-500 font-bold`}>Tarefas criadas</span>
                    <div className="bg-zinc-800 rounded-full h-4 justify-center items-center flex px-2">
                        <span className='text-zinc-200 text-xs font-bold'>
                            {props.taskCreate}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <span className={`text-violet-500 font-bold`}>Concluídas</span>
                    <div className="bg-zinc-800 rounded-full h-4 justify-center items-center flex px-2">
                        <span className='text-zinc-200 text-xs font-bold'>
                            {props.taskCreate == 0 ? (
                                props.taskCreate
                            ):(
                                `${props.taskDone} de  ${props.taskCreate}`
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}