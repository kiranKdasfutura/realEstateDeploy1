import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4">
          <img
            src={currentUser.avatar}
            className="h-24 w-24 self-center rounded-full object-cover cursor-pointer mt-2 "
            alt=""
          />
          <input
            type="text"
            className="p-3 rounded-lg border "
            placeholder="username"
            id="username"
          />
          <input
            type="email"
            className="p-3 rounded-lg border "
            placeholder="email"
            id="email"
          />
          <input
            type="password"
            className="p-3 rounded-lg border "
            placeholder="password"
            id="password"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            update
          </button>
        </form>
        <div className='flex justify-between mt-5'>
          <span className="text-red-700 cursor-pointer">Delete accound</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </div>
    </>
  );
}

export default Profile