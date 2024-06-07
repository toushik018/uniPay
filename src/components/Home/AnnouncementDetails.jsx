import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AnnouncementDetails = () => {
    const announcements = useLoaderData();

    console.log(announcements.title);

    return (
        <div className="py-8">
            <div className="container w-full max-w-7xl mx-auto px-4 py-8 md:pl-16 lg:pl-16">
                <h1 className="text-4xl font-bold text-orange-600 mb-8">Announcements from Department</h1>
                <div className="grid grid-cols-1 gap-8">
                    <div className="bg-white p-6 rounded-lg">
                        <img
                            src={announcements.imageUrl}
                            alt={announcements.title}
                            className="w-2/4 h-auto rounded-lg mb-4"
                            style={{ maxWidth: '100%' }}
                        />

                        <h2 className="text-2xl font-bold text-orange-600 mb-4">{announcements.title}</h2>
                        <p className="text-gray-800">{announcements.description}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnnouncementDetails;
