import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './components/context/authContext';
import { BrowserRouter } from 'react-router-dom';
import { RecipesProvider } from './components/context/recipeContext';

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <RecipesProvider>
                <App />
            </RecipesProvider>         
        </AuthProvider>
    </BrowserRouter>  
,document.getElementById('root'));
