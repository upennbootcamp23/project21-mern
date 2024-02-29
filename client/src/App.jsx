import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

let client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client = {client}>
        <>
        <Navbar />
        <Outlet />
        </>
    </ApolloProvider>
  )
}


export default App;