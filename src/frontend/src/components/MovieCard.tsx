import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Plus, Check } from 'lucide-react';
import { useMyList } from '../hooks/useMyList';
import { Button } from '@/components/ui/button';
import type { Movie } from '../backend';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const { isInList, toggleList, isUpdating } = useMyList();
  const [isHovered, setIsHovered] = useState(false);
  const inList = isInList(movie.title);

  const handleClick = () => {
    navigate({ to: '/movie/$title', params: { title: movie.title } });
  };

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleList(movie.title);
  };

  return (
    <div
      className="relative flex-shrink-0 w-36 sm:w-44 md:w-52 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-netflix-gray-800 shadow-lg">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
            <h3 className="text-white font-semibold text-sm line-clamp-2">{movie.title}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span>{movie.year.toString()}</span>
              <span>•</span>
              <span>{movie.genre}</span>
            </div>
            <Button
              size="sm"
              variant={inList ? 'secondary' : 'default'}
              onClick={handleToggleList}
              disabled={isUpdating}
              className="w-full"
            >
              {inList ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  In List
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Add to List
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
