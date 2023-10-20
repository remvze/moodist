export interface Sound {
  label: string;
  src: string;
  icon: React.ReactNode;
  id: string;
}

export type Sounds = Array<Sound>;

export interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  sounds: Sounds;
}

export type Categories = Array<Category>;
