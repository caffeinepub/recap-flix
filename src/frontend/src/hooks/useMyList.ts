import { useGetList, useAddToList, useRemoveFromList } from './useQueries';

export function useMyList() {
  const { data: myList = [], isLoading } = useGetList();
  const addMutation = useAddToList();
  const removeMutation = useRemoveFromList();

  const isInList = (movieTitle: string) => {
    return myList.some((movie) => movie.title === movieTitle);
  };

  const toggleList = async (movieTitle: string) => {
    if (isInList(movieTitle)) {
      await removeMutation.mutateAsync(movieTitle);
    } else {
      await addMutation.mutateAsync(movieTitle);
    }
  };

  return {
    myList,
    isLoading,
    isInList,
    toggleList,
    addToList: addMutation.mutateAsync,
    removeFromList: removeMutation.mutateAsync,
    isUpdating: addMutation.isPending || removeMutation.isPending,
  };
}
