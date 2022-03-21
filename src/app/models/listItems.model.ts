export interface ListItems {
  id: number;
  name: string;
  desc: string;
  star_rating: number;
  no_of_reviews: number;
  image: string;
}

export interface Filters {
  type: string;
  name: string;
  id: string;
}
