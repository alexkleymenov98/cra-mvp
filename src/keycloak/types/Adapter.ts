
export type OptionGrantType = 'password' | 'refresh_token'

type SecretOption = {
    grant_type?: OptionGrantType;
    client_id: string;
    client_secret: string;
    realm: string;
};

type SecretOptionWithoutRealm = Omit<SecretOption, 'realm'>

export type InitOptions = SecretOption & {
    url: string;
};

export type LoginProps = {
    username: string;
    password: string;
}
export type ResponseAuth = {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type:"Bearer";
    "not-before-policy": number;
    session_state:string;
    scope:string;
}
export type LocalStoreData = Pick<ResponseAuth, 'access_token' |'refresh_token' | 'expires_in'>;

export type ParamLogin = LoginProps & SecretOptionWithoutRealm;

export type ParamRefresh = SecretOptionWithoutRealm & {
    refresh_token: string;
};
export type ParamLogout = SecretOptionWithoutRealm & {
    token_type_hint: 'access_token' | 'refresh_token';
    token: string;
}

