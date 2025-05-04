import React, { useContext, useEffect, useState } from 'react';
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
      image && formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-blue-100 shadow-xl rounded-xl mt-10 text-gray-700">
      <div className="flex flex-col items-center gap-4">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            {!image && (
              <img className="w-6 h-6 absolute bottom-2 right-2" src={assets.upload_icon} alt="Upload Icon" />
            )}
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <img className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover" src={userData.image} alt="Profile" />
        )}

        {isEdit ? (
          <input
            type="text"
            className="text-2xl font-semibold text-center bg-gray-100 rounded-md p-1 px-3 w-full max-w-sm"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <h1 className="text-2xl font-semibold">{userData.name}</h1>
        )}
      </div>

      <hr className="my-6 border-t border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">Contact Information</h2>
          <div className="space-y-3">
            <p><strong>Email:</strong> <span className="text-blue-600">{userData.email}</span></p>
            <p><strong>Phone:</strong> {isEdit ? (
              <input
                type="text"
                className="bg-gray-100 rounded px-2 py-1 w-full"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <span className="text-blue-600">{userData.phone}</span>
            )}</p>
            <p><strong>Address:</strong></p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="bg-gray-100 rounded px-2 py-1 mb-1 w-full"
                  value={userData.address.line1}
                  onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                />
                <input
                  type="text"
                  className="bg-gray-100 rounded px-2 py-1 w-full"
                  value={userData.address.line2}
                  onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                />
              </>
            ) : (
              <p className="text-gray-600">{userData.address.line1}<br />{userData.address.line2}</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">Basic Information</h2>
          <div className="space-y-3">
            <p><strong>Gender:</strong> {isEdit ? (
              <select
                className="bg-gray-100 rounded px-2 py-1"
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <span className="text-gray-600">{userData.gender}</span>
            )}</p>

            <p><strong>Birthday:</strong> {isEdit ? (
              <input
                type="date"
                className="bg-gray-100 rounded px-2 py-1"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <span className="text-gray-600">{userData.dob}</span>
            )}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;