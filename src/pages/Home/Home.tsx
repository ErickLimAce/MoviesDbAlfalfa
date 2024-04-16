import { MovieCard } from "../../components/MovieCard";
import { movies } from "../../constants/moviesMock";

const Home = () => {
    return (
        <div className='block pl-7'>
            <div className='table max-w-[100%]'>
                {movies.map((movie, index) => (
                    <MovieCard
                        key={movie.id}
                        movieId={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        voteAverage={movie.vote_average}
                        genreId={movie.genre_ids[0]}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;