import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Movie } from '../backend';

export function useGetAllMovies() {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['movies', 'all'],
    queryFn: async () => {
      if (!actor) {
        console.log('[useGetAllMovies] Actor not available, returning empty array');
        return [];
      }
      try {
        console.log('[useGetAllMovies] Fetching all movies from backend');
        const movies = await actor.getAllMovies();
        console.log('[useGetAllMovies] Fetched movies:', movies.length);
        return movies;
      } catch (error) {
        console.error('[useGetAllMovies] Error fetching movies:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchMovies(searchText: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['movies', 'search', searchText],
    queryFn: async () => {
      if (!actor) {
        console.log('[useSearchMovies] Actor not available, returning empty array');
        return [];
      }
      try {
        console.log('[useSearchMovies] Searching movies with text:', searchText);
        const movies = await actor.searchMovies(searchText);
        console.log('[useSearchMovies] Found movies:', movies.length);
        return movies;
      } catch (error) {
        console.error('[useSearchMovies] Error searching movies:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && searchText.length > 0,
  });
}

export function useGetMovie(title: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Movie | null>({
    queryKey: ['movie', title],
    queryFn: async () => {
      if (!actor) {
        console.log('[useGetMovie] Actor not available, returning null');
        return null;
      }
      try {
        console.log('[useGetMovie] Fetching movie:', title);
        const movie = await actor.getMovie(title);
        console.log('[useGetMovie] Fetched movie successfully');
        return movie;
      } catch (error) {
        console.error('[useGetMovie] Error fetching movie:', error);
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
      if (!actor) {
        console.log('[useGetList] Actor not available, returning empty array');
        return [];
      }
      try {
        console.log('[useGetList] Fetching user list');
        const list = await actor.getList();
        console.log('[useGetList] Fetched list:', list.length);
        return list;
      } catch (error) {
        console.error('[useGetList] Error fetching list:', error);
        return [];
      }
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
      console.log('[useAddToList] Adding movie to list:', movieTitle);
      await actor.addToList(movieTitle);
    },
    onSuccess: () => {
      console.log('[useAddToList] Successfully added to list, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['myList'] });
    },
    onError: (error) => {
      console.error('[useAddToList] Error adding to list:', error);
    },
  });
}

export function useRemoveFromList() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieTitle: string) => {
      if (!actor) throw new Error('Actor not initialized');
      console.log('[useRemoveFromList] Removing movie from list:', movieTitle);
      await actor.removeFromList(movieTitle);
    },
    onSuccess: () => {
      console.log('[useRemoveFromList] Successfully removed from list, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['myList'] });
    },
    onError: (error) => {
      console.error('[useRemoveFromList] Error removing from list:', error);
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
      console.log('[useAddMovie] Adding movie:', movie.title);
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
      console.log('[useAddMovie] Successfully added movie, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
    onError: (error) => {
      console.error('[useAddMovie] Error adding movie:', error);
    },
  });
}
