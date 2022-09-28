export interface ToDoType {
  id: string;
  text: string;
  created: string;
  expireUntil: string;
}

export interface ToDoItemTypes extends ToDoType {
  completed: boolean;
}

export interface withFormSimplePropTypes {
  text: string;
  setText: (value: string) => void;
  onSubmit: (value: React.SyntheticEvent) => void;
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
