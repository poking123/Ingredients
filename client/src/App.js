import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Recipes from './components/Recipes/Recipes';
import $ from 'jquery';
import bootstrap from 'bootstrap';

// Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Apollo Client Setup
const apolloClient = new ApolloClient({
  // uri: process.env.APOLLO_URI
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
    <div className="App">
      <Navbar />
      <Route exact path='/' component={Home} />
      <Route path='/Shopping_List' component={ShoppingList} />
      <Route path='/Recipes' component={Recipes} />
    </div>
    </ApolloProvider>
    
  );
}

export default App;
