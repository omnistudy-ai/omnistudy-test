import { User } from "firebase/auth";

// Singleton class to hold global auth state
class Auth {

    // class attributes
    private user: User | null;
    private authorized: boolean;
    private signInMethod: SignInMethod | null;

    // constructor
    constructor() {
        this.user = null;
        this.authorized = false;
        this.signInMethod = null;
    }

    // authorize a user (login)
    public authorize(user: User, signInMethod: SignInMethod) {
        this.user = user;
        this.authorized = true;
        this.signInMethod = signInMethod;
        sessionStorage.setItem("app_auth-user", JSON.stringify(user));
        sessionStorage.setItem("app_auth-authorized", JSON.stringify(true));
        sessionStorage.setItem("app_auth-signInMethod", JSON.stringify(signInMethod));
    }
    // deauthorize a user (logout)
    public deauthorize() {
        this.user = null;
        this.authorized = false;
        this.signInMethod = null;
        sessionStorage.removeItem("app_auth-user");
        sessionStorage.removeItem("app_auth-authorized");
        sessionStorage.removeItem("app_auth-signInMethod");
    }

    // get auth state
    public getAuth() {
        if(JSON.parse(sessionStorage.getItem("app_auth-authorized")!)) {
            const user = JSON.parse(sessionStorage.getItem("app_auth-user")!);
            const signInMethod = JSON.parse(sessionStorage.getItem("app_auth-signInMethod")!);
            return {
                user: user,
                authorized: true,
                signInMethod: signInMethod
            }
        }
        else {
            return {
                user: null,
                authorized: false,
                signInMethod: null
            }
        }
    }
}

const AppAuth = new Auth();
export default AppAuth;
//// IMPORTANT: Only use this class as defined below
// import { AppAuth } from "./tools/Auth";


// --------- TYPE DEFINITIONS ---------
export enum SignInMethod {
    Email = "auth-email",
    Google = "auth-google"
}