import React, { FC } from 'react';
import { Task, TaskMin, Tag, InputType } from '../../Constants/types';
import dayjs, { Dayjs } from 'dayjs';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Chip,
} from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface InputFieldProps {
  keyName: keyof InputType;
  value: string | number | number[] | TaskMin | Dayjs | null | undefined;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string | number | TaskMin | Dayjs | null | undefined
  ) => void;
  onSelectChange: (
    event: SelectChangeEvent<number[] | TaskMin>
  ) => void;
  onDateChange: (
    value: Dayjs | null,
    key: keyof Task
  ) => void;
  onDelete: (name: string, itemId: number) => void;
  list?: Tag[] | TaskMin[];
  error?: boolean;
}

const InputField: FC<InputFieldProps> = ({ keyName, value, onInputChange, onSelectChange, onDateChange, onDelete, list, error }) => {
  const fieldType = typeof value;

  const isTag = (item: Tag | TaskMin): item is Tag => {
    return 'name' in item;
  }

  const getTagNameById = (id: number) => {
    const item = (list as (Tag | TaskMin)[])?.find((item) => item.id === id);
    if (item) {
      return 'name' in item ? item.name : item.title;
    }
  };

  const isDayjs = (value: unknown): value is Dayjs => {
    return typeof value !== 'undefined' && dayjs.isDayjs(value);
  };

  if (keyName === 'timeDue') {
    value = isDayjs(value) ? value : null;
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          label="Date desktop"
          value={value}
          onChange={(newVal) => onDateChange(newVal, keyName)}
        />
      </LocalizationProvider>
    );
  } else if (fieldType === 'string' || fieldType === 'number') {
    return (
      <TextField
        id={keyName.toString()}
        name={keyName.toString()}
        label={keyName}
        value={value || ''}
        onChange={onInputChange}
        error={error}
      />
    );
  } else if (Array.isArray(value)) {
    return (
      <FormControl fullWidth>
        <InputLabel id={`${keyName}-label`}>{keyName}</InputLabel>
        <Select
          labelId={`${keyName}-label`}
          id={keyName.toString()}
          multiple
          value={value}
          onChange={onSelectChange}
          name={keyName.toString()}
          renderValue={(selected) => (
            <div>
              {selected.map((itemId) => (
                <Chip key={itemId} label={getTagNameById(itemId)}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  onDelete={() => onDelete(keyName.toString(), itemId)}
                />
              ))}
            </div>
          )}
        >
          {list?.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
            >
              {isTag(item) ? item.name : item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else if (fieldType === 'object') {
    return (
      <FormControl fullWidth>
        <InputLabel id={`${keyName}-label`}>{keyName}</InputLabel>
        <Select
          labelId={`${keyName}-label`}
          id={keyName.toString()}
          value={(value as TaskMin)?.id || ''}
          onChange={(event) => {
            if (event.target.value === 'none') {
              onSelectChange({
                target: {
                  name: keyName.toString(),
                  value: null,
                },
              } as unknown as SelectChangeEvent<TaskMin>);
            } else {
              const selectedTask = (list as TaskMin[])?.find((task) => task.id === event.target.value);
              if (selectedTask) {
                onSelectChange({
                  target: {
                    name: keyName.toString(),
                    value: selectedTask,
                  },
                } as SelectChangeEvent<TaskMin>);
              }
            }
          }}
          name={keyName.toString()}
        >
          <MenuItem value="none">None</MenuItem>
          {
            list?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {isTag(item) ? item.name : item.title}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  }

  return null;
};

export default InputField;