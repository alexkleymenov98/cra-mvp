import {createContext, useContext} from "react";
import {KeycloakAdapter} from "./keycloakAdapter";

type KeycloakContextProps = {
    keycloak: null | KeycloakAdapter;
    authenticated: boolean;
}

export const KeycloakContext = createContext<KeycloakContextProps>({keycloak: null, authenticated: false});

export const useKeycloak = ()=>useContext(KeycloakContext);