import React, { createContext } from 'react';
import { recipes } from '../reducer/recipeReducer';

export const Recipes = createContext();
const initialState = {
    recipes: []
}

export const RecipesProvider = (props) =>{
    const [state, dispatch] = React.useReducer(recipes, initialState);
    const value = {state, dispatch};

    return <Recipes.Provider value={value}>
                {props.children}
           </Recipes.Provider>
}