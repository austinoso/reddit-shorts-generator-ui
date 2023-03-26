export interface Comment {
  id: string;
  body: string;
  audio: string;
  image: string;
  duration: number;
}

export interface Post {
  id: string;
  duration: number;
  fileDir: string;
  title: {
    text: string;
    audio: string;
    duration: number;
    image: string;
  };
  comments: Comment[];
}
