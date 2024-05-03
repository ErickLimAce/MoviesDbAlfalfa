import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";


const Header: React.FC = () => {
    return (
        <div className="fixed z-50 bg-red-500 border border-red-800 rounded-lg left-5">
            <nav>
                <ul className="flex gap-4 py-2 justify-left mx-7 ">
                    <li>
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.POPULAR}>Popular</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.TOPRATED}>Top Rated</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.UPCOMING}>Upcoming</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Header