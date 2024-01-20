import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

class UserBillingsDatabase {
    /**
     * Get a user's billing by its ID.
     * 
     * @param id - the id of the user
     * @returns the user object, or null if not found
     */
    async getUserById(id: string): Promise<UserBillingSchema | null> {
        const docRef = doc(db, "user_billings", id.toString());
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            const data = await docSnap.data();
            return data as UserBillingSchema;
        }
        else 
            return null;
    }

    /**
     * Add a new user billing to Firestore.
     * @param user The user billing object to add to Firestore.
     */
    async initDefaultUserBilling(ubid: string, uid: string, firstName: string, lastName: string): Promise<void> {
        const userBillingData: UserBillingSchema = {
            ubid: ubid,
            uid: uid,
            firstName: firstName,
            lastName: lastName,
            address1: "",
            address2: "",
            city: "",
            zip: 0,
            state: "",
            country: "",
            plan: "free",
            totalSpent: 0,
            subscriptionStart: "",
            renewDate: ""
        }
        const userBillingRef = doc(db, "user_billings", ubid);
        await setDoc(userBillingRef, userBillingData);
    }
}

const UserBillingsDB = new UserBillingsDatabase();
export default UserBillingsDB;

// ============ OBJECT TYPE DEFINITIONS ============ //

export type UserBillingSchema = {
    ubid: string,
    uid: string,
    firstName: string,
    lastName: string, 
    address1: string,
    address2: string,
    city: string,
    zip: number, 
    state: string,
    country: string,
    plan: string,
    totalSpent: number,
    subscriptionStart: string,
    renewDate: string
}