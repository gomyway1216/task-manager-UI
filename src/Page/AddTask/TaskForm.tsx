import React, { useEffect, useState } from 'react';
import { InputType } from '../../Constants/types';
import InputField from './InputField';
import { Tag, Task } from '../../Constants/types';
import { Button, SelectChangeEvent, Snackbar } from '@mui/material';
import { addTask, getTasksMinByUserId } from '../../api/task';
import { getAllTagsByUserId } from '../../api/tag';
import { useAuth } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import utc from "dayjs/plugin/utc";
import styles from './task-form.module.scss';

dayjs.extend(utc);

const TaskForm: React.FC = () => {
  const initialTask = {
    title: '',
    timeDue: undefined as Dayjs | undefined,
    description: '',
    link: '',
    appName: '',
    parent: null,
    childrenIds: [],
    tagIds: [],
  };

  const { userId } = useAuth();
  const [task, setTask] = useState(initialTask);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [titleEmpty, setTitleEmpty] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string | number | Dayjs | string[] | Task | null | undefined
  ) => {
    const { name } = event.target;
    const inputValue = value || event.target.value;

    if (name === 'title' && inputValue === '') {
      setTitleEmpty(true);
    } else if (name === 'title') {
      setTitleEmpty(false);
    }
    setTask((prevTask) => ({ ...prevTask, [name]: value || inputValue }));
  };

  const handleSelectChange = (
    event: SelectChangeEvent<number[] | Task>
  ) => {
    if (event.target.name) {
      const { name, value } = event.target;
      setTask((prevTask) => ({ ...prevTask, [name]: value }));
    }
  };

  const handleDateChange = (value: Dayjs | null, name: string) => {
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDelete = (name: string, itemId: number) => {
    if (name === 'tagIds') {
      setTask((prevTask) => ({
        ...prevTask,
        tagIds: prevTask.tagIds.filter((id) => id !== itemId),
      }));
    } else if (name === 'childrenIds') {
      setTask((prevTask) => ({
        ...prevTask,
        childrenIds: prevTask.childrenIds.filter((id) => id !== itemId),
      }));
    }
  };

  const taskKeys: (keyof InputType)[] = [
    'title',
    'timeDue',
    'description',
    'link',
    'appName',
    'parent',
    'childrenIds',
    'tagIds',
  ];

  const getTasksMin = async () => {
    const tasks = await getTasksMinByUserId(userId);
    setTaskList(tasks);
  }

  const getTags = async () => {
    const tgs = await getAllTagsByUserId(userId);
    setTagList(tgs);
  }

  useEffect(() => {
    getTasksMin();
    getTags();
  }, []);

  const handleSave = async () => {
    if (!task.title) {
      setError('Title is required');
      setOpenSnackbar(true);
      return;
    }

    let timeDueString: string | undefined;
    if (task.timeDue !== null) {
      timeDueString = task.timeDue?.utc().format();
    }

    try {
      const taskId = await addTask(
        {
          ...task,
          timeDue: timeDueString,
          userId,
          parentId: (task.parent as Task | null)?.id,

        });
      if (taskId) {
        navigate('/task');
      } else {
        setError('Error creating task');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError('Error creating task');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <div className={styles.title}>Task Form</div>
        {taskKeys.map((key) => {
          const keyName = key as keyof InputType;
          return (
            <div className={styles.inputField} key={keyName}>
              <InputField
                key={keyName}
                keyName={keyName}
                value={task[keyName]}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onDateChange={handleDateChange}
                onDelete={handleDelete}
                list={keyName === 'tagIds' ? tagList : taskList}
                error={keyName === 'title' && titleEmpty}
              />
            </div>
          );
        })}
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={error}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <Button color="secondary" size="small" onClick={() => setOpenSnackbar(false)}>
            Close
          </Button>
        }
      />
    </div>
  );
};

export default TaskForm;
