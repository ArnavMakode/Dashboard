export interface Category {
  id: string;
  name: string;
  widgets?: Widget[];
}

export interface Widget {
  id: string;
  name: string;
  text?: string;
}
