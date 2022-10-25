import {
    InitOptions,
    LocalStoreData,
    LoginProps,
    OptionGrantType,
    ParamLogin, ParamLogout,
    ParamRefresh,
    ResponseAuth
} from "./types/Adapter";


export class KeycloakAdapter {
    private url:string;
    private readonly grant_type:OptionGrantType = 'password';
    private readonly client_id:string;
    private readonly client_secret:string;
    private readonly baseUrl: string;
    private readonly tokenUrl: string;
    private readonly localStoragePath: string;
    public authenticated: boolean = false;

    private realm:string;
    constructor(options:InitOptions) {
        const {url, grant_type, client_secret, client_id, realm} = options;
        this.url = url;
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.realm = realm;
        this.baseUrl = `${url}/realms/${realm}/protocol/openid-connect`;
        this.tokenUrl = `${this.baseUrl}/token`
        this.localStoragePath = `keycloak-${this.client_id}`;

        if(grant_type){
            this.grant_type = grant_type;
        }
    }

    async login(payload: LoginProps){
        const url = this.tokenUrl;
        const response = await this.http<ResponseAuth,ParamLogin>(url, 'POST', {
            ...payload,
            grant_type: this.grant_type,
            client_id: this.client_id,
            client_secret: this.client_secret,
        });
        this.authenticated = true;
        this.updateLocalStore(response as ResponseAuth);
    }

    async getToken(){
        const isActualToken = this.isActualAccessToken();
        if(isActualToken){
            const store = this.getDateFromLocalStore();
            return store?.access_token;
        }
        await this.updateToken();
        const store = this.getDateFromLocalStore();
        return store?.access_token;
    }

    async logout(){
        const url = this.baseUrl;
        const localStore = await this.getDateFromLocalStore();
        await this.http<any,ParamLogout>(`${url}/revoke`,'POST', {
            client_id: this.client_id,
            client_secret: this.client_secret,
            token_type_hint: 'access_token',
            token:localStore?.access_token as string,
        } )
        await this.http<any,ParamLogout>(`${url}/revoke`,'POST', {
            client_id: this.client_id,
            client_secret: this.client_secret,
            token_type_hint: 'refresh_token',
            token:localStore?.refresh_token as string,
        } );
        this.clearInfo();
    }

    async getUserInfo(){
        const localeStoragePath = this.localStoragePath;
        const url = this.baseUrl;
        const localStore = await this.getDateFromLocalStore();
       return fetch(`${url}/userinfo`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Authorization": `Bearer ${localStore?.access_token}`
            }
        }).then(function(response) {
           if (!response.ok) {
               if(response.status === 401){
                   localStorage.removeItem(localeStoragePath);
               }
               throw Error(response.statusText);
           }
           return response;
       }).then((response)=>{
           return  response.json();
        })
    }

    async init(){
        try {
            const user = await this.getUserInfo();
            if(user){
                this.authenticated = true;
            }
        }catch (e) {
            this.authenticated = false;
        }
        return this.authenticated;
    }

    private async http<DATA extends Record<string, any> = {}, PAYLOAD extends Record<string, string> = {}>(url:string, method: 'POST', body: PAYLOAD):Promise<DATA | boolean>{
        const params = new URLSearchParams({...body}).toString();
        const response =  await fetch(url, {method  ,headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            }, body: body ? params: undefined, mode: 'cors'});
        const text = await response.text();

        if(!response.ok){
            if(response.status === 401){
                this.clearInfo();
            }
        }

        if(!text){
            return Promise.resolve(true)
        }

        return JSON.parse(text);
    }

    private getDateFromLocalStore(): LocalStoreData | null{
        const store = localStorage.getItem(this.localStoragePath);
        if(!store){
            return null;
        }
        return JSON.parse(store);
    }

    private updateLocalStore({refresh_token, access_token, expires_in}:ResponseAuth) {
        const storeData:LocalStoreData = {
            access_token,
            refresh_token,
            expires_in: Date.now() + (Number(expires_in) * 1000),
        }
        localStorage.setItem(this.localStoragePath, JSON.stringify(storeData));
    }

    private isActualAccessToken(){
        const store = this.getDateFromLocalStore();
        if(store){
            const {expires_in} = store;
            const currentTime = new Date(Date.now()).getTime();
            const diffTime = expires_in - currentTime;
            return diffTime >= 0;
        }
        return false;
    }

    private async updateToken(){
        const localStore = await this.getDateFromLocalStore();
        if(localStore?.refresh_token){
            const response = await this.http<ResponseAuth, ParamRefresh>(this.tokenUrl, "POST",{
                client_secret: this.client_secret,
                grant_type: 'refresh_token',
                client_id: this.client_id,
                refresh_token: localStore.refresh_token,
            });
            this.updateLocalStore(response as ResponseAuth);
        }
    }

    private clearInfo(){
        localStorage.removeItem(this.localStoragePath);
        this.authenticated = false;
    }

}