import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Movie } from '../backend';

export function useSearchMovies(searchText: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['movies', 'search', searchText],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchMovies(searchText);
    },
    enabled: !!actor && !isFetching && searchText.length > 0,
  });
}

export function useGetMovie(title: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Movie | null>({
    queryKey: ['movie', title],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getMovie(title);
      } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!title,
  });
}

export function useGetList() {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['myList'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getList();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToList() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieTitle: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addToList(movieTitle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myList'] });
    },
  });
}

export function useRemoveFromList() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieTitle: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.removeFromList(movieTitle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myList'] });
    },
  });
}

export function useAddMovie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movie: {
      title: string;
      genre: string;
      year: bigint;
      duration: bigint;
      posterUrl: string;
      backdropUrl: string;
      recapScript: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addMovie(
        movie.title,
        movie.genre,
        movie.year,
        movie.duration,
        movie.posterUrl,
        movie.backdropUrl,
        movie.recapScript
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
}

export function useSeedData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.seedData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
}
