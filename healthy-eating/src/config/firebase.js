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
        this.storage = firebase.storage();
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
        const user = await firebase.auth()
        .createUserWithEmailAndPassword(email, password).catch(err => {
        return err;
        });
        return user;
    }

    //Get a list with all recipes from the storage
    async getRecipes(){
        let recipesList = [];
        const recipes = await firebase.firestore().collection("recipes").get();
        recipes.forEach(doc => {
            recipesList.push({id:doc.id, data: doc.data()});
        });
        return recipesList;
    }


    //Get a single recipe from the storage
    async getRecipe(recipeId){
        const recipe = await firebase.firestore().collection("recipes").doc(recipeId).get();
        const recipeData = recipe.data();
        return recipeData;
    }

    //Authentication
	async getUserState(){
        return new Promise(resolve=> {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    //Add a new Recipe in the storage
    async createRecipe(url, recipe){
   
        const fileRef = await firebase.storage().refFromURL(url);
    
        let newRecipe = {
            title: recipe.title,
            content: recipe.content,
            cover: url,
            fileref : fileRef.location.path 
        } 
        
        const firestoreRecipe = await firebase.firestore()
        .collection("recipes").add(newRecipe).catch(err => {
            console.log(err);
        });  
        return firestoreRecipe;     
    }

    //Update current Recipe data in storage
    async updateRecipe(url, id, data){
        if(data["cover"]){
          const fileRef = await firebase.storage().refFromURL(url);
          await this.storage.ref().child(data["oldcover"]).delete().catch(err => {
          });
  
          let updatedData = {
              title: data.title,
              content: data.content,
              cover: url,
              fileref : fileRef.location.path
          }
  
          const recipe = await firebase.firestore().collection("recipes")
          .doc(id).set(updatedData, {merge: true}).catch(err => {            
          });
          return recipe;
        }else{
          const recipe = await firebase.firestore().collection("recipes")
          .doc(id).set(data, {merge: true}).catch(err => {
          });
          return recipe
        }
     }

    //Delete current Recipe from storage
    async deleteRecipe(id, fileref){
        const storageRef = firebase.storage().ref();
        await storageRef.child(fileref).delete().catch(err => {
        });
        const recipe = await firebase.firestore().collection("recipes")
        .doc(id).delete().catch(err => {
        });
        return recipe;
    }
}

export default new Firebase()

  