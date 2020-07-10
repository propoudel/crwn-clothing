import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBZrQlJne4_DnqkkDzIybClRh-0FLAkDI8",
    authDomain: "crwn-db-43eb4.firebaseapp.com",
    databaseURL: "https://crwn-db-43eb4.firebaseio.com",
    projectId: "crwn-db-43eb4",
    storageBucket: "crwn-db-43eb4.appspot.com",
    messagingSenderId: "82612952351",
    appId: "1:82612952351:web:3d950bce80628a5066242a",
    measurementId: "G-9SCM2N3909"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists){

        const { displayName, email} = userAuth;

        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle =  () => auth.signInWithPopup(provider);

export default firebase;