import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";


const Header: React.FC = () => {
    return (
        <div>
            <nav>
                <ul className="flex gap-4 pb-4 justify-center">
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