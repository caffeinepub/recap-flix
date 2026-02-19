import { useNavigate } from '@tanstack/react-router';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Movie } from '../backend';

interface HeroSectionProps {
  movie: Movie | null;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const navigate = useNavigate();

  if (!movie) {
    return (
      <div className="relative h-[70vh] md:h-[85vh] w-full bg-netflix-gray-900 animate-pulse" />
    );
  }

  const handleReadRecap = () => {
    navigate({ to: '/movie/$title', params: { title: movie.title } });
  };

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="text-netflix-red font-semibold">{movie.year.toString()}</span>
            <span className="text-gray-300">{movie.genre}</span>
            <span className="text-gray-300">{movie.duration.toString()} min read</span>
          </div>

          <p className="text-base md:text-lg text-gray-300 line-clamp-3 max-w-xl">
            {movie.recapScript.substring(0, 200)}...
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleReadRecap}
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold text-base md:text-lg px-8"
            >
              <Play className="h-5 w-5 mr-2 fill-current" />
              Read Recap
            </Button>
            <Button
              onClick={handleReadRecap}
              size="lg"
              variant="secondary"
              className="bg-gray-500/70 text-white hover:bg-gray-500/50 font-semibold text-base md:text-lg px-8"
            >
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
