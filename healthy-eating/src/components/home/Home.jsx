import React, { Fragment, useEffect, useContext } from "react";
import Header from '../header/Header';
import Footer from "../footer/Footer";
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { Recipes } from '../context/recipeContext';


const Home = () => {

    const {state, dispatch} = useContext(Recipes);

    const getRecipes = async() => {
        const recipesList = await firebase.getRecipes().catch(err => {
            console.log(err);
            return err;
        });
    
       return dispatch({
        type: "FETCH_RECIPE",
        payload: recipesList
        });
    }

    useEffect(() => {
        getRecipes();
    });

    return(
        <Fragment>
            <Header />
                <h2>Welcome Home</h2>
                <div className="recipes-list">
                {state.recipes.map(recipe => {
                    return (
                        <div className="single-recipe" key={recipe.id}>
                            <Link to={"recipe/" + recipe.id}>
                            <div style={{backgroundImage: "url(" + recipe.data.cover + ")" }} />
                            </Link>
                        </div>
                    )
                })}
                </div>
            <Footer />
        </Fragment>
    );
}

export default Home;