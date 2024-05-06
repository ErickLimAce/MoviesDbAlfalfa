import React, { useEffect, useState } from "react";
import { IDetailsResponse, getDetailsMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Favorites = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [shows, setShows] = useState<IDetailsResponse[]>([]);
    const favorites: string | null = localStorage.getItem("favorites");

    const runGetFavorites = async () => {
        if(favorites && favorites.length) {
            const favoritesArray: number[] = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favoriteId: number) => {
                    try {
                        const res = await getDetailsMovies(favoriteId);
                        if(res && res.data) {
                            return res.data;
                        }
                    } catch(err) {
                        console.log(err, "err");
                    }
                    return null;
                })
            );
            setShows(newShows.filter(Boolean)); // Filter out null values
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorites();
    }, [favorites]); // Run when favorites change

    return (
        <div className="block-page min-h-screen pl-7">
            {!loading ? (
                <div className="text-white">
                    {favorites && favorites.length > 0 ? (
                        <div>
                            {shows && shows.length > 0 ? (
                                <div>
                                    {shows.map((movie: IDetailsResponse) => (
                                        <MovieCard
                                            key={movie.id}
                                            movieId={movie.id}
                                            posterPath={movie.poster_path}
                                            title={movie.title}
                                            voteAverage={movie.vote_average}
                                            genreId={movie.genres[0].id}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-xl">¡No hay películas favoritas!</div>
                            )}
                        </div>
                    ) : (
                        <div >No hay películas favoritas</div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Loading...</h2>
                </div>
            )}
        </div>
    );
};

export default Favorites;
