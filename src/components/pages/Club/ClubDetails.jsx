import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ClubDetails = () => {
    const club = useLoaderData();

    // Replace '\n' with actual line breaks
    const formattedMembershipBenefits = club.membershipBenefits.replace(/\\n/g, '\n');
    const formattedContactInformation = club.contactInformation.replace(/\\n/g, '\n');

    return (
        <div className="bg-white container w-full max-w-7xl mx-auto px-4 py-8 md:pl-16 lg:pl-16 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-1">
                    <img
                        src={club.image}
                        alt={club.clubName}
                        className="rounded-lg w-full"
                    />
                </div>
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold text-orange-600 mb-4">{club.clubName}</h2>
                    <p className="text-gray-800">{club.clubDescription}</p>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-orange-600 mb-2">Club Leadership</h3>
                        <p><strong>President:</strong> {club.roleName}</p>
                        <p><strong>Vice President:</strong> {club.roleName2}</p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-orange-600 mb-2">Membership Benefits</h3>
                        <p>{formattedMembershipBenefits}</p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-orange-600 mb-2">Contact Information</h3>
                        <p>{formattedContactInformation}</p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-orange-600 mb-2">Pricing</h3>
                        <p><strong>Monthly Price:</strong> ${club.monthlyPrice}</p>
                        <p><strong>Yearly Price:</strong> ${club.yearlyPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubDetails;
