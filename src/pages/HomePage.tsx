import React, {FC} from 'react';
import {Link} from "react-router-dom";

export const HomePage:FC = ()=>{

    return (
        <div>
            <h1>HOME</h1>
            <button>Логин</button>
            <Link to={'/login'}>логин</Link>
        </div>
    )
};