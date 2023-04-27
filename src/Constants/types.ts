export interface TaskInput {
  name: string;
  inputTypes: InputType[];
}

export interface InputType {
  title: string;
  timeDue: string;
  description: string;
  link: string | null;
  appName: string | null;
  parent: Task | null;
  childrenIds: Task[];
  tagIds: Tag[];
}

export interface Task {
  id: number;
  userId: string;
  title: string;
  timeCreated: string;
  timeUpdated: string | null;
  timeDue: string;
  description: string;
  link: string | null;
  appName: string | null;
  parent: Task | null;
  children: Task[];
  tags: Tag[];
}

export interface TaskMin {
  id: number;
  title: string;
}

export interface NewTask {
  userId: string,
  title: string,
  timeDue?: string;
  description?: string | null;
  link?: string | null;
  appName?: string | null;
  parentId?: number | null;
  childrenId?: number[];
  tagIds?: number[];
}

export interface Tag {
  id?: number;
  userId: string;
  name: string;
}

export interface PageInfo {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface PagedResponse<T> {
  content: T[];
  pageable: {
    sort: PageInfo;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: PageInfo;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
