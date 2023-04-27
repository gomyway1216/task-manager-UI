import React, { FC, useEffect, useState } from 'react'
import { Button, Chip, Stack, TextField } from '@mui/material';
import { useAuth } from '../../Provider/AuthProvider';
import { addTag, getAllTagsByUserId } from '../../api/tag';
import { Tag } from '../../Constants/types';

const TagListPage: FC = () => {
  const [tags, setTags] = React.useState<Tag[]>();
  const { userId } = useAuth();
  const [newTag, setNewTag] = useState('');

  const getTags = async () => {
    const tgs = await getAllTagsByUserId(userId);
    setTags(tgs);
  }

  useEffect(() => {
    getTags();
  }, []);

  const handleAddTag = async () => {
    const tagToBeSaved = {
      name: newTag,
      userId: userId
    }
    try {
      await addTag(tagToBeSaved);
      getTags();
      setNewTag('');
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div>
      <h1>Tag List</h1>
      <Stack direction="row" spacing={1}>
        {tags?.map((tag) => (
          <Chip key={tag.id} label={tag.name} />
        ))}
      </Stack>
      <div>
        <TextField
          id="newTag"
          name="newTag"
          label="New Tag"
          variant="outlined"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={handleAddTag}
        >Add</Button>
      </div>
    </div>
  );
}

export default TagListPage;