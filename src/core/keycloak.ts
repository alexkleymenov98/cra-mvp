import {KeycloakAdapter} from "../keycloak/keycloakAdapter";

const keycloak = new KeycloakAdapter(
    {
        url: 'http://localhost:8080',
        client_secret: 'LppzpV0LLgAvQBxrgHa7cu8kIFuB3ETl',
        client_id: 'react-auth',
        realm: 'keyloak-react-auth'
    });

export default keycloak;