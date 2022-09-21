export interface ToDoItemTypes {
  id: string;
  text: string;
  created: string;
  expireUntil: string;
  completed: boolean;
}

export interface withFormSimplePropTypes {
  text: string;
  setText: (value: string) => void;
  onSubmit: (value: React.SyntheticEvent) => void;
}

export interface withFormFullPropTypes extends withFormSimplePropTypes {
  setCreated: (value: string) => void;
  setExpire: (value: string) => void;
}
