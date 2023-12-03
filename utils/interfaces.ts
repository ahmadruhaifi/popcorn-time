import { ReactNode } from "react";

export interface ProviderProps {
  children: ReactNode;
}

export interface MovieData {
  results: any[];
  total_results?: number;
  total_pages?: number;
  page?: number;
}

export interface HomeProps {
  searchParams: {
    page: string;
  };
}

export interface Result {
  id: string;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
  title?: string;
  original_title?: string;
  release_date?: string;
  vote_count?: number;
  vote_average?: number;
}

export interface ResultItemsProps {
  results: Result;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

export interface Movie {
  id: string;
  title: string;
  overview: string;
  release_date: string;
}

export interface Actor {
  profile_path: string | null;
  name: string;
  character: string;
}

export interface PaginationProps {
  totalPages: number;
}

export interface ResultsProps {
  results: Array<{ id: string }>;
}
