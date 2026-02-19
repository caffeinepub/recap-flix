import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Movie = {
    title : Text;
    genre : Text;
    year : Nat;
    duration : Nat;
    posterUrl : Text;
    backdropUrl : Text;
    recapScript : Text;
  };

  let movies = Map.empty<Text, Movie>();
  let userLists = Map.empty<Principal, List.List<Text>>();

  public shared ({ caller }) func addMovie(
    title : Text,
    genre : Text,
    year : Nat,
    duration : Nat,
    posterUrl : Text,
    backdropUrl : Text,
    recapScript : Text,
  ) : async () {
    let newMovie : Movie = {
      title;
      genre;
      year;
      duration;
      posterUrl;
      backdropUrl;
      recapScript;
    };
    movies.add(title, newMovie);
  };

  public query ({ caller }) func getMovie(title : Text) : async Movie {
    switch (movies.get(title)) {
      case (null) {
        Runtime.trap("Movie not found");
      };
      case (?movie) { movie };
    };
  };

  public query ({ caller }) func getAllMovies() : async [Movie] {
    movies.values().toArray();
  };

  public query ({ caller }) func searchMovies(searchText : Text) : async [Movie] {
    movies.values().toArray().filter(
      func(movie) {
        movie.title.contains(#text searchText) or movie.genre.contains(#text searchText);
      }
    );
  };

  public shared ({ caller }) func addToList(movieTitle : Text) : async () {
    if (not movies.containsKey(movieTitle)) {
      Runtime.trap("Movie does not exist");
    };

    let currentList = switch (userLists.get(caller)) {
      case (null) { List.empty<Text>() };
      case (?list) { list };
    };

    currentList.add(movieTitle);
    userLists.add(caller, currentList);
  };

  public shared ({ caller }) func removeFromList(movieTitle : Text) : async () {
    let currentList = switch (userLists.get(caller)) {
      case (null) { List.empty<Text>() };
      case (?list) { list };
    };

    let filteredList = currentList.filter(
      func(title) {
        title != movieTitle;
      }
    );
    userLists.add(caller, filteredList);
  };

  public query ({ caller }) func getList() : async [Movie] {
    switch (userLists.get(caller)) {
      case (null) { [] };
      case (?list) {
        list.toArray().map(
          func(movieTitle) {
            switch (movies.get(movieTitle)) {
              case (null) { Runtime.unreachable() };
              case (?movie) { movie };
            };
          }
        );
      };
    };
  };

  system func preupgrade() {
    let sampleMovies : [Movie] = [
      {
        title = "Inception";
        genre = "Sci-Fi";
        year = 2010;
        duration = 148;
        posterUrl = "https://example.com/inception_poster.jpg";
        backdropUrl = "https://example.com/inception_backdrop.jpg";
        recapScript = "At the start of the movie...";
      },
      {
        title = "The Godfather";
        genre = "Crime";
        year = 1972;
        duration = 175;
        posterUrl = "https://example.com/godfather_poster.jpg";
        backdropUrl = "https://example.com/godfather_backdrop.jpg";
        recapScript = "The story follows the Corleone family...";
      },
    ];

    for (movie in sampleMovies.values()) {
      movies.add(movie.title, movie);
    };
  };
};
