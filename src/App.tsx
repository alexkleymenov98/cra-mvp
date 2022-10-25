import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import {KeycloakContext} from "./keycloak/KeycloakProvider";
import keycloak from "./core/keycloak";

function App() {
    const [authenticated, setAuthenticated] = useState(false)
    keycloak.init().then((auth)=>{
        setAuthenticated(auth);
    })

  return (
      <KeycloakContext.Provider value={{keycloak, authenticated}}>
          <BrowserRouter>
              <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />}/>
              </Routes>
          </BrowserRouter>
      </KeycloakContext.Provider>
  );
}

export default App;
