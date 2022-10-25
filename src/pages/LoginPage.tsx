import React, {FC, FormEventHandler, useState} from 'react';
import {Link} from "react-router-dom";
import {useKeycloak} from "../keycloak/KeycloakProvider";

type FormState = {
    username: string;
    password: string;
}

export const LoginPage:FC = ()=>{
    const {keycloak, authenticated} = useKeycloak();
    const [state, setState] = useState<FormState>({username: '', password:''});
    const handlerSubmit:FormEventHandler<HTMLFormElement> = (event)=>{
        event.preventDefault();
        keycloak?.login(state);

    }
    const changeState  = (key: keyof FormState, value: string)=>{
        setState((prev)=>({...prev, [key]:value}));
    }

    if(!keycloak){
        return null;
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <Link to={'/'}>Вернуться</Link>

            {!authenticated && (
                <>
                    <form onSubmit={handlerSubmit}>
                        <input type="text" id="username" value={state.username} onChange={(event)=>changeState('username', event.target.value)}/>
                        <input type="password" id="password" value={state.password} onChange={(event)=>changeState('password', event.target.value)}/>
                        <button type="submit">отправить</button>
                    </form>
                </>
            )}
            {authenticated && (
                <div>
                    <button onClick={()=>{
                        keycloak.getToken().then((token)=>{
                            console.log(token, 'token');
                        })
                    }}>тест проверки токена</button>
                    <button onClick={()=>keycloak.logout()}>Выйти</button>
                    <button onClick={()=>keycloak.getUserInfo()}>Информация о пользователе</button>
                </div>
            )}

        </div>
    )
};