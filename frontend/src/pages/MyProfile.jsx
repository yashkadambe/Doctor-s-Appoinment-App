import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md space-y-6">
      {/* Profile Image and Name */}
      <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
        <label htmlFor="image" className="relative group cursor-pointer">
          <img
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border shadow-md group-hover:opacity-80 transition"
          />
          {isEdit && (
            <>
              <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow">
                <img src={assets.upload_icon} alt="Upload" className="w-5 h-5" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </>
          )}
        </label>
        <div className="mt-4 text-center">
          {isEdit ? (
            <input
              className="text-xl font-semibold text-center border-b focus:outline-none"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <p className="text-xl font-semibold">{userData.name}</p>
          )}
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-bold border-b pb-2">Contact Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Phone:</label>
            {isEdit ? (
              <input
                type="text"
                className="w-full border p-2 rounded bg-gray-50"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Address:</label>
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="w-full border p-2 rounded bg-gray-50 mb-2"
                  value={userData.address.line1}
                  onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                />
                <input
                  type="text"
                  className="w-full border p-2 rounded bg-gray-50"
                  value={userData.address.line2}
                  onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                />
              </>
            ) : (
              <p>{userData.address.line1}, {userData.address.line2}</p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-bold border-b pb-2">Basic Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Gender:</label>
            {isEdit ? (
              <select
                className="w-full border p-2 rounded bg-gray-50"
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Date of Birth:</label>
            {isEdit ? (
              <input
                type="date"
                className="w-full border p-2 rounded bg-gray-50"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="text-center mt-4">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
          >
            Save Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
