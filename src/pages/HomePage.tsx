import React, {FC} from 'react';

export const HomePage:FC = ()=>{
    // const { keycloak, initialized } = useKeycloak();
    // const isLoggedIn = keycloak.authenticated;
    // console.log(initialized, isLoggedIn, 'isLogged');
    // console.log(keycloak.clientSecret, 'keycloak')
    return (
        <div>
            Главная страница
            {/*{!isLoggedIn && (*/}
            {/*    <button onClick={()=>keycloak.login()}>*/}
            {/*        Войти*/}
            {/*    </button>*/}
            {/*)}*/}
            {/*{isLoggedIn && (*/}
            {/*    <button onClick={()=>keycloak.logout()}>*/}
            {/*        Выйти*/}
            {/*    </button>*/}
            {/*)}*/}
        </div>
    )
};