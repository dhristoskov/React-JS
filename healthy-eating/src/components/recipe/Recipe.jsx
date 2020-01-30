import React , {useEffect, useState, useRef, Fragment } from "react";
import { Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';

const Recipe = (props) => {

    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState("");

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const fileRef = useRef(null);

    const [recipeId, setRecipeId] = useState("");
    const [routeRedirect, setRedirect] = useState(false); 
    
    const getRecipe = async(recipeId) => {
        const currentRecipe = await firebase.getRecipe(recipeId).catch(err =>{
            console.log(err);
            return err;
        });

        setRecipe(currentRecipe);
    };

    useEffect(() => {
        setTimer(true);
        setRecipeId(props.match.params.id);
        getRecipe(props.match.params.id); 
        
        firebase.getUserState().then(user => {
            if(user){
                setUserState(user);
            }
        });
        setTimeout(() => setTimer(false), 1000);
    },[props.match.params.id]);

    const updateCurrentRecipe = async(e) => {
        e.preventDefault();
        setIsBusy(true);
        
        let downloaded;
        const currentRecipe = {
            title: titleRef.current.value,
            content: contentRef.current.value
        }
        if(fileRef.current.files.length > 0){
            currentRecipe["cover"] = fileRef.current.files[0];
            currentRecipe["oldcover"] = recipe.fileref;

            const storageRef = firebase.storage.ref();
            const storageChild = storageRef.child(currentRecipe.cover.name);
            const recipeCover = storageChild.put(currentRecipe.cover);

            await new Promise(resolve => {
                recipeCover.on("state_changed", (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setLoading(Math.trunc(progress)); 
                }, (error) => {
                        console.log(error);
                }, async() => {
                    const downloadURL = await storageChild.getDownloadURL();    
                    downloaded = downloadURL;
                    resolve(); 
                   
                });
            });
        }
        firebase.updateRecipe(downloaded, recipeId, currentRecipe).then(() => {
            console.log("recipe updated");
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            setIsBusy(false);
            console.log(err);
        });
    }
    
    const deleteCurrentRecipe = () =>{
        firebase.deleteRecipe(recipeId, recipe.fileref)
        .then(() => {
            setRedirect(true);
        }).catch(err => {
            console.log(err);
        })
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }


    if(routeRedirect){
        return <Redirect to="/" />  
    };

    let updateForm;
    let deleteButton;
    let currentRecipe;
    let editButton;

    if(editMode){
        deleteButton =  <button className="delete" onClick={(e) => deleteCurrentRecipe()}>Delete Recipe</button>
    
        if(isBusy){
            updateForm = (
                <div className="processing">
                    <p>Request is being processed <span className="process">{loading}%</span></p>
                    <div className="loader">Loading...</div>
                </div>
            )
        }else{
            updateForm = (
                <Fragment>
                <form className="editForm" onSubmit={updateCurrentRecipe}>
                    <p>Update the current Recipe</p>
                        
                        <label htmlFor="title"> Title: </label>
                        <input type="text" name="title" ref={titleRef} defaultValue={recipe.title} />
                        
                        <label htmlFor="content">Content: </label>
                        <textarea name="content" ref={contentRef} defaultValue={recipe.content} ></textarea>
                    
                        <label htmlFor="cover" className="cover">Cover</label>
                        <input type="file" ref={fileRef} />

                        <input type="submit" value="update recipe" />
                </form>

                {deleteButton}
                </Fragment>
            )
        }
    }
    if(timer){
        currentRecipe = (
            <div className="processing">
                <p>Loading Recipe</p>
                <div className="loader">Loading...</div>
            </div>
        )
    }else{

        if(userState){
            editButton =  <button className="edit" onClick={(e) =>toggleEditMode()}>Edit Recipe</button>;
        }
        currentRecipe = (
            <div className="single">
                <img src={recipe.cover} alt="recipe cover"/>
                <h2>{recipe.title}</h2>
                <div>{recipe.content}</div>
                {editButton}
                {updateForm}
            </div>
        )
    } 
    return(
        <Fragment>
           {currentRecipe}
        </Fragment>
    );

}

export default Recipe;