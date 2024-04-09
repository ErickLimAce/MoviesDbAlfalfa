import { IMovieCard } from "./types";
import { Pill } from "../Pill";
import { IMAGE_SOURCE } from "../constants/moviesMock";

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath
}) => {
    const poster = IMAGE_SOURCE + posterPath;

    const getGenre = (genreId: number): string => {
        return "genero";
    }

    return (
        <div className="show-box">
            <div>
                <img src={poster} alt="poster"></img>
            </div>
            <div>
                <div>
                    <Pill title={getGenre(genreId)} color="red"></Pill>
                </div>
                <div>
                    <p>{title}</p>
                    <p>* {voteAverage} / 10</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;