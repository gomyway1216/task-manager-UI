import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Provider/AuthProvider';
import { TaskProvider } from './Provider/TaskContext';
import RouteList from './RouteList';
import NarBar from './Component/NavBar/NarBar';

const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <NarBar />
          <RouteList />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter >
  )
}

export default App;
