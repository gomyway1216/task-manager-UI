import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Provider/AuthProvider';
import RouteList from './RouteList';
import NarBar from './Component/NavBar/NarBar';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NarBar />
        <RouteList />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
