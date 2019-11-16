import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

// Navbar Elements
import ShoppingList from './components/ShoppingList/ShoppingList';
import Recipes from './components/Recipes/Recipes';

// Jquery and Bootstrap, needed for click functions
// Even though they are not used
import $ from 'jquery';
import bootstrap from 'bootstrap';

// Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Apollo Client Setup
let serverURI = process.env.REACT_APP_SERVER_URI;
const apolloClient = new ApolloClient({
//   uri: serverURI + 'graphql'
});

function onAuthRequired({ history }) {
	history.push('/login');
}

function App() {
	return (
	<ApolloProvider client={apolloClient}>
		<Router>
			<Security
				issuer="https://dev-875613.okta.com/oauth2/default"
				client_id="0oa1slh8qopq2E9CY357"
				redirect_uri={window.location.origin + '/implicit/callback'}
				onAuthRequired={onAuthRequired}
			>
			<div className="App">
				<Navbar />
				<Route exact path='/' component={Home} />
				<Route path='/Shopping_List' component={ShoppingList} />
				<Route path='/Recipes' component={Recipes} />
			</div>
			</Security>
		</Router>
	</ApolloProvider>
	);
}

export default App;
