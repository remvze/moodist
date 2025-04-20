export interface Sound {
  icon: React.ReactNode;
  id: string;
  labelKey: string;
  src: string;
}

export type Sounds = Array<Sound>;

export interface Category {
  icon: React.ReactNode;
  id: string;
  sounds: Sounds;
  titleKey: string;
}

export type Categories = Array<Category>;
