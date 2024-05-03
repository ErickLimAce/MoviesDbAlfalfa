import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";


const Header: React.FC = () => {
    const location = useLocation();
    return (
        <div className="fixed z-50 bg-red-500 border border-red-800 rounded-lg left-5">
            <nav>
                <ul className="flex gap-4 py-2 justify-left mx-7 ">
                    <li>
                        <Link to={ROUTES.HOME}className={location.pathname === ROUTES.HOME ? "text-white" : ""}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.POPULAR}className={location.pathname === ROUTES.POPULAR ? "text-white" : ""}>Popular</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.TOPRATED}className={location.pathname === ROUTES.TOPRATED ? "text-white" : ""}>Top Rated</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.UPCOMING}className={location.pathname === ROUTES.UPCOMING ? "text-white" : ""}>Upcoming</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Header