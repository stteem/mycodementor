export interface UserData {
    username: string;
    token: string;
    loggedin: boolean;
    subscription: object;
    isSubscribed: boolean;
}

export interface User {
    email: string;
    password: string;
}