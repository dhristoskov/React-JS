import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

//Firebase Authenticaion Data
const firebaseConfig = {

    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""

};

class Firebase {

    constructor(){
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.dataBase = firebase.firestore();
    };


    //Login Helper
    login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

    //Logout Helper
	logout() {
		return this.auth.signOut()
	}

    //Register Helper
	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
    }
    
    //Reset Password Helper
    passwordReset (email) {
        return this.auth.sendPasswordResetEmail(email);
    }

    //Update Password Helper
    passwordUpdate (password) {
        return this.auth.currentUser.updatePassword(password);
    }  

    //Authenticate user
	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

    //Display User Name
	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

}

export default new Firebase()
  