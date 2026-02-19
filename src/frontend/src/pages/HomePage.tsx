import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import { useSearchMovies, useAddMovie } from '../hooks/useQueries';
import type { Movie } from '../backend';

export default function HomePage() {
  const { data: allMovies = [] } = useSearchMovies('');
  const addMovieMutation = useAddMovie();

  // Seed sample data on first load
  useEffect(() => {
    const seedSampleData = async () => {
      if (allMovies.length > 0) return;

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
        {
          title: 'The Silence of the Lambs',
          genre: 'Thriller',
          year: BigInt(1991),
          duration: BigInt(118),
          posterUrl: '/assets/generated/poster-thriller-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'FBI trainee Clarice Starling is assigned to interview Dr. Hannibal Lecter, a brilliant psychiatrist and cannibalistic serial killer, hoping he can provide insights into another serial killer known as Buffalo Bill, who skins his female victims. Lecter agrees to help in exchange for personal information about Clarice\'s troubled past. As their psychological cat-and-mouse game intensifies, Lecter provides cryptic clues that help Clarice piece together Buffalo Bill\'s identity as Jame Gumb. When Gumb kidnaps a senator\'s daughter, the investigation becomes urgent. Lecter escapes custody in a gruesome fashion while Clarice tracks Gumb to his home. In a tense climax, Clarice kills Gumb in his basement, rescuing the captive woman. The film ends with Lecter calling Clarice to congratulate her, before disappearing into a crowd, ominously following his former psychiatrist.',
        },
        {
          title: 'Parasite',
          genre: 'Thriller',
          year: BigInt(2019),
          duration: BigInt(132),
          posterUrl: '/assets/generated/poster-thriller-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'The impoverished Kim family lives in a semi-basement apartment in Seoul. When son Ki-woo is recommended for a tutoring job with the wealthy Park family, he sees an opportunity. One by one, the Kims infiltrate the Park household by posing as unrelated, highly qualified workers—tutor, art therapist, driver, and housekeeper. Their scheme works perfectly until they discover the former housekeeper\'s husband has been living in a secret bunker beneath the house. A violent confrontation ensues when the former housekeeper returns. During the Parks\' son\'s birthday party, the bunker-dwelling husband escapes and stabs Ki-jung. In the chaos, Ki-taek kills Mr. Park and flees to the bunker. Ki-woo, recovering from his injuries, vows to earn enough money to buy the house and free his father, though the film suggests this dream may be impossible.',
        },
        {
          title: 'Gladiator',
          genre: 'Action',
          year: BigInt(2000),
          duration: BigInt(155),
          posterUrl: '/assets/generated/poster-action-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'Maximus Decimus Meridius, a powerful Roman general, is beloved by Emperor Marcus Aurelius, who wishes to make him his successor instead of his son Commodus. Enraged, Commodus murders his father and orders Maximus\'s execution. Maximus escapes but arrives home too late to save his wife and son from Commodus\'s soldiers. Captured by slave traders, Maximus becomes a gladiator, fighting in provincial arenas while plotting revenge. His prowess brings him to Rome\'s Colosseum, where he reveals his identity to Commodus in front of a cheering crowd. Commodus, unable to execute the popular hero publicly, challenges Maximus to a duel but stabs him beforehand. Despite his wound, Maximus kills Commodus in the arena before dying himself. His final vision shows him reunited with his family in the afterlife, while Rome begins its return to a republic.',
        },
        {
          title: 'The Departed',
          genre: 'Crime',
          year: BigInt(2006),
          duration: BigInt(151),
          posterUrl: '/assets/generated/poster-action-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'In Boston, Irish mob boss Frank Costello plants Colin Sullivan as a mole in the Massachusetts State Police, while the police send undercover cop Billy Costigan to infiltrate Costello\'s crew. Both moles struggle to maintain their cover as their respective organizations realize they have a rat. The tension escalates as each side races to identify the other\'s mole. Billy falls for police psychiatrist Madolyn, who is also Colin\'s girlfriend, complicating matters further. When Billy discovers Colin\'s identity, he plans to expose him, but Colin has Billy killed by another corrupt cop. Colin then kills the corrupt cop to cover his tracks and appears to have gotten away with everything. However, in the final scene, Sergeant Dignam, who had been investigating independently, executes Colin in his apartment, avenging Billy and completing the cycle of violence.',
        },
        {
          title: 'Whiplash',
          genre: 'Drama',
          year: BigInt(2014),
          duration: BigInt(106),
          posterUrl: '/assets/generated/poster-drama-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'Andrew Neiman, an ambitious jazz drummer at a prestigious music conservatory, catches the attention of Terence Fletcher, a ruthless instructor known for his abusive teaching methods. Fletcher recruits Andrew for his elite studio band, where he subjects him to psychological and physical abuse, pushing him beyond his limits. Andrew becomes obsessed with achieving perfection, practicing until his hands bleed and sacrificing his personal relationships. After a car accident on the way to a competition, Andrew performs despite his injuries, but Fletcher dismisses him. Andrew\'s lawyer father helps him file a complaint that gets Fletcher fired. Months later, Andrew encounters Fletcher at a jazz club, and Fletcher invites him to perform at a concert. Fletcher sabotages Andrew by giving him the wrong music, but Andrew refuses to quit, instead launching into an explosive drum solo that proves his greatness, earning Fletcher\'s respect in a ambiguous ending.',
        },
        {
          title: 'The Prestige',
          genre: 'Thriller',
          year: BigInt(2006),
          duration: BigInt(130),
          posterUrl: '/assets/generated/poster-thriller-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'In Victorian-era London, magicians Robert Angier and Alfred Borden start as friends but become bitter rivals after a trick goes wrong, resulting in the death of Angier\'s wife. Borden develops an impossible trick called "The Transported Man," where he appears to teleport across the stage instantly. Obsessed with discovering Borden\'s secret, Angier travels to Colorado to commission scientist Nikola Tesla to build a machine. Tesla creates a device that clones whatever is placed inside it. Angier uses this to perform his own version of the trick, drowning his clone after each performance. Meanwhile, Borden is arrested for murdering Angier (actually a clone). The film\'s twist reveals that Borden\'s secret was having an identical twin, with both living as one person. After Borden is hanged, his twin kills Angier, revealing the horrifying cost of both magicians\' obsessions.',
        },
        {
          title: 'Superbad',
          genre: 'Comedy',
          year: BigInt(2007),
          duration: BigInt(113),
          posterUrl: '/assets/generated/poster-comedy-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'Best friends Seth and Evan are about to graduate high school and attend different colleges. Desperate to lose their virginity before separation, they promise to bring alcohol to a party hosted by their crushes. Their nerdy friend Fogell obtains a fake ID with the single name "McLovin," which surprisingly works at a liquor store. However, the store is robbed, and Fogell is taken by two irresponsible cops, Officers Slater and Michaels, who party with him instead of doing their jobs. Meanwhile, Seth and Evan\'s attempt to get alcohol leads to a series of misadventures, including a hit-and-run, a period blood incident, and a confrontation with aggressive partygoers. The friends eventually reunite at the party but realize their friendship is more important than getting laid. The film ends with Seth and Evan shopping with their crushes, acknowledging their bond while accepting their upcoming separation.',
        },
        {
          title: 'The Hangover',
          genre: 'Comedy',
          year: BigInt(2009),
          duration: BigInt(100),
          posterUrl: '/assets/generated/poster-comedy-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'Doug and his friends Phil, Stu, and future brother-in-law Alan travel to Las Vegas for a bachelor party. After a night of celebration on the hotel rooftop, Phil, Stu, and Alan wake up in their trashed suite with no memory of the previous night and no sign of Doug. They discover a tiger in the bathroom, a baby in the closet, and Stu is missing a tooth and married to a stripper named Jade. As they retrace their steps to find Doug, they encounter a naked Chinese gangster named Mr. Chow, who emerges from their car trunk, and discover they stole a police car. The trio learns that Alan unknowingly drugged them with roofies. They eventually find Doug on the hotel roof, where he\'d been stranded all along. They race back to Los Angeles, arriving just in time for the wedding, with photos revealing their wild night.',
        },
        {
          title: 'Anchorman',
          genre: 'Comedy',
          year: BigInt(2004),
          duration: BigInt(94),
          posterUrl: '/assets/generated/poster-comedy-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'In 1970s San Diego, Ron Burgundy is the top-rated news anchor, working alongside his news team: Brian Fantana, Champ Kind, and Brick Tamland. Their male-dominated world is disrupted when ambitious reporter Veronica Corningstone joins the station. Ron and Veronica begin a romance, but their relationship sours when she fills in for Ron and succeeds, threatening his ego. Ron\'s jealousy leads him to sabotage Veronica by changing her teleprompter to end with "Go fuck yourself, San Diego," which she reads on air, destroying her credibility. Their feud escalates until Ron\'s dog Baxter is punted off a bridge, causing Ron to miss a crucial broadcast. Veronica covers a breaking news story, becoming the lead anchor. Eventually, Ron saves Veronica from an angry bear at the zoo, they reconcile, and become co-anchors, pioneering the modern news format.',
        },
        {
          title: 'Step Brothers',
          genre: 'Comedy',
          year: BigInt(2008),
          duration: BigInt(98),
          posterUrl: '/assets/generated/poster-comedy-1.dim_300x450.png',
          backdropUrl: '/assets/generated/backdrop-1.dim_1280x720.png',
          recapScript: 'Brennan Huff and Dale Doback are two lazy, unemployed 40-year-olds still living with their single parents. When Brennan\'s mother Nancy and Dale\'s father Robert marry, the two man-children are forced to live together as stepbrothers. Initially hostile, they bond over shared interests and become best friends, much to their parents\' frustration. Their immaturity causes chaos, leading Robert to demand they find jobs and move out. The brothers\' attempts at employment fail spectacularly. When Robert and Nancy announce their divorce due to the stress, Brennan and Dale finally mature, with Brennan pursuing his dream of becoming a singer and Dale becoming a successful helicopter pilot. At Robert\'s birthday party, the brothers perform a musical number that reconciles their parents. The film ends with the family reunited and the brothers maintaining their friendship while living independently.',
        },
        {
          title: 'Bridesmaids',
          genre: 'Comedy',
          year: BigInt(2011),
          duration: BigInt(125),
          posterUrl: '/assets/generated/poster-comedy-1.dim_300x450.png',
          backdropUrl: '/assets/generated/hero-bg.dim_1920x1080.png',
          recapScript: 'Annie Walker\'s life is a mess: her bakery failed, her relationship is purely physical, and she\'s broke. When her best friend Lillian gets engaged, Annie is thrilled to be maid of honor, but her insecurities surface when she meets Helen, Lillian\'s wealthy, perfect new friend. Annie\'s attempts to prove herself lead to disasters, including a disastrous bridal shower in Vegas (after she has a panic attack on the plane) and food poisoning at a Brazilian steakhouse that ruins a dress fitting. Her rivalry with Helen escalates, and Annie\'s life spirals further when she loses her apartment and her friendship with Lillian. With encouragement from Officer Rhodes, a kind cop she\'s been dating, Annie gets her life together. When Lillian goes missing before the wedding, Annie and Helen team up to find her. Annie reconciles with Lillian, attends the wedding, and begins a real relationship with Rhodes.',
        },
      ];

      for (const movie of sampleMovies) {
        try {
          await addMovieMutation.mutateAsync(movie);
        } catch (error) {
          console.error('Error adding movie:', error);
        }
      }
    };

    seedSampleData();
  }, [allMovies.length, addMovieMutation]);

  // Get featured movie for hero
  const featuredMovie = allMovies.length > 0 ? allMovies[0] : null;

  // Categorize movies
  const actionMovies = allMovies.filter((m) => m.genre === 'Action');
  const dramaMovies = allMovies.filter((m) => m.genre === 'Drama');
  const comedyMovies = allMovies.filter((m) => m.genre === 'Comedy');
  const thrillerMovies = allMovies.filter((m) => m.genre === 'Thriller' || m.genre === 'Sci-Fi');
  const crimeMovies = allMovies.filter((m) => m.genre === 'Crime');

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <HeroSection movie={featuredMovie} />
      
      <div className="relative -mt-32 z-10 space-y-8 pb-16">
        <MovieRow title="Trending Recaps" movies={allMovies.slice(0, 10)} />
        <MovieRow title="Action Movies" movies={actionMovies} />
        <MovieRow title="Drama" movies={dramaMovies} />
        <MovieRow title="Thriller & Sci-Fi" movies={thrillerMovies} />
        <MovieRow title="Crime" movies={crimeMovies} />
        <MovieRow title="Comedy" movies={comedyMovies} />
      </div>

      {/* Footer */}
      <footer className="bg-netflix-black border-t border-netflix-gray-800 py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} RecapFlix. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'recapflix'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-netflix-red hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
