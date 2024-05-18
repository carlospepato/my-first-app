interface submittedTaskProps {
    submittedTask: string;
}

export function DisplayTask( props : submittedTaskProps) {
    return (
        <div className='bg-zinc-700 p-4 rounded-md'>
            <h1 className='text-zinc-200'>Tarefa Submetida: {props.submittedTask}</h1>
        </div>
    );
}