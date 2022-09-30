export interface ToDoItemTypes {
  id: string;
  taskText: string;
  created: string;
  expireUntil: string;
  completed: boolean;
}

export interface withFormSimplePropTypes {
  taskText: string;
  setTaskText: (value: string) => void;
  onSubmit: (value: React.SyntheticEvent) => void;
  isError: boolean;
  errorMessage: string;
}

export interface withFormFullPropTypes extends withFormSimplePropTypes {
  created: string;
  setCreated: (value: string) => void;
  expire: string;
  setExpire: (value: string) => void;
}

export interface SortTypes {
  title: string;
  value: string;
}

export interface SetSortTypes {
  sort: SortTypes;
  setSort: React.Dispatch<React.SetStateAction<SortTypes>>;
}

export interface SetSearchTypes {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
