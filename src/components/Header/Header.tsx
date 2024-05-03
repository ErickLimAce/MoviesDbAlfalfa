import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const Header: React.FC = () => {
    const location = useLocation();
    return (
        
        <div className="fixed z-50 bg-red-700 border border-red-950 rounded-lg left-5 mt-2 ">
            <nav>
                <ul className="flex gap-4 py-2 justify-left mx-7  ">
                    <li className="transform transition duration-500 hover:scale-125">
                        <Link to={ROUTES.HOME}className={location.pathname === ROUTES.HOME ? "text-white" : ""}>Home</Link>
                    </li>
                    <li className="transform transition duration-500 hover:scale-125">
                        <Link to={ROUTES.POPULAR}className={location.pathname === ROUTES.POPULAR ? "text-white" : ""}>Popular</Link>
                    </li>
                    <li className="transform transition duration-500 hover:scale-125">
                        <Link to={ROUTES.TOPRATED}className={location.pathname === ROUTES.TOPRATED ? "text-white" : ""}>Top Rated</Link>
                    </li>
                    <li className="transform transition duration-500 hover:scale-125">
                        <Link to={ROUTES.UPCOMING}className={location.pathname === ROUTES.UPCOMING ? "text-white" : ""}>Upcoming</Link>
                    </li>
                    <li className="transform transition duration-500 hover:scale-125">
                        <Link to={ROUTES.FAVORITES}>My Favorites</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
