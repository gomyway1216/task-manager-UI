import React, { FunctionComponent, useState } from 'react';
import TaskForm from './TaskForm';

const AddTaskPage: FunctionComponent = () => {
  return (
    <div>
      <div>Add Task</div>
      <TaskForm />
    </div>
  )
}

export default AddTaskPage;