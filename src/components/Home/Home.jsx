import React from 'react';
const Home = () => {
    return (
        <div className="bg-gray-200 py-20 rounded-2xl mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center text-center">
                    <div className="md:w-1/2">
                        <h1 className="md:text-3xl text-4xl font-bold text-black mb-6">
                            Welcome back, User
                        </h1>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src="path_to_your_animation_image.gif"
                            alt="Animation Image"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;