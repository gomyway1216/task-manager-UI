import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Task } from '../../Constants/types';
import { getTaskByUserIdAndTaskId } from '../../api/task';
import { useAuth } from '../../Provider/AuthProvider';

const TaskPage: FC = () => {
  const { id } = useParams();
  const { userId } = useAuth(); // Get the userId from the context
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      if (!id) {
        throw new Error('No task id provided');
      }
      const task = await getTaskByUserIdAndTaskId(userId, id);
      setTask(task);
    } catch (error) {
      console.error('Failed to fetch task:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default TaskPage;
