import Keycloak from "keycloak-js";

// const keycloak = new Keycloak({url:'http://localhost:8090/auth', clientId: 'react-auth1', realm: 'keyloak-react-auth1'});
const keycloak = new Keycloak('/keycloak-3.json');


export function initKeycloak(renderApp: ()=>void){
    keycloak.init({onLoad:'login-required', enableLogging: true, }).then(function(authenticated) {
        console.log(authenticated ? 'authenticated' : 'not authenticated');
        authenticated && renderApp();
        // alert(authenticated ? 'authenticated' : 'not authenticated');
    }).catch(function(reason) {
        console.log(reason, 'error initial');
        alert('failed to initialize');
    }).then(()=>{
        console.log(keycloak.clientSecret,
            'secret');
        console.log(keycloak.authenticated, 'auth')
    });
}

export default keycloak;