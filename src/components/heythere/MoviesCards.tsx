import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
  Poster: string;
  Title: string;
  Genre: string;
  Released: string;
  imdbRating: string;
}

const MoviesCards = () => {
  const [movieDetails, setMovieDetails] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch movie details from OMDB API for each product
    const apiKey = '99cd3565'; // Replace with your actual OMDB API key
    const movieTitles = ['The Blacklist', 'No Time to Die',  'The Matrix', 'The Godfather', 'Forrest Gump', 'Dune', 'Spider-Man: No Way Home', 'Gladiator', 'The Lord of the Rings: The Fellowship of the Ring', 'The Shawshank Redemption', 'The Dark Knight', 'Pulp Fiction', 'Fight Club', 'Inception', 'Interstellar', 'Avatar'];

    const fetchMovieDetails = async () => {
      const movieDetailsPromises = movieTitles.map(async (title) => {
        try {
          const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`);
          return response.data as Movie;
        } catch (error) {
          console.error(`Error fetching movie details for ${title}:`, error);
          return null;
        }
      });

      const movieDetailsData = await Promise.all(movieDetailsPromises);
      setMovieDetails(movieDetailsData.filter((data): data is Movie => data !== null));
    };

    fetchMovieDetails();
  }, []);

  return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Time Top Rated Movies</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {movieDetails.map((data, index) => (
          <div key={index} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={data.Poster}
                alt= {data.Genre}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href= {data.Title}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {data.Title}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500"> {data.Genre}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{data.imdbRating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default MoviesCards;
