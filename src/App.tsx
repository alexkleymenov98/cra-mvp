import { useKeycloak} from '@react-keycloak/web';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import keycloak from './core/keycloak';
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";

function App() {

    // const {keycloak, initialized} = useKeycloak();
  return (
      <div>
          <div>
              <h1>auth: {`${keycloak.authenticated}`}</h1>
              <button onClick={()=>keycloak.login()}>Войти</button>
              <button onClick={()=>keycloak.logout()}>Выйти</button>
          </div>
              <BrowserRouter>
                  <Routes>
                      <Route index element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />}/>
                  </Routes>
              </BrowserRouter>
      </div>
  );
}

export default App;
