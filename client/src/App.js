import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Navbar Elements
import ShoppingList from './components/ShoppingList/ShoppingList';
import Recipes from './components/Recipes/Recipes';
import CreateAnAccount from './components/CreateAnAccount';

// Jquery and Bootstrap, needed for click functions
// Even though they are not used
import $ from 'jquery';
import bootstrap from 'bootstrap';

// Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Apollo Client Setup
let serverURI = process.env.REACT_APP_SERVER_URI;
console.log('serverURI is', serverURI);
console.log('endpoint is', serverURI + 'graphql');
const apolloClient = new ApolloClient({
  uri: serverURI + 'graphql'
});

function App() {
	return (
	<ApolloProvider client={apolloClient}>
		<Router>
			<div className="App">
				<Navbar />
				<Route exact path='/' component={Home} />
				<Route path='/Shopping_List' component={ShoppingList} />
				<Route path='/Recipes' component={Recipes} />
				<Route path='/Create_An_Account' component={CreateAnAccount} />
			</div>
		</Router>
	</ApolloProvider>
	);
}

export default App;
