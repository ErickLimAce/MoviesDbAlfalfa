import React, { useEffect, useRef } from "react";
import { IMovieResponse } from "../../services";
import { MovieCard } from "../MovieCard";

interface CarouselProps {
  movies: IMovieResponse[];
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const moviesWithDateConversion = movies.map((movie) => ({
    ...movie,
    release_date: new Date(movie.release_date),
  }));

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
        if (scrollLeft === scrollWidth - clientWidth) {
          // Reached end
        }
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="relative overflow-x-hidden ">
        <div className="flex overflow-x-auto" ref={containerRef}>
          {moviesWithDateConversion.map((movie) => (
            <div key={movie.id} className="w-60 flex-shrink-0 mr-10">
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
  );
};

export default Carousel;
