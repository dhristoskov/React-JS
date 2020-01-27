import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

//Firebase Authenticaion Data
const firebaseConfig = {

    apiKey: "AIzaSyCMJgvEYT0SwIs3sbrfpF_N-PhDIfwZ0AI",
    authDomain: "healthy-eating-77d37.firebaseapp.com",
    databaseURL: "https://healthy-eating-77d37.firebaseio.com",
    projectId: "healthy-eating-77d37",
    storageBucket: "healthy-eating-77d37.appspot.com",
    messagingSenderId: "557664417140",
    appId: "1:557664417140:web:82bc40b67c819dea362821"

};

class Firebase {

    constructor(){
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.dataBase = firebase.firestore();
    }

    //Login Helper
    login(email, password){
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    //Logout Helper
    logout(){
        return this.auth.signOut();
    }

    //Registration Helper
    async register(name, email, password){
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        });
    }
}

export default new Firebase();
  