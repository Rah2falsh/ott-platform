const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = {


  async getTrendingMovies() {
    try {
      const res = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
      const response = await fetch(res);

      if (!response.ok) {
        throw new Error('Failed to fetch trending movies');
      }

      const data = await response.json();
      const movies = data.results || [];


      const moviesWithDetails = await Promise.all(
        movies.map(async (movie: any) => {
          try {
            const detailsResponse = await fetch(
              `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
            );

            if (!detailsResponse.ok) {
              return movie;
            }

            const details = await detailsResponse.json();

            return {
              ...movie,
              runtime: details.runtime,
            };
          } catch (error) {
            console.error(
              `Error fetching details for movie ${movie.id}:`,
              error
            );

            return movie;
          }
        })
      );

      return moviesWithDetails;

    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  },


  async getNewReleases() {
    try {
      const res = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
      const response = await fetch(res);

      if (!response.ok) {
        throw new Error('Failed to fetch new releases');
      }

      const data = await response.json();

      return data.results || [];

    } catch (error) {
      console.error('Error fetching new releases:', error);
      return [];
    }
  },


  async getGenres() {
    try {
      const res = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
      const response = await fetch(res);

      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }

      const data = await response.json();

      return data.genres || [];

    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  },


  async getMoviesByGenre(genreId: number | string) {
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movies by genre');
      }

      const data = await response.json();

      return data.results || [];

    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return [];
    }
  },

    async getMustWatchMovies() {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch must-watch movies');
        }
  
        const data = await response.json();
        const movies = (data.results || []).slice(0, 10);
  

        const moviesWithDetails = await Promise.all(
          movies.map(async (movie: any) => {
            try {
              const detailsResponse = await fetch(
                `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
              );
  
              if (!detailsResponse.ok) {
                return movie;
              }
  
              const details = await detailsResponse.json();
  
              return {
                ...movie,
                runtime: details.runtime,
              };
            } catch (error) {
              console.error(
                `Error fetching details for movie ${movie.id}:`,
                error
              );
  
              return movie;
            }
          })
        );
  
        return moviesWithDetails;
  
      } catch (error) {
        console.error('Error fetching must-watch movies:', error);
        return [];
      }
    },
};