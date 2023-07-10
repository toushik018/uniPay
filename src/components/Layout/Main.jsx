import React from 'react';
import LeftNav from '../Home/LeftNav';
import { Outlet } from 'react-router-dom';


const Main = () => {
    return (
        <>
            <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-4 bg-white">
                <div className="w-full md:w-auto md:flex-none">
                    <LeftNav />
                </div>

                <div className="w-full mx-auto md:pl-44">
                    <Outlet />
                </div>
            </div>

        </>
    );
};

export default Main;
