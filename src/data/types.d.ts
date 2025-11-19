export interface Sound {
  icon: React.ReactNode;
  id: string;
  label: string;
  src: string;
  dataI18n?: string;
}

export type Sounds = Array<Sound>;

export interface Category {
  icon: React.ReactNode;
  id: string;
  sounds: Sounds;
  title: string;
  dataI18n?: string;
}

export type Categories = Array<Category>;
