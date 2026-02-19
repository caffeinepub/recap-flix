import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import HeroSkeleton from '../components/HeroSkeleton';
import MovieRowSkeleton from '../components/MovieRowSkeleton';
import { useGetAllMovies, useAddMovie } from '../hooks/useQueries';
import type { Movie } from '../backend';

export default function HomePage() {
  console.log('[HomePage] Rendering HomePage component at', new Date().toISOString());
  
  const { data: allMovies = [], isLoading, error, refetch } = useGetAllMovies();
  const addMovieMutation = useAddMovie();

  console.log('[HomePage] Movies loaded:', allMovies.length, 'isLoading:', isLoading, 'error:', error);

  // Seed sample data on first load
  useEffect(() => {
    const seedSampleData = async () => {
      console.log('[HomePage] Checking if seeding is needed. Movies count:', allMovies.length);
      
      if (allMovies.length > 0) {
        console.log('[HomePage] Movies already exist, skipping seed');
        return;
      }

      if (isLoading) {
        console.log('[HomePage] Still loading, waiting before seed');
        return;
      }

      console.log('[HomePage] Starting seed operation at', new Date().toISOString());

      const sampleMovies: Array<{
        title: string;
        genre: string;
        year: bigint;
        duration: bigint;
        posterUrl: string;
        backdropUrl: string;
        recapScript: string;
      }> = [
        {
          title: 'The Dark Knight',
          genre: 'Action',
          year: BigInt(2008),
          duration: BigInt(152),
          posterUrl: '/assets/generated/poster-action-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'In Gotham City, Batman faces his greatest challenge yet when the Joker emerges as a criminal mastermind. The film opens with a bank heist orchestrated by the Joker, who betrays his accomplices. Meanwhile, Bruce Wayne believes Harvey Dent, the new District Attorney, can be the hero Gotham needs, allowing Batman to retire. However, the Joker disrupts the mob\'s operations and forces Batman to confront his own moral boundaries. The Joker\'s chaos tests the limits of Batman\'s no-kill rule, culminating in Harvey Dent\'s transformation into Two-Face after losing Rachel Dawes. In the climactic showdown, Batman takes the blame for Dent\'s crimes to preserve hope in Gotham, becoming the Dark Knight the city deserves but not the one it needs right now.',
        },
        {
          title: 'Inception',
          genre: 'Sci-Fi',
          year: BigInt(2010),
          duration: BigInt(148),
          posterUrl: '/assets/generated/poster-thriller-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'Dom Cobb is a skilled thief who specializes in extracting secrets from people\'s subconscious while they dream. Haunted by the memory of his deceased wife Mal, Cobb is offered a chance at redemption: instead of stealing an idea, he must plant one—a process called inception. Assembling a team including Arthur, Ariadne, Eames, and Yusuf, Cobb targets Robert Fischer, heir to a business empire. The team creates a three-level dream within a dream, navigating through increasingly unstable dreamscapes while Mal\'s projection threatens to sabotage the mission. In the deepest level, they successfully plant the idea for Fischer to dissolve his father\'s empire. The film ends ambiguously with Cobb\'s spinning top, leaving viewers questioning whether he\'s still dreaming.',
        },
        {
          title: 'The Shawshank Redemption',
          genre: 'Drama',
          year: BigInt(1994),
          duration: BigInt(142),
          posterUrl: '/assets/generated/poster-drama-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'Andy Dufresne, a banker, is wrongly convicted of murdering his wife and her lover, receiving two life sentences at Shawshank State Penitentiary. Inside, he befriends Red, a long-term inmate who can smuggle items. Andy uses his financial expertise to help the corrupt Warden Norton launder money while maintaining his innocence. Over nearly two decades, Andy secretly digs a tunnel through his cell wall using a small rock hammer, hidden behind a poster. He also creates a false identity and transfers the warden\'s illegal funds to this persona. After exposing the warden\'s crimes, Andy escapes through the tunnel during a storm, retrieves the money, and flees to Mexico. Red, eventually paroled, follows Andy\'s instructions to find him, and they reunite on a beach in Zihuatanejo.',
        },
        {
          title: 'Pulp Fiction',
          genre: 'Crime',
          year: BigInt(1994),
          duration: BigInt(154),
          posterUrl: '/assets/generated/poster-action-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'Quentin Tarantino\'s masterpiece weaves together multiple storylines in non-linear fashion. Hitmen Jules and Vincent retrieve a briefcase for their boss Marsellus Wallace, with Vincent later tasked to entertain Marsellus\'s wife Mia. Their night out nearly ends in tragedy when Mia overdoses, but Vincent saves her with an adrenaline shot. Meanwhile, boxer Butch Coolidge double-crosses Marsellus by winning a fight he was paid to lose. Fleeing with his girlfriend, Butch returns for his father\'s watch and accidentally encounters Marsellus. Both are captured by sadistic pawnshop owners, but Butch saves Marsellus, earning his freedom. The film concludes with Jules and Vincent\'s earlier diner scene, where Jules, after surviving a miracle, decides to leave the criminal life.',
        },
        {
          title: 'Forrest Gump',
          genre: 'Drama',
          year: BigInt(1994),
          duration: BigInt(142),
          posterUrl: '/assets/generated/poster-drama-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'Forrest Gump, a simple man with a low IQ but pure heart, narrates his extraordinary life while waiting at a bus stop. Despite his intellectual limitations, Forrest becomes a college football star, Vietnam War hero, ping-pong champion, and successful shrimp boat captain. Throughout his journey, he remains devoted to his childhood friend Jenny, who struggles with her own demons. Forrest inadvertently influences several historical events, meeting presidents and inspiring cultural phenomena. After Jenny returns and reveals they have a son together, they briefly reunite before she dies from an illness. Forrest raises their son alone, teaching him the same values his mother taught him. The film celebrates the idea that life is like a box of chocolates—you never know what you\'re going to get.',
        },
        {
          title: 'The Matrix',
          genre: 'Sci-Fi',
          year: BigInt(1999),
          duration: BigInt(136),
          posterUrl: '/assets/generated/poster-thriller-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'Computer hacker Neo discovers that reality as he knows it is actually a simulated world called the Matrix, created by sentient machines to distract humans while using their bodies as an energy source. Morpheus, a rebel leader, believes Neo is "The One" prophesied to end the war between humans and machines. Neo joins Morpheus\'s crew and begins training to manipulate the Matrix. When Morpheus is captured by Agent Smith, a program designed to eliminate threats, Neo rescues him, discovering his abilities in the process. Agent Smith kills Neo, but Trinity\'s love resurrects him, and he fully realizes his power as The One. Neo destroys Smith, saves Morpheus, and promises to show people a world without the Matrix\'s control.',
        },
        {
          title: 'Goodfellas',
          genre: 'Crime',
          year: BigInt(1990),
          duration: BigInt(146),
          posterUrl: '/assets/generated/poster-action-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'Henry Hill grows up idolizing the mobsters in his Brooklyn neighborhood and becomes involved with the Lucchese crime family. Alongside Jimmy Conway and Tommy DeVito, Henry participates in various criminal enterprises, from hijacking trucks to the infamous Lufthansa heist. As Henry rises through the ranks, he marries Karen and introduces her to the glamorous yet dangerous mob lifestyle. However, Tommy\'s violent nature leads to his execution by the mob for killing a made man. Henry\'s cocaine addiction and paranoia grow as he becomes involved in drug dealing, which violates mob rules. When facing a lengthy prison sentence, Henry enters witness protection, betraying his former associates. The film ends with Henry lamenting his mundane suburban life, missing the excitement of his former criminal existence.',
        },
        {
          title: 'Fight Club',
          genre: 'Thriller',
          year: BigInt(1999),
          duration: BigInt(139),
          posterUrl: '/assets/generated/poster-thriller-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'An insomniac office worker, dissatisfied with his consumerist lifestyle, meets Tyler Durden, a charismatic soap salesman. Together, they form Fight Club, an underground fighting ring that evolves into Project Mayhem, an anti-corporate terrorist organization. As the narrator becomes increasingly disturbed by Project Mayhem\'s escalating violence, he discovers a shocking truth: Tyler Durden is his own dissociative identity, a manifestation of everything he wishes he could be. Tyler\'s plan involves destroying credit card company buildings to erase debt records and reset the financial system. The narrator attempts to stop Tyler by shooting himself, which eliminates the Tyler personality. The film ends with the narrator and Marla Singer watching buildings collapse, holding hands as the world\'s financial infrastructure crumbles.',
        },
        {
          title: 'The Godfather',
          genre: 'Crime',
          year: BigInt(1972),
          duration: BigInt(175),
          posterUrl: '/assets/generated/poster-drama-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'The Corleone family saga begins with Don Vito Corleone, the powerful head of a New York crime family, conducting business at his daughter\'s wedding. When Vito refuses to enter the drug trade, rival gangster Sollozzo attempts to assassinate him. Vito\'s youngest son Michael, initially uninvolved in the family business, kills Sollozzo and a corrupt police captain, forcing him to flee to Sicily. While in hiding, Michael marries Apollonia, who is killed in a car bomb meant for him. Returning to America, Michael assumes control of the family and marries Kay Adams. In a masterful sequence, Michael consolidates power by having all rival family heads assassinated while attending his nephew\'s baptism. The film ends with Michael lying to Kay about his involvement in murders, as he becomes the new Godfather.',
        },
        {
          title: 'Interstellar',
          genre: 'Sci-Fi',
          year: BigInt(2014),
          duration: BigInt(169),
          posterUrl: '/assets/generated/poster-thriller-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'In a near-future Earth devastated by crop blights and dust storms, former NASA pilot Cooper discovers coordinates leading to a secret NASA facility. Scientists have found a wormhole near Saturn, potentially leading to habitable planets. Cooper joins a mission through the wormhole, leaving behind his daughter Murph. The crew visits two planets: one covered in water with time dilation effects, and another frozen wasteland where they discover Dr. Mann, who betrays them. Cooper sacrifices himself by entering a black hole, where he discovers a tesseract constructed by future humans. Inside, he can observe and interact with Murph\'s childhood bedroom across time, sending her the quantum data needed to solve the gravity equation. Murph solves the equation, saving humanity. Cooper is rescued and reunited with an elderly Murph, who encourages him to find Brand, who is establishing a colony on the third planet.',
        },
      ];

      try {
        console.log('[HomePage] Adding', sampleMovies.length, 'sample movies');
        
        for (const movie of sampleMovies) {
          await addMovieMutation.mutateAsync(movie);
          console.log('[HomePage] Added movie:', movie.title);
        }
        
        console.log('[HomePage] Seed completed successfully, refetching movies');
        await refetch();
        console.log('[HomePage] Movies refetched after seed');
      } catch (error) {
        console.error('[HomePage] Error seeding data:', error);
        console.error('[HomePage] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      }
    };

    seedSampleData();
  }, [allMovies.length, isLoading, addMovieMutation, refetch]);

  // Show loading state
  if (isLoading) {
    console.log('[HomePage] Rendering loading state');
    return (
      <>
        <Navbar />
        <HeroSkeleton />
        <MovieRowSkeleton />
        <MovieRowSkeleton />
        <MovieRowSkeleton />
      </>
    );
  }

  // Show error state
  if (error) {
    console.error('[HomePage] Rendering error state:', error);
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Failed to load movies</h2>
            <p className="text-gray-400">Please try refreshing the page</p>
          </div>
        </div>
      </>
    );
  }

  // Show empty state while seeding
  if (allMovies.length === 0) {
    console.log('[HomePage] No movies yet, showing loading state while seeding');
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red mx-auto"></div>
            <p className="text-gray-400">Loading your movie collection...</p>
          </div>
        </div>
      </>
    );
  }

  console.log('[HomePage] Rendering full page with', allMovies.length, 'movies');

  const actionMovies = allMovies.filter((m: Movie) => m.genre === 'Action');
  const sciFiMovies = allMovies.filter((m: Movie) => m.genre === 'Sci-Fi');
  const dramaMovies = allMovies.filter((m: Movie) => m.genre === 'Drama');
  const crimeMovies = allMovies.filter((m: Movie) => m.genre === 'Crime');
  const thrillerMovies = allMovies.filter((m: Movie) => m.genre === 'Thriller');

  const featuredMovie = allMovies[0];

  return (
    <>
      <Navbar />
      <HeroSection movie={featuredMovie} />
      {actionMovies.length > 0 && <MovieRow title="Action Movies" movies={actionMovies} />}
      {sciFiMovies.length > 0 && <MovieRow title="Sci-Fi Movies" movies={sciFiMovies} />}
      {dramaMovies.length > 0 && <MovieRow title="Drama Movies" movies={dramaMovies} />}
      {crimeMovies.length > 0 && <MovieRow title="Crime Movies" movies={crimeMovies} />}
      {thrillerMovies.length > 0 && <MovieRow title="Thriller Movies" movies={thrillerMovies} />}
      
      <footer className="bg-netflix-black border-t border-gray-800 py-8 px-8 md:px-16">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Movie Recap. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-netflix-red hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
