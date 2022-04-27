export interface IGenre {
    name: string;
}

export interface IMovie {
    id: string;
    name: string;
    genres: IGenre[];
    score: number;
    overview: string;
    socialMedia: {
        imdb: string | null;
    };
    img: {
        url: string;
    } | null;
}
