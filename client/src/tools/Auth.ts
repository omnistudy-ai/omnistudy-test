import { User } from "firebase/auth";

// Singleton class to hold global auth state
class Auth {

    // class attributes
    private user: User | null;
    private authorized: boolean;

    // constructor
    constructor() {
        this.user = null;
        this.authorized = false;
    }

    // user get and set
    public getUser() {
        if(sessionStorage.getItem("app_auth-user") !== null) {
            this.user = JSON.parse(sessionStorage.getItem("app_auth-user")!);
        }
        return this.user;
    }
    public setUser(user: User) {
        this.user = user;
        sessionStorage.setItem("app_auth-user", JSON.stringify(user));
    }

    // authorized get and set
    public getAuthorized() {
        if(sessionStorage.getItem("app_auth-authorized") !== null) {
            this.authorized = JSON.parse(sessionStorage.getItem("app_auth-authorized")!);
        }
        return this.authorized;
    }
    public setAuthorized(authorized: boolean) {
        this.authorized = authorized;
        sessionStorage.setItem("app_auth-authorized", JSON.stringify(authorized));
    }
}

const AppAuth = new Auth();
export default AppAuth;
//// IMPORTANT: Only use this class as defined below
// import { AppAuth } from "./tools/Auth";
