import React, {FC} from 'react';
import {Link} from "react-router-dom";

export const HomePage:FC = ()=>{
    const handlerReq = async ()=>{
       await fetch('http://localhost:8080/api/v1/analytics-service/tablemeta/v_s23_n1');
    }
    return (
        <div>
            <h1>HOME</h1>
            <div>
                <button onClick={handlerReq}>запустить запрос на мету</button>
            </div>
            <Link to={'/login'}>логин</Link>
        </div>
    )
};