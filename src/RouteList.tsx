import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomePage from './Page/Home/HomePage';
import AddTaskPage from './Page/AddTask/AddTaskPage'
import SignInPage from './Page/SignIn/SignInPage';
import TaskListPage from './Page/TaskList/TaskListPage';
import TaskPage from './Page/Task/TaskPage';
import TagListPage from './Page/TagList/TagListPage';

const RouteList: FC = () => {
  return (
    <div className="page-container">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/task-add' element={<PrivateRoute><AddTaskPage /></PrivateRoute>} />
        <Route path='/task' element={<PrivateRoute><TaskListPage /></PrivateRoute>} />
        <Route path='/task/:id' element={<PrivateRoute><TaskPage /></PrivateRoute>} />
        <Route path='/tag' element={<PrivateRoute><TagListPage /></PrivateRoute>} />
      </Routes>
    </div >
  );
};

export default RouteList;