import React, { useEffect, useState } from 'react';
import { IProgressBar } from './type';
import './style.css'

const ProgressBar: React.FC<IProgressBar> = ({ value }) => {
    const [width, setWidth] = useState(0);
    const getColor = (value: number) => {
        if (value >= 8) return 'bg-green-500';
        else if (value >= 5) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    useEffect(() => {
        const percentage = Math.max(0, Math.min(100, (value / 10) * 100));
        setTimeout(() => setWidth(percentage), 100);
    }, [value]);

    return (
        <div className="w-full bg-gray-300 rounded-full h-6 relative overflow-hidden">
            <div
                className={`flex absolute inset-0 items-center justify-center h-6 rounded-full ${getColor(value)} progress-bar-fill`}
                style={{ width: `${width}%` }}
            >
                <span className="text-white font-medium">Rating: {width.toFixed(0)}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
