export interface Repository {
  id: number;
  name: string;
  avatar_url_owner: string;
  created_at: Date;
  full_name: string;
}

export interface DataSource<T> {
  incomplete_results: boolean;
  total_count: number;
  items: T[];
}
