export type GetUserType = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  preferences: {
    notify: boolean;
  };
  statistics: {
    ratings_given: number;
    registered_movies: number;
    display_time: number;
    average_rating_movies: number;
  };
  created_at: string;
  updated_at: string;
};
