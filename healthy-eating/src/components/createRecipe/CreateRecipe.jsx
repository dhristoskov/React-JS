import React ,{useEffect, useState}  from "react";
import { Redirect, Fragment } from 'react-router-dom';
import firebase from '../../config/firebase';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const CreateRcipe = (props) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");
    const [isBusy, setIsBusy] = useState(false);
    const [routeRedirect, setRedirect] = useState(false);   
    const [loading, setLoading] = useState("");

    const addRecipe = async(e) =>{
        e.preventDefault();
        setIsBusy(true);

        let downloaded;
        let recipe = {
            title,
            content,
            cover: cover[0]
        }

        const storageRef = firebase.storage.ref();
        const storageChild = storageRef.child(recipe.cover.name);
        const recipeCover = storageChild.put(recipe.cover);

        await new Promise(resolve => {
            recipeCover.on("state_changed", (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoading(Math.trunc(progress));
            }, (error) => {
                //error
                console.log(error);
            }, async() => {
                //completed
                const downloadURL = await storageChild.getDownloadURL();
                downloaded = downloadURL;
                console.log(downloaded);
                resolve();
            });
        });

        firebase.createRecipe(downloaded, recipe).then((recipe) => {
            console.log(recipe);
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            console.log(err);
            setIsBusy(false); 
        });
    };

    useEffect(() => {
        firebase.getUserState().then(user => {
            if(!user){
                props.history.replace("/login");
            }
        })
    });

    if(routeRedirect){
        return <Redirect to="/" />  
    };

    let createForm;
    if(isBusy){
        createForm = (
            <div className="processing">
                    <p>Request is being processed  <span className="process">{loading}%</span></p>
                    <div className="loader">Loading...</div>
            </div> 
        )
    }else{
        createForm = (
            <form onSubmit={addRecipe}>
                <p>Create a new recipe</p>
                        
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                        
                <label htmlFor="content">Content: </label>
                <textarea name="content"  onChange={(e) => setContent(e.target.value)}></textarea>
                    
                <label htmlFor="cover" className="cover">Cover</label>
                <input type="file" onChange={(e) => setCover(e.target.files)} />

                <input type="submit" value="create recipe" />
            </form>
        )
    }

    return (
        <Fragment>
            <Header />
            {createForm}
            <Footer />
        </Fragment>
    )
}

export default CreateRcipe;