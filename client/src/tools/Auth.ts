import { User } from "firebase/auth";
// import React from "react";

// // Singleton class to hold global auth state
// export default class AppAuth extends React.Component {

//     // class attributes
//     static user: User | null;
//     static authorized: boolean;

//     state = {
//         user: null,
//         authorized: false
//     }

//     // user get and set
//     public static getUser() {
//         return this.user;
//     }
//     public static setUser(user: User) {
//         this.user = user;
//     }

//     // authorized get and set
//     public static getAuthorized() {
//         return this.authorized;
//     }
//     public static setAuthorized(authorized: boolean) {
//         this.authorized = authorized;
//     }
// }

//// IMPORTANT: Only use this class as defined below
// import { AppAuth } from "./tools/Auth";

import createStore from "react-superstore";

export const [useAppAuth, setAppAuth, getAppAuth] = createStore<AuthType>({
    user: null,
    authorized: false
});

type AuthType = {
    user: User | null,
    authorized: boolean
}
