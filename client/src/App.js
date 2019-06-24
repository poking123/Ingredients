import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import AddRecipe from './components/AddRecipe/AddRecipe';
import EditRecipe from './components/EditRecipe/EditRecipe';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path='/' component={Home} />
      <Route path='/Add_Recipe' component={AddRecipe} />
      <Route path='/Edit_Recipe' component={EditRecipe} />
    </div>
  );
}

export default App;
