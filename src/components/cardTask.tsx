import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface cadTaskProps{
    textContent: string;
    del: (index: number) => void;
    index: number;
    checkDoneTask: (index: number) => void;
    isCheck: boolean;
}

export function CardTask(props: cadTaskProps){
    const [iconColor, setIconColor] = useState('#808080')
    return(
        <>
            <div className='flex justify-between items-center gap-3'>
                <div className=" flex flex-row items-center gap-2">
                    <input 
                        type="checkbox"
                        name="checkDoneTask"
                        id="checkDoneTask"
                        className='w-4 h-4 rounded-sm border-2 border-zinc-500'
                        checked={props.isCheck}
                        onChange={() => props.checkDoneTask(props.index)}
                    />
                    <span 
                        className={`${props.isCheck ? 
                            'line-through text-zinc-500' : 
                            ''}
                             text-zinc-300`}>
                        {props.textContent}
                    </span>
                </div>
                <div 
                    className='p-0.5 rounded-md cursor-pointer hover:bg-zinc-700'
                    onMouseEnter={() =>setIconColor('#E25858') }
                    onMouseLeave={() =>setIconColor('#808080')}>
                    <Trash2 
                        color={iconColor}
                        size='20'
                        onClick={() => props.del(props.index)}/>
                </div>
            </div>
        </>
    )
}