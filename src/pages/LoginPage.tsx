import React, {FC, FormEventHandler, useState} from 'react';
import {Link} from "react-router-dom";

type FormState = {
    username: string;
    password: string;
}

export const LoginPage:FC = ()=>{
    const [state, setState] = useState<FormState>({username: '', password:''});
    const handlerSubmit:FormEventHandler<HTMLFormElement> = (event)=>{
        event.preventDefault();

    }
    const changeState  = (key: keyof FormState, value: string)=>{
        setState((prev)=>({...prev, [key]:value}));
    }


    return (
        <div>
            <h1>LOGIN</h1>
            <Link to={'/'}>Вернуться</Link>

            <form onSubmit={handlerSubmit}>
                <input type="text" id="username" value={state.username} onChange={(event)=>changeState('username', event.target.value)}/>
                <input type="password" id="password" value={state.password} onChange={(event)=>changeState('password', event.target.value)}/>
                <button type="submit">отправить</button>
            </form>

        </div>
    )
};