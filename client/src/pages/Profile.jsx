import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { axiosInstance } from "../axios/requestMethods.js";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice.js";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  console.log(formData);

  //firebase storage
  //   allow read;
  // allow write:if
  // request.resource.size <2*1024*1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [file]);

  const handleFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    //image uploading with google firebase
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setFileUploadError(false); // Reset the error state
        });
      }
    );
  };
  //handle forms fields changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axiosInstance.post(
        `/user/update/${currentUser._id}`,
        formData
      );
      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess(true);
    } catch (error) {
      console.log("full error ", error);
      console.log("unique schema manual error  ", error.response.data);
      if (error.response.data.success === false) {
        dispatch(updateUserFailure(error.response.data.message));
        return;
      }
      dispatch(updateUserFailure(error.message));
      console.log(error);
    }
  };
  //delete User
const handleDelete = async () => {
  try {
    dispatch(deleteUserStart())
    const res = await axiosInstance.delete(`/user/delete/${currentUser._id}`);
    dispatch(deleteUserSuccess(res.data))
  } catch (error) {
     if (error.response.data.success === false) {
       dispatch(deleteUserFailure(error.response.data.message));
       return;
     }
     dispatch(deleteUserFailure(error.message));
     console.log(error);
  }
};


  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={formData.avatar || currentUser.avatar}
            className="h-24 w-24 self-center rounded-full object-cover cursor-pointer mt-2 "
            alt="profile photo"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload(image must be less than 2 mb){" "}
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            className="p-3 rounded-lg border "
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <input
            type="email"
            className="p-3 rounded-lg border "
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />

          <input
            type="password"
            className="p-3 rounded-lg border "
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading.." : "Update"}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer" onClick={handleDelete}>Delete accound</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>

        {error ? (
          <p className="text-red-400 font-semibold mt-5">{error} </p>
        ) : (
          ""
        )}
        {updateSuccess ? (
          <p className="text-green-700 font-semibold mt-5">
            Updated successfully
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Profile;
