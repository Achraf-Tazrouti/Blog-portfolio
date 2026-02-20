export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;

  focus?: string;
  goal?: string;
  status?: string;
  skills?: string[];

  tags?: string[]; // <-- toevoegen
}