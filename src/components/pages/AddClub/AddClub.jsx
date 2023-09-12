import React from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient, useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const addClub = async (data) => {
    const response = await fetch("http://localhost:5000/clubs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to add club");
    }

    return response.json();
};

const imageHostingToken = import.meta.env.VITE_image_hosating;




const AddClub = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();



    const queryClient = new QueryClient();
    const mutation = useMutation(addClub, {
        onSuccess: () => {
            queryClient.invalidateQueries("clubs");
        },
    });

    // console.log(imageHostingToken);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;



    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
            const imageResponse = await fetch(img_hosting_url, {
                method: "POST",
                body: formData,
            });

            if (!imageResponse.ok) {
                throw new Error("Failed to upload image");
            }

            const imageResult = await imageResponse.json();
            if (imageResult.success) {
                const imgURL = imageResult.data.display_url;
                const clubData = { ...data, image: imgURL };

                await mutation.mutateAsync(clubData);
                console.log("Club added successfully:", clubData);
                toast.success("Club added successfully");
            } else {
                throw new Error("Failed to get image URL");
            }
        } catch (error) {
            console.error("Error adding Club:", error);
        }
    };


    return (
        <div className="w-full lg:w-2/4 md:w-3/4 mt-16 mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">Add a Club</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='grid grid-cols-2 gap-2 items-center'>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="clubName"
                        >
                            Club Name
                        </label>
                        <input
                            type="text"
                            className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                            {...register('clubName', { required: true })}
                        />
                        {errors.clubName && (
                            <span className="text-red-500 text-sm mt-1">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Upload an Image
                        </label>
                        <div className="form-control w-full">
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="file-input file-input-bordered w-full"
                            />
                        </div>
                    </div>
                </div>


                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="clubDescription"
                    >
                        Club Description
                    </label>
                    <input
                        type="text"
                        className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                        {...register('clubDescription', { required: true })}
                    />
                    {errors.clubDescription && (
                        <span className="text-red-500 text-sm mt-1">
                            This field is required
                        </span>
                    )}
                </div>





                <div className='grid grid-cols-2 items-center gap-2'>
                    <div className="mb-4">
                        <label htmlFor="clubRole" className="block text-gray-700 text-sm font-bold mb-2">
                            Role 1
                        </label>
                        <select
                            id="clubRole"
                            {...register('clubRole', { required: true })}
                            className="form-select w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                        >
                            <option value="President">President</option>
                            <option value="Vice President">Vice President</option>
                            <option value="Treasurer">Treasurer</option>
                            {/* Add more role options here */}
                        </select>
                        {errors.clubRole && (
                            <span className="text-red-500 text-sm mt-1">
                                Role is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="roleName" className="block text-gray-700 text-sm font-bold mb-2">
                            Name 1
                        </label>
                        <input
                            type="text"
                            id="roleName"
                            {...register('roleName', { required: true })}
                            className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                            placeholder="Enter name"
                        />
                        {errors.roleName && (
                            <span className="text-red-500 text-sm mt-1">
                                Name is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="clubRole2" className="block text-gray-700 text-sm font-bold mb-2">
                            Role 2
                        </label>
                        <select
                            id="clubRole2"
                            {...register('clubRole2', { required: true })}
                            className="form-select w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                        >
                            <option value="President">President</option>
                            <option value="Vice President">Vice President</option>
                            <option value="Treasurer">Treasurer</option>
                            {/* Add more role options here */}
                        </select>
                        {errors.clubRole2 && (
                            <span className="text-red-500 text-sm mt-1">
                                Role is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="roleName2" className="block text-gray-700 text-sm font-bold mb-2">
                            Name 2
                        </label>
                        <input
                            type="text"
                            id="roleName2"
                            {...register('roleName2', { required: true })}
                            className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                            placeholder="Enter name"
                        />
                        {errors.roleName2 && (
                            <span className="text-red-500 text-sm mt-1">
                                Name is required
                            </span>
                        )}
                    </div>
                </div>



                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="membershipBenefits"
                    >
                        Membership Benefits
                    </label>
                    <textarea
                        className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                        rows="4"
                        {...register('membershipBenefits', { required: true })}
                    />
                    {errors.membershipBenefits && (
                        <span className="text-red-500 text-sm mt-1">
                            This field is required
                        </span>
                    )}
                </div>

                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="contactInformation"
                    >
                        Contact Information
                    </label>
                    <textarea
                        className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                        rows="4"
                        {...register('contactInformation', { required: true })}
                    />
                    {errors.contactInformation && (
                        <span className="text-red-500 text-sm mt-1">
                            This field is required
                        </span>
                    )}
                </div>





                <div className='grid grid-cols-2 gap-2 items-center'>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="monthlyPrice"
                        >
                            Monthly Price (in Taka)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                            {...register('monthlyPrice', { required: true })}
                        />
                        {errors.monthlyPrice && (
                            <span className="text-red-500 text-sm mt-1">
                                Monthly price is required
                            </span>
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="yearlyPrice"
                        >
                            Yearly Price (in Taka)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                            {...register('yearlyPrice', { required: true })}
                        />
                        {errors.yearlyPrice && (
                            <span className="text-red-500 text-sm mt-1">
                                Yearly price is required
                            </span>
                        )}
                    </div>
                </div>


                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {mutation.isLoading ? "Adding Club..." : "Add Club"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClub;




















// import React from 'react';
// import { useForm } from 'react-hook-form';

// const AddClub = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const onSubmit = async (data) => {
//         try {
//           const response = await fetch('http://localhost:5000/clubs', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           });

//           if (response.ok) {
//             // Club data posted
//             console.log('Club data posted successfully!');
//           } else {
//             console.error('Error posting club data to the database.');
//           }
//         } catch (error) {
//           console.error('Error posting club data:', error);
//         }
//     };

//     return (
//         <div className="w-full lg:w-2/4 md:w-3/4 mt-16 mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md">
//             <h1 className="text-3xl font-bold mb-6">Add a Club</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="mb-4">
//                     <label className="block text-lg font-semibold mb-2" htmlFor="name">
//                         Club Name
//                     </label>
//                     <input
//                         className="border border-gray-300 rounded-lg px-4 py-2 w-full"
//                         type="text"
//                         {...register('name', { required: true })}
//                     />
//                     {errors.name && (
//                         <p className="text-red-500 mt-1">Club name is required</p>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-lg font-semibold mb-2" htmlFor="fee">
//                         Fee
//                     </label>
//                     <input
//                         className="border border-gray-300 rounded-lg px-4 py-2 w-full"
//                         type="number"
//                         {...register('fee', { required: true })}
//                     />
//                     {errors.fee && (
//                         <p className="text-red-500 mt-1">Fee is required</p>
//                     )}
//                 </div>
//                 <button
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//                     type="submit"
//                 >
//                     Add Club
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddClub;
