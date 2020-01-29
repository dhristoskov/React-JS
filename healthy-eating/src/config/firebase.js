import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/storage";

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
	constructor() {
		firebase.initializeApp(firebaseConfig)
		this.auth = firebase.auth()
		this.db = firebase.firestore()
	}

	//LogIn Helper
	async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            //console.log(err);
            return err;
        });
        return user;
	}

	//Logout Helper
	async logout(){
        const logout = await firebase.auth().signOut().catch(err => {
            //console.log(err);
            return err;
        });
        return logout;
    }

	//Registration Helper
	async register(email, password){
		const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            //console.log(err);
            return err;
        });
        return user;
    }


	async getUserState(){
        return new Promise(resolve=> {
            this.auth.onAuthStateChanged(resolve);
        });
    }
}

export default new Firebase()

  