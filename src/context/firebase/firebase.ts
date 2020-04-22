/// <reference path="../../images.d.ts"/>

import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
class Firebase {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
    fbProvider: firebase.auth.AuthProvider;
    glProvider: firebase.auth.AuthProvider;

    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();

        this.fbProvider = new app.auth.FacebookAuthProvider();
        this.glProvider = new app.auth.GoogleAuthProvider();
        this.auth.useDeviceLanguage();

        this.db = app.firestore();
    }

    doCreateUserWithEmailAndPassword = (email: string, password: string) =>
        this.auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const cdnFilesCount = 104;
                const index = Math.floor(Math.random() * cdnFilesCount + 1);
                user.user?.updateProfile({
                    photoURL: `https://cdn.image4.io/def4alt/f_auto/avatars/${index}.png`,
                });

                return user;
            });

    doSignInWithEmailAndPassword = (email: string, password: string) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.glProvider);
    doSignInWithFacebook = () => this.auth.signInWithPopup(this.fbProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email: string) =>
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password: string) =>
        this.auth.currentUser && this.auth.currentUser.updatePassword(password);

    user = (uid: string) => this.db.collection("users").doc(uid);

    users = () => this.db.collection("users");

    backup = (uid: string) => this.db.collection("backups").doc(uid);
}

export default Firebase;
