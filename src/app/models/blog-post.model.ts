export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;

  // Nieuwe velden voor home
  focus?: string;
  goal?: string;
  status?: string;
  skills?: string[];
}