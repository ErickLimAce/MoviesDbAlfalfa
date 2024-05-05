import React, { useState } from "react";
import { IMovieResponse } from "../../services";
import { MovieCard } from "../MovieCard";

interface CarouselProps {
  movies: IMovieResponse[];
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + movies.length) % movies.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % movies.length);
  };

  // Convertir la propiedad release_date a tipo Date
  const moviesWithDateConversion = movies.map(movie => ({
    ...movie,
    release_date: new Date(movie.release_date)
  }));

  return (
    <div className="relative h-screen">
      <div className="overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="overflow-y-auto flex-grow">
            {moviesWithDateConversion.map((movie, index) => (
              <div
                key={movie.id}
                className={`transform transition-all duration-300 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                } ${index === currentIndex ? "scale-100" : "scale-75"} ${
                  index === currentIndex ? "z-10" : "z-0"
                }`}
              >
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
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
