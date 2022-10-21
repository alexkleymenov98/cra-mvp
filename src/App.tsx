import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import keycloak from "./core/Keyloak";

function App() {
  return (<ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
      </ReactKeycloakProvider>
  );
}

export default App;
