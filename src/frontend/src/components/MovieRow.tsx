import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Button } from '@/components/ui/button';
import type { Movie } from '../backend';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="space-y-2 md:space-y-3 px-4 md:px-8 lg:px-12 py-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </Button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  );
}
