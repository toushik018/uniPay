import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { FcAddImage } from "react-icons/fc";
import { BiSave } from "react-icons/bi";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const imageHostingToken = import.meta.env.VITE_image_hosating;

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [userDataFromAPI, setUserDataFromAPI] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editedFields, setEditedFields] = useState({
    name: "",
    contactNumber: "",
  });

  const [userId, setUserId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (user && user.email) {
      fetch("http://localhost:5000/users")
        .then((response) => response.json())
        .then((data) => {
          const filteredUserData = data.find(
            (item) => item.email === user.email
          );
          if (filteredUserData) {
            setUserDataFromAPI(filteredUserData);
            setEditedFields({
              name: filteredUserData?.name || "",
              contactNumber: filteredUserData?.phone || "",
            });
            // Extract and set the userId here
            const userId = filteredUserData._id;
            setUserId(userId);
          } else {
            console.error("User not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset the editedFields with the current values from userDataFromAPI
    setEditedFields({
      name: userDataFromAPI?.name || "",
      contactNumber: userDataFromAPI?.contactNumber || "",
    });
  };


  const handleSaveEdit = () => {
    // Extract the user's id from userDataFromAPI
    const userId = userDataFromAPI._id;
    // Extract the user's email from userDataFromAPI
    const email = userDataFromAPI.email;

    // Create a new object with the updated fields including email and image URL
    const updatedUserData = {
      _id: userId,
      name: editedFields.name,
      phone: editedFields.contactNumber,
      email: email, // Use the user's email
      photoURL: userDataFromAPI.photoURL, // Include the existing image URL
    };

    // Check if a new image has been selected
    if (selectedImage) {
      // Update the photoURL with the ImageBB URL
      updatedUserData.photoURL = selectedImage; // Use the selectedImage URL as the new image
    }

    console.log(updatedUserData);

    fetch(`http://localhost:5000/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData), // Send the updatedUserData object
      }
    )
      .then((response) => response.json())
      .then((updatedUserData) => {
        // Update the user data with the updated name, phone, and image URL
        setUserDataFromAPI(updatedUserData);
        setIsEditing(false);
        Swal.fire({
          icon: 'success',
          title: 'Your changes have been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      })

      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Start the uploading state
      const formData = new FormData();
      formData.append("image", file);

      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((imageResult) => {
          if (imageResult.success) {
            const imgURL = imageResult.data.display_url;
            setSelectedImage(imgURL); // Set the selectedImage to the ImageBB URL

            const updatedUserData = {
              ...userDataFromAPI,
              photoURL: imgURL,
            };

            // Update the user data with the new profile image URL
            setUserDataFromAPI(updatedUserData);

            // You can optionally send this updated image URL to your server to update the database.
          } else {
            throw new Error("Failed to get image URL");
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        })
        .finally(() => {
          setIsUploading(false); // Finish the uploading state
        });
    }
  };

  if (!userDataFromAPI) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (

    <div className="lg:w-3/5 w-full mx-auto p-4 md:pl-16 lg:pl-0">
      <div className="mb-4 w-full p-4 flex-none lg:flex items-center mt-10 mx-auto lg:mx-0">
        <img
          src={selectedImage || userDataFromAPI.photoURL || 'default-profile-picture-url.jpg'}
          alt="Profile Picture"
          className="w-40 h-40 rounded-full object-cover mr-0 lg:mr-10 md:mr-10 hover:scale-105 duration-500 mb-2 right-2 ring-2 ring-green-700"
        />

        {isUploading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
        ) : selectedImage ? (
          <button
            type="button"
            onClick={handleSaveEdit}
            className="flex items-center text-green-700 cursor-pointer bg-orange-500 hover:bg-orange-600 duration-300 rounded-lg p-2"
          >
            <BiSave className="text-2xl" />
            <span className="text-xl ml-2 text-white">Save Photo</span>
          </button>
        ) : (
          <label className="flex items-center cursor-pointer text-white bg-orange-500 hover:bg-orange-600 duration-300 rounded-lg p-2 md:w-40 w-40 lg:w-48">
            <FcAddImage className="text-4xl mr-2" />
            <span className="lg:text-lg md:text-base">Upload Photo</span>
            <input
              type="file"
              {...register('image', { required: true })}
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      <div className="shadow-lg rounded-xl bg-orange-100 p-4 w-full">
        <div className="mb-4">
          <p className="text-lg font-semibold">Your ID</p>
          {userDataFromAPI.role === 'teacher' ? (
            <p className="font-semibold text-2xl font-JosefinSans">
              {userDataFromAPI.teacherId}
            </p>
          ) : (
            <p className="font-semibold text-2xl font-JosefinSans">
              {userDataFromAPI.id}
            </p>
          )}
        </div>
        {userDataFromAPI.role !== 'teacher' && (
          <div className="mb-4">
            <p className="text-lg font-semibold">Your Batch</p>
            <p className="font-semibold text-2xl font-JosefinSans">
              {userDataFromAPI.batch}
            </p>
          </div>
        )}

        <div className="mb-4">
          <p className="text-lg font-semibold">Full Name</p>
          {isEditing ? (
            <input
              className="border rounded-md px-2 py-2 w-full"
              type="text"
              value={editedFields.name}
              onChange={(e) =>
                setEditedFields({ ...editedFields, name: e.target.value })
              }
            />
          ) : (
            <p className="font-semibold text-2xl font-JosefinSans">{userDataFromAPI.name}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">Contact Number</p>
          {isEditing ? (
            <input
              className="border rounded-md px-2 py-2 w-full"
              type="text"
              value={editedFields.contactNumber}
              onChange={(e) =>
                setEditedFields({ ...editedFields, contactNumber: e.target.value })
              }
            />
          ) : (
            <p className="font-semibold text-2xl font-JosefinSans">{userDataFromAPI.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">Email Address</p>
          <div className={`w-full ${isEditing ? 'bg-gray-100' : ''}`}>
            {isEditing ? (
              <p className="ml-2 text-gray-400 border rounded-md px-2 py-1">
                {userDataFromAPI.email}{' '}
                <span className="text-red-300 text-sm">Not editable</span>
              </p>
            ) : (
              <p className="font-semibold text-2xl font-JosefinSans">{userDataFromAPI.email}</p>
            )}
          </div>
        </div>
        <div className="relative mt-4 text-right bottom-0 right-0">
          {isEditing ? (
            <div className="flex justify-end text-lg">
              <button
                className="flex items-center text-red-500 hover:text-red-700 transition duration-300"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                className="text-green-500 hover:text-green-700 ml-2 transition duration-300"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              className="absolute bottom-0 right-0 flex items-center text-xl font-bold font-Lexend text-orange-500 hover:text-orange-700 transition duration-300 mt-2"
              onClick={handleEditClick}
            >
              <FiEdit className="font-extrabold" /> Edit
            </button>
          )}
        </div>



      </div>
    </div>


  );
};

export default MyProfile;
