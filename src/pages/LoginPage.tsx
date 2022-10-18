import React, { FC, FormEventHandler, useState} from 'react';
import {Link} from "react-router-dom";

type FormState = {
    login: string;
    password: string;
}

export const LoginPage:FC = ()=>{
    const [state, setState] = useState<FormState>({login: '', password:''})
    const handlerSubmit:FormEventHandler<HTMLFormElement> = (event)=>{
        event.preventDefault();
        console.log(state, 'data')

        // @ts-ignore
        fetch('http://localhost:8080/login', {method: 'POST', body: JSON.stringify(state)}).then((response)=>console.log(response)).catch((e)=>console.error(e))
    }
    const changeState  = (key: keyof FormState, value: string)=>{
        setState((prev)=>({...prev, [key]:value}));
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <Link to={'/'}>Вернуться</Link>

            <form onSubmit={handlerSubmit}>
                <input type="text" id="login" value={state.login} onChange={(event)=>changeState('login', event.target.value)}/>
                <input type="password" id="password" value={state.password} onChange={(event)=>changeState('password', event.target.value)}/>
                <button type="submit">отправить</button>
            </form>

        </div>
    )
};