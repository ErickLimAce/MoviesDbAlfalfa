import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IDetailsResponse, IMovieResponse, getDetailsMovies, getRecommendations } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { MovieCard } from "../../components/MovieCard";
import { Carousel } from "../../components/Carousel";


const Show = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IDetailsResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<IMovieResponse[]>([]);

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

    const getRecommended = async () => {
        const movieId = id ? parseInt(id) : undefined;
        if (movieId) {
            await getRecommendations(movieId)
                .then((res) => {
                    if (res && res.data) {
                        console.log(res.data, "res");
                        setMovies(res.data.results);
                    }
                })
                .catch((err) => {
                    console.log(err, "err");
                });
            setLoading(false);
        }
    };

    useEffect(() => {
        const favs = localStorage.getItem('favorites') || "";
        setFavorites(favs);
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
        setLoading(true);
        getDetails();
        getRecommended();
    }, [id])

    // Este efecto se ejecutará cada vez que se actualice la lista de favoritos
    useEffect(() => {
        if (favorites.includes(String(id))) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [favorites, id]);

    interface RatingProps {
        voteAverage: number;
    }

    const Rating: React.FC<RatingProps> = ({ voteAverage }) => {
        const maxStars = 5;
        const rating = Math.round((voteAverage / 10) * maxStars);
        const stars = [];

        for (let i = 0; i < maxStars; i++) {
            if (i < rating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gold' }} />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gray' }} />);
            }
        }

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '8px' }}>
                    {stars}
                </div>
                <span style={{ marginLeft: '4px' }}>{voteAverage.toFixed(2)} / 10</span>
            </div>
        );

    };

    return (
        <div className="block-page">
            <div className="mx-44 shadow-2xl rounded-3xl bg-slate-700 pb-16">
                <div className="p-8">
                    <div className="bg-slate-600 border border-slate-700 w-fit px-1 rounded-lg mb-1">
                        ID: {id}
                    </div>
                    <div className="flex">
                        <div className="min-w-[20%] min-h-[20%]">
                            <img className="rounded-3xl" src={IMAGE_SOURCE + movie?.poster_path} alt="poster" />
                        </div>
                        <div className="flex flex-col min-h-full px-10">
                            <div className="flex-grow">
                                <p className="font-bold text-3xl pb-4">{movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})</p>
                                <p>{movie?.overview}</p>
                                <div>
                                    <p className="mr-[10px] text-[18px] font-semibold table uppercase leading-[20px] w-[100%] animate-[pulse_2s] mt-5">
                                        {movie?.vote_average !== undefined && <Rating voteAverage={movie.vote_average} />}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative ">
                        <button className="p-4 pl-12 bg-slate-500 rounded-3xl mt-5 mb-5 hover:bg-slate-600 animate-[pulse_2s] transform transition duration-500 hover:scale-105" onClick={goBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            Go Back
                        </button>
                    </div>
                    {isFavorite ? (
                        <div>
                            <button className="bg-red-700 flex items-center gap-2 rounded-xl p-1 hover:bg-red-900 animate-[pulse_2s] transform transition duration-500 hover:scale-105" onClick={removeFavorite}>
                                Remove Favorite
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                </svg>
                            </button>
                        </div>
                    ) :
                        (
                            <div>
                                <button className="bg-slate-500 flex items-center gap-2 rounded-xl p-1 hover:bg-green-900  text-white animate-[pulse_2s] transform transition duration-500 hover:scale-105 " onClick={addFavorite}>
                                    Add Favorite
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                                    </svg>
                                </button>
                            </div>
                        )}
                </div>
            </div>
            {/* Carousel se mueve aquí */}
            <div className="mx-44 bg-slate-950 p-10 mt-5">
                <h1 className="text-3xl justify-center font-bold pb-2 text-white">Recommended:</h1>
                <Carousel movies={movies} />
            </div>
        </div>
    );
};

export default Show;
