import { storage, db } from "./firebase";
import { updateDoc , doc, deleteDoc} from "firebase/firestore";
import { ref, uploadString, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import CoursesDB from "./db/Courses";

export function initUserStorage(uid: string) {
    const userDefaultFileRef = ref(storage, `users/${uid}/${uid}_INIT.txt`)
    uploadString(userDefaultFileRef, uid).then((snapshot) => {
        console.log("Uploaded user default file!");
    }).catch((error) => {
        console.log(error);
    })
}

/**
 * Upload a file to act as the thumbnail for a course
 * 
 * @param uid The id of the user
 * @param cid The id of the course
 * @param file The file object to be uploaded
 */
export async function uploadCourseThumbnail(uid: string, cid: string, file: File) {
    const courseThumbnailRef = ref(storage, `users/${uid}/${cid}/${file.name}`);

    let uploadPromise: Promise<{ status: boolean, url: string }> = new Promise((resolve, reject) => {
        uploadBytes(courseThumbnailRef, file).then((snapshot) => {
            getDownloadURL(courseThumbnailRef).then(async (url) => {
                await updateDoc(doc(db, "courses", cid), {
                    thumbnail: url
                });
                resolve({ status: true, url: url });
            }).catch((error) => {
                console.log(error);
                reject({ status: false, url: "" });
            });
        }).catch((error) => {
            console.log(error);
            reject({ status: false, url: "" });
        });
    });

    return uploadPromise;
}

export async function removeCourseThumbnail(uid: string, cid: string) {
    // get the course data from 'courses' collection
    const courseData = await CoursesDB.getCourseById(cid);
    let thumbnailUrl = courseData?.thumbnail;
    if(thumbnailUrl === undefined || thumbnailUrl === null || thumbnailUrl === "")
        return;

    const courseThumbnailRef = ref(storage, thumbnailUrl);
    let deletePromise = new Promise((resolve, reject) => {
        deleteObject(courseThumbnailRef).then(async () => {
            console.log("Successfully deleted course thumbnail!");
            await updateDoc(doc(db, "courses", cid), {
                thumbnail: ""
            });
            resolve({ status: true });
        }).catch((error) => {
            console.log(error);
            reject({ status: false });
        });
    });

    return deletePromise;
}

/**
 * Upload a document for an assignment
 * 
 * @param aid The id of the assignment
 * @param file The file to upload
 */
export function uploadAssignmentDocument(aid: string, file: File) {
    const assignmentRef = ref(storage, `assignments/${aid}/${file.name}`);
    uploadBytes(assignmentRef, file).then((snapshot) => {
        console.log("Uploaded assignment document!");
    }).catch((error) => {
        console.log(error);
    })
}

/**
 * Get all documents for an assignment
 *
 * @param aid The assignment id
 * @returns an array of [TODO: create Document type]
 */
export function getAssignmentDocuments(aid: string) {
    const assignmentRef = ref(storage, `assignments/${aid}`);
    // TODO: Finish implementing this code, query database
    return assignmentRef;
}