import { PagedResponse, NewTask, Task, TaskMin } from "../Constants/types";

export const fetchTasks = async (
  userId: string,
  pageNumber: number,
  pageSize: number
): Promise<PagedResponse<Task>> => {
  const response = await fetch(
    `http://localhost:8080/api/tasks/user/${userId}?page=${pageNumber}&size=${pageSize}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tasks for user ${userId}: ${response.statusText}`
    );
  }

  const data: PagedResponse<Task> = await response.json();
  return data;
}

export const getTasksMinByUserId = async (userId: string): Promise<TaskMin[]> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/tasks/user/${userId}/all`
    );

    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.statusText}`);
    }

    const tasks: TaskMin[] = await response.json();
    return tasks;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      console.error('An unexpected error occurred while fetching tasks.');
    }
    return [];
  }
};

// Function to fetch tasks by userId and taskId
export const getTaskByUserIdAndTaskId = async (
  userId: string,
  taskId: string
): Promise<Task> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/tasks/user/${userId}/task/${taskId}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching task: ${response.statusText}`);
    }

    const task: Task = await response.json();
    return task;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching task:', error.message);
    } else {
      console.error('An unexpected error occurred while fetching task.');
    }
    return {} as Task;
  }
};

// Function to add a task
export const addTask = async (task: NewTask): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Error adding task: ${response.statusText}`);
    }

    const data: { id: string } = await response.json();
    return data.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding task:', error.message);
    } else {
      console.error('An unexpected error occurred while adding task.');
    }
    return '';
  }
};

// Function to update a task
export const updateTask = async (task: Task): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/tasks/user/${task.userId}/task/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating task: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating task:', error.message);
    } else {
      console.error('An unexpected error occurred while updating task.');
    }
  }
};

// Function to delete a task
export const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/tasks/user/${userId}/task/${taskId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting task: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting task:', error.message);
    } else {
      console.error('An unexpected error occurred while deleting task.');
    }
  }
};

