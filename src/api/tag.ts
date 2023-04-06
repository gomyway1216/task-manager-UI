import { Tag } from '../Constants/types';

// Function to fetch tags by userId
export const getAllTagsByUserId = async (userId: string): Promise<Tag[]> => {
  try {
    const response = await fetch(`http://localhost:8080/api/tags/user/${userId}`);

    if (!response.ok) {
      throw new Error(`Error fetching tags: ${response.statusText}`);
    }

    const tags: Tag[] = await response.json();
    return tags;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching tags:', error.message);
    } else {
      console.error('An unexpected error occurred while fetching tags.');
    }
    return [];
  }
};

// Function to fetch tags by userId and tagId
export const getTagByUserIdAndTagId = async (
  userId: string,
  tagId: string
): Promise<Tag> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/tags/user/${userId}/tag/${tagId}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching tag: ${response.statusText}`);
    }

    const tag: Tag = await response.json();
    return tag;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching tag:', error.message);
    } else {
      console.error('An unexpected error occurred while fetching tag.');
    }
    return {} as Tag;
  }
};

// Function to add a tag
export const addTag = async (tag: Tag): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8080/api/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    });

    if (!response.ok) {
      throw new Error(`Error adding tag: ${response.statusText}`);
    }

    const data: { id: string } = await response.json();
    return data.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding tag:', error.message);
    } else {
      console.error('An unexpected error occurred while adding tag.');
    }
    return '';
  }
};

// Function to update a tag
export const updateTag = async (tag: Tag): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/tags/user/${tag.userId}/tag/${tag.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tag),
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating tag: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating tag:', error.message);
    } else {
      console.error('An unexpected error occurred while updating tag.');
    }
  }
};

// Function to delete a tag
export const deleteTag = async (userId: string, tagId: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/tags/user/${userId}/tag/${tagId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting tag: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting tag:', error.message);
    } else {
      console.error('An unexpected error occurred while deleting tag.');
    }
  }
};