import clipboard from '../assets/Clipboard.png';
import { SpanNoTask } from './spanNoTask';

export function NoTask(){
    return(
        <>
            <img src={clipboard} alt="logo de uma clipboard" />
            <SpanNoTask title='Você ainda não tem tarefas cadastradas' fontbold/>
            <SpanNoTask title='Crie tarefas e organize seus itens a fazer'/>
        </>
    )
}