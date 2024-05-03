import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IDetailsResponse, getDetailsMovies } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";

const Show = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IDetailsResponse>();
    const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        getDetails();
    }, [])

    return (
        <div className=" mx-44 shadow-2xl rounded-3xl bg-blue-200 absolute top-1/2 transform -translate-y-1/2">
            <div className="p-8 ">
                <div>Show id: { id }</div>
                <div className="flex">
                    <div className=" min-w-[20%] min-h-[20%]">
                        <img className="rounded-3xl" src={IMAGE_SOURCE + movie?.poster_path} alt="poster"></img>
                    </div>
                    <div className="flex-col px-10">
                        <p className="font-bold text-3xl pb-4">{movie?.title}</p>
                        <p>{movie?.overview}</p>
                        <p>{movie?.release_date}</p>
                    </div>
                </div>
                <button onClick={goBack}> Ir atras </button>
            </div>
        </div>
    );
};

export default Show;