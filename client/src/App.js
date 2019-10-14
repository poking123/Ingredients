import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Recipes from './components/Recipes/Recipes';
import AddRecipe from './components/AddRecipe/AddRecipe';
import 'jquery';
import 'bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path='/' component={Home} />
      <Route path='/Shopping_List' component={ShoppingList} />
      <Route path='/Recipes' component={Recipes} />
    </div>
  );
}

export default App;
