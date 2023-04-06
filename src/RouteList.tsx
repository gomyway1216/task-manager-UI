import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomePage from './Page/Home/HomePage';
import AddTaskPage from './Page/AddTask/AddTaskPage'
import SignInPage from './Page/SignIn/SignInPage';
import TaskListPage from './Page/TaskList/TaskListPage';
import TaskPage from './Page/Task/TaskPage';
import TagListPage from './Page/TagList/TagListPage';

const RouteList: React.FC = () => {
  return (
    <div className="page-container">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/task-add' element={<PrivateRoute />}>
          <Route path='/task-add' element={<AddTaskPage />} />
        </Route>
        <Route path='/task' element={<PrivateRoute />}>
          <Route path='/task' element={<TaskListPage />} />
        </Route>
        <Route path='/task/:id' element={<PrivateRoute />}>
          <Route path='/task/:id' element={<TaskPage />} />
        </Route>
        <Route path='/tag' element={<PrivateRoute />}>
          <Route path='/tag' element={<TagListPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteList;