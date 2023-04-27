import React, { FC } from 'react';
import TaskForm from './TaskForm';

const AddTaskPage: FC = () => {
  return (
    <div>
      <div>Add Task</div>
      <TaskForm />
    </div>
  )
}

export default AddTaskPage;