import React, { useEffect, useState } from "react";
import { fetchTasks } from "../../api/task";
import { Task } from "../../Constants/types";
import { useAuth } from '../../Provider/AuthProvider';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { userId } = useAuth(); // Get the userId from the context
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks(userId, pageNumber, pageSize)
      .then((data) => setTasks(data.content))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [pageNumber, pageSize]);

  return (
    <div>
      <h1>Task List</h1>
      <Button variant="contained" onClick={() => navigate('/task-add')}>Add Task</Button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
