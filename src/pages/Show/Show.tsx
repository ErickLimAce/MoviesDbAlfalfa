import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IDetailsResponse, getDetailsMovies } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { ProgressBar } from "../../components/ProgressBar";

const Show = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IDetailsResponse>();
    const [loading, setLoading] = useState<boolean>(false);

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id]
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const goBack = () => {
        navigate(-1);
    }

    const getDetails = async () => {
        const movieId = id ? parseInt(id) : undefined;
        if (movieId) {
            await getDetailsMovies(movieId)
                .then((res) => {
                    if (res && res.data) {
                        console.log(res.data, "res");
                        setMovie(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err, "err")
                });
            setLoading(false);
        }

    }

    useEffect(() => {
        const favs = localStorage.getItem('favorites') || "";
        setFavorites(favs);
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        }
        setLoading(true);
        getDetails();
    }, [])

    return (
        <div className="my-4 mx-44 shadow-2xl rounded-3xl bg-blue-100">
            <div className="p-8">
                <div className="flex">
                    <div className=" min-w-[20%] min-h-[20%]">
                        <img className="rounded-3xl" src={IMAGE_SOURCE + movie?.poster_path} alt="poster"></img>
                        <div className="flex mt-2 space-x-2">
                            <button className="bg-blue-950 text-white rounded-3xl px-4 py-2 flex-1 text-center" onClick={goBack}>
                                Ir atras
                            </button>
                            {isFavorite ? (
                                <button className="bg-yellow-300 text-black rounded-3xl px-4 py-2 flex-1 text-center hover:bg-blue-950 hover:text-white" onClick={removeFavorite}>
                                    Remove Favorite
                                </button>
                            ) : (
                                <button className="bg-blue-950 text-white rounded-3xl px-4 py-2 flex-1 text-center hover:bg-yellow-300 hover:text-black" onClick={addFavorite}>
                                    Add Favorite
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col min-h-full px-10">
                        <div className="flex-grow">
                            <p className="font-bold text-3xl pb-4">{movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})</p>
                            <p>{movie?.overview}</p>
                        </div>
                        <div>
                            <ProgressBar value={movie?.vote_average ?? 0}></ProgressBar>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Show;
