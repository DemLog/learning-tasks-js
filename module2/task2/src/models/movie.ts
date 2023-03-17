import {Genre} from "./genre";

export interface Movie {
    id?: number;
    title: string;
    year: number;
    genres: Genre[];
}