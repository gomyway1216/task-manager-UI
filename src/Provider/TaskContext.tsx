import React, { FC, createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TaskMin } from '../Constants/types';
import { getTasksMinByUserId } from '../api/task'
import { useAuth } from './AuthProvider';

interface TaskContextData {
  tasks: TaskMin[];
  loading: boolean;
}

const TaskContext = createContext<TaskContextData>({
  tasks: [],
  loading: true,
});

export const useTasks = () => {
  return useContext(TaskContext);
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskMin[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth(); // Get the userId from the context

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const tasks = await getTasksMinByUserId(userId);
      setTasks(tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    tasks,
    loading,
    fetchTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
