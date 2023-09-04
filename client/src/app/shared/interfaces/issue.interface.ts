import { Category } from './category.interface';

export interface Issue {
  id: number;
  categoryId: number;
  image: string;
  latitude: string;
  longitude: string;
  created_at: string | null;
  reporterId: number;
  category: Category;
}
