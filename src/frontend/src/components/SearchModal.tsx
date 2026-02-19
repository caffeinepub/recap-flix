import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { X, Search } from 'lucide-react';
import { useSearchMovies } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { Movie } from '../backend';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { data: results = [], isLoading } = useSearchMovies(searchQuery);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleMovieClick = (title: string) => {
    navigate({ to: '/movie/$title', params: { title } });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-netflix-gray-900 border-netflix-gray-700 max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Search Movies</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for movie recaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-netflix-gray-800 border-netflix-gray-700 text-white placeholder:text-gray-500"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {searchQuery.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              Start typing to search for movie recaps
            </div>
          ) : isLoading ? (
            <div className="text-center text-gray-400 py-12">Searching...</div>
          ) : results.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {results.map((movie) => (
                <div
                  key={movie.title}
                  onClick={() => handleMovieClick(movie.title)}
                  className="cursor-pointer group"
                >
                  <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-netflix-gray-800">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-white text-sm mt-2 line-clamp-2">{movie.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
