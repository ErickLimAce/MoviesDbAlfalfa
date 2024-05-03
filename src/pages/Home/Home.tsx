import { MovieCard } from "../../components/MovieCard";
import { movies } from "../../constants/moviesMock";

const Home = () => {
    return (
        <div className='flex flex-row flex-wrap justify-center items-start m-2'>
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
    );
}

export default Home;