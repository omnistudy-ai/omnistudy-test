import { User } from "firebase/auth";
import UsersDB, { UserSchema } from "./db/Users";
import { v4 as uuidv4 } from "uuid";
import UserBillingsDB from "./db/UserBillings";
import { initUserStorage } from "./storage";

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

    // register new user
    public register(user: User, formData: RegisterFormData, signInMethod: SignInMethod) {
        // authorize the user in local storage
        this.authorize(user, signInMethod);

        // parse name depending on sign in method
        let firstName: string, lastName: string;
        if(signInMethod === SignInMethod.Email) {
            firstName = formData.firstName;
            lastName = formData.lastName;
        }
        else {
            const name = user.displayName!.split(" ");
            firstName = name[0];
            lastName = name[1];
        }

        // create billing profile document for user
        const ubid: string = uuidv4();
        UserBillingsDB.initDefaultUserBilling(ubid, user.uid, firstName, lastName);
        // setup storage bucket for user
        initUserStorage(user.uid);
        
        // create user document in firestore
        const userData: UserSchema = {
            uid: user.uid,
            name: `${firstName} ${lastName}`,
            firstName: firstName,
            lastName: lastName,
            email: user.email!,
            phoneNumber: user.phoneNumber != null && user.phoneNumber != "" ? user.phoneNumber : formData.phoneNumber,
            createdAt: (new Date()).toUTCString(),
            lastLogin: (new Date()).toUTCString(),
            lastLoginMethod: signInMethod,
            ubid: ubid,
            plan: "free",
            courses: [],
            storagePath: `users/${user.uid}`
        }
        UsersDB.addUser(userData);
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

type RegisterFormData = {
    firstName: string,
    lastName: string,
    phoneNumber: string
}