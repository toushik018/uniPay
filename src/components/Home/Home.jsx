import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import profileimg from '../../assets/profile.png'
const Home = () => {

    const { user } = useContext(AuthContext);

    console.log(user);

    return (
        <div className="bg-gray-200 py-20 rounded-2xl mt-10 w-4/5 mx-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center text-center">
                    <div className="md:w-1/2">
                        <h1 className="md:text-3xl text-4xl font-bold text-black mb-6">
                            Welcome back, {user?.displayName}
                        </h1>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src={UserActivation.photoURL}
                            alt="Profile Picture"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;