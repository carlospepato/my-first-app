interface infoTaskProps{
    textContent: string;
    fontColor: string;
    title: string;
}

export function InfoTask(props: infoTaskProps){
    return(
        <>
            <div className='flex justify-center items-center gap-3'>
                <span className={`${props.fontColor} font-bold`}>{props.title}</span>
                <div className="bg-zinc-800 rounded-full w-6 h-4 justify-center items-center flex">
                    <span className='text-zinc-200 text-xs font-semibold'>{props.textContent}</span>
                </div>
            </div>
        </>
    )
}