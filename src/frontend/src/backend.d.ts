import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Movie {
    title: string;
    duration: bigint;
    recapScript: string;
    year: bigint;
    genre: string;
    posterUrl: string;
    backdropUrl: string;
}
export interface backendInterface {
    addMovie(title: string, genre: string, year: bigint, duration: bigint, posterUrl: string, backdropUrl: string, recapScript: string): Promise<void>;
    addToList(movieTitle: string): Promise<void>;
    getList(): Promise<Array<Movie>>;
    getMovie(title: string): Promise<Movie>;
    removeFromList(movieTitle: string): Promise<void>;
    searchMovies(searchText: string): Promise<Array<Movie>>;
    seedData(): Promise<void>;
}
