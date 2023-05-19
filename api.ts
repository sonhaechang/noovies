import { TMDB_API_KEY } from '@env';


const BASE_URL = 'https://api.themoviedb.org/3';

export const moviesApi = {
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
};