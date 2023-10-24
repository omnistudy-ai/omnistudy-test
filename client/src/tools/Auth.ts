import { User } from "firebase/auth";

// Singleton class to hold global auth state
class Auth {

    // class attributes
    private user: User | null;
    private authorized: boolean;

    // create a new Auth object
    constructor() {
        this.authorized = false;
        this.user = null;
    }

    // user get and set
    public getUser() {
        return this.user;
    }
    public setUser(user: User) {
        this.user = user;
    }

    // authorized get and set
    public getAuthorized() {
        return this.authorized;
    }
    public setAuthorized(authorized: boolean) {
        this.authorized = authorized;
    }
}

export let AppAuth = new Auth();
//// IMPORTANT: Only use this class as defined below
// import { AppAuth } from "./tools/Auth";