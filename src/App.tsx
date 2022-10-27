import { useKeycloak} from '@react-keycloak/web';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";

function App() {

    const {keycloak, initialized} = useKeycloak();
  return (
      <div>
          {initialized && (
              <div>
                  <h1>auth: {`${keycloak.authenticated}`}</h1>
                  {!keycloak.authenticated && <button onClick={()=>keycloak.login()}>Войти</button>}
                  {keycloak.authenticated && <button onClick={()=>keycloak.logout()}>Выйти</button>}
              </div>
          )}
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
