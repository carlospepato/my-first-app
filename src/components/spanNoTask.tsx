
interface noTaskProps{
    title: string;
    fontbold?: boolean;
}

export function SpanNoTask(props: noTaskProps){
    return(
        <>
            <span className={`${props.fontbold ? 'font-bold' : 'font-normal'} text-zinc-500`}>{props.title}</span>
        </>
    )
}