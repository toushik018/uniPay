import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addTour = async (data) => {
  const response = await fetch("https://unipay-server-toushik018.vercel.app/tours", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add tour");
  }

  return response.json();
};

const imageHostingToken = import.meta.env.VITE_image_hosating;

const AddTour = () => {
  const queryClient = new QueryClient();
  const mutation = useMutation(addTour, {
    onSuccess: () => {
      queryClient.invalidateQueries("tours");
    },
  });

  // console.log(imageHostingToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    const price = parseFloat(data.cost);

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
        const tourData = { ...data, cost: price, image: imgURL };

        await mutation.mutateAsync(tourData);
        console.log("Tour added successfully:", tourData);
        toast.success("Tour added successfully");
      } else {
        throw new Error("Failed to get image URL");
      }
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 lg:pl-16 md:pl-16">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">Add a Tour</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="destination"
            >
              Destination
            </label>
            <input
              type="text"
              className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("destination", { required: true })}
            />
            {errors.destination && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>



          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="overview"
            >
              Over View
            </label>
            <textarea
              type="text"
              className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("overview", { required: true })}
            />
            {errors.overview && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>


          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itinerary"
            >
              Itinerary
            </label>
            <textarea
              className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 h-24"
              {...register("itinerary", { required: true })}
            />
            {errors.itinerary && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          <div className="lg:flex justify-evenly gap-2 items-center">
            <div className="mb-6 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cost"
              >
                Cost
              </label>
              <input
                type="text"
                className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                {...register("cost", { required: true })}
              />
              {errors.cost && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="mb-6 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="registration"
              >
                Registration
              </label>
              <select
                className="form-select w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                {...register("registration", { required: true })}
              >
                <option value="">Select</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.registration && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="departureDate"
              >
                Departure Date
              </label>
              <input
                type="date"
                className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                {...register("departureDate", { required: true })}
              />
              {errors.departureDate && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              type="text"
              className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("duration", { required: true })}
            />
            {errors.duration && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="accommodation"
            >
              Accommodation
            </label>
            <input
              type="text"
              className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("accommodation", { required: true })}
            />
            {errors.accommodation && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="transportation"
            >
              Transportation
            </label>
            <select
              className="form-select w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("transportation", { required: true })}
            >
              <option value="">Select</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Boat">Boat</option>
            </select>
            {errors.transportation && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/*  list what is included in the tour package */}

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inclusions"
            >
              Inclusions
            </label>
            <textarea
              className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("inclusions", { required: true })}
            />
            {errors.inclusions && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* items or expenses that are not included in the tour package.  */}

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="exclusions"
            >
              Exclusions
            </label>
            <textarea
              className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("exclusions", { required: true })}
            />
            {errors.exclusions && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="groupSize"
            >
              Group Size
            </label>
            <input
              type="number"
              className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("groupSize", { required: true })}
            />
            {errors.groupSize && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tourGuides"
            >
              Tour Guides
            </label>
            <textarea
              className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("tourGuides", { required: true })}
            />
            {errors.tourGuides && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="healthSafety"
            >
              Health and Safety Measures
            </label>
            <textarea
              className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("healthSafety", { required: true })}
            />
            {errors.healthSafety && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="paymentCancellation"
            >
              Payment and Cancellation Policies
            </label>
            <textarea
              className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              {...register("paymentCancellation", { required: true })}
            />
            {errors.paymentCancellation && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* Upload image */}

          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Upload a Image</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {mutation.isLoading ? "Adding Tour..." : "Add Tour"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTour;