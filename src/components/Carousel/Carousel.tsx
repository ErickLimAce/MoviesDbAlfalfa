import React, { useEffect, useState } from "react";
import { IMovieResponse } from "../../services";
import { MovieCard } from "../MovieCard";

interface CarouselProps {
  movies: IMovieResponse[];
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);

  useEffect(() => {
    setIsEndReached(currentIndex === movies.length - 1);
  }, [currentIndex, movies.length]);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + movies.length) % movies.length);
    setIsEndReached(false);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % movies.length);
    setIsEndReached(currentIndex === movies.length - 2);
  };

  const moviesWithDateConversion = movies.map((movie) => ({
    ...movie,
    release_date: new Date(movie.release_date),
  }));

  const isFirstMovie = currentIndex === 0;
  const isLastMovie = currentIndex === movies.length - 1;
  

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen-xl relative overflow-hidden">
        
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 17.4}%)`,
          }}
        >
          {moviesWithDateConversion.map((movie, index) => (
            <div key={movie.id} className="w-full">
              <MovieCard
                movieId={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                voteAverage={movie.vote_average}
                genreId={movie.genre_ids[0]}
              />
            </div>
          ))}
        </div>
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full ${isFirstMovie ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrev}
          disabled={isFirstMovie}
        >
          Prev
        </button>
        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full ${isLastMovie ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNext}
          disabled={isLastMovie}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
