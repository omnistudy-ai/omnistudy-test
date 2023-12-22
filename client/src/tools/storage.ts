import { storage } from "./firebase";
import { ref, uploadString } from "firebase/storage";

export function initUserStorage(uid: string) {
    const userDefaultFileRef = ref(storage, `users/${uid}/${uid}_INIT.txt`)
    uploadString(userDefaultFileRef, uid).then((snapshot) => {
        console.log("Uploaded user default file!");
    }).catch((error) => {
        console.log(error);
    })
}