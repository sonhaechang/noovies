import { QueryFunction } from '@tanstack/react-query';

import { TMDB_API_KEY } from '@env';


const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TV {
    name: string;
    original_name: string;
    origin_country: string[];
    vote_count: number;
    backdrop_path: string | null;
    vote_average: number;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    poster_path: string | null;
    first_air_date: string;
    popularity: number;
    media_type: string;
}

interface BaseResponse {
    page: number;
    total_result: number;
    total_pages: number;
}

export interface MovieResponse extends BaseResponse {
    results: Movie[]
}

export interface TVResponse extends BaseResponse {
    results: TV[];
}

interface Fetchers<T> {
    [key: string]: QueryFunction<T>;
}

export const moviesApi: Fetchers<MovieResponse> = {
    getTrending: () => 
        fetch(
            `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
        ).then(res => res.json()),

    getUpcommig: () =>
        fetch(
            `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`
        ).then(res => res.json()),

    getNowPlaying: () => 
        fetch(
            `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`
        ).then(res => res.json()),

    getSearch: ({ queryKey }: any) => {
        const [_, query] = queryKey;

        return fetch(
            `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR&query=${query}`
        ).then(res => res.json())
    },

    getDetail: ({ queryKey }: any) => {
        const [_, id] = queryKey;

        return fetch(
            `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,iamges`
        ).then(res => res.json())
    },
};

export const tvApi: Fetchers<TVResponse> = {
    getTrending: () => 
        fetch(
            `${BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&region=KR`
        ).then(res => res.json()),

    getAiringToday: () => 
        fetch(
            `${BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`
        ).then(res => res.json()),

    getTopRated: () => 
        fetch(
            `${BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`
        ).then(res => res.json()),

    getSearch: ({ queryKey }: any) => {
        const [_, query] = queryKey;

        return fetch(
            `${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR&query=${query}`
        ).then(res => res.json())
    },

    getDetail: ({ queryKey }: any) => {
        const [_, id] = queryKey;

        return fetch(
            `${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,iamges`
        ).then(res => res.json())
    },
}

