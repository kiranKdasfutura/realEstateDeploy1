import React from "react";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        Keralite RealEstate
      </h1>
      <p className="mb-4 text-slate-700">
        Discover your dream home in the enchanting landscapes of Kerala with our
        exclusive real estate project. Immerse yourself in the beauty of God's
        Own Country as we offer a diverse range of meticulously crafted houses
        for sale and rent. Our properties showcase modern amenities seamlessly
        blended with traditional charm. From cozy villas nestled in serene
        backwaters to contemporary apartments in bustling urban hubs, we cater
        to diverse preferences. Experience the epitome of luxurious living in
        Kerala, where every corner tells a story of comfort and elegance.
        Explore our listings and embark on a journey to find your perfect home
        in this tropical paradise.
      </p>
      <div className="flex flex-col  justify-center items-center  m-5 font-semibold  p-8 ">
        <h1>Kiran_K_das</h1>
        <img
          className="w-1/12 rounded-full"
          src="https://firebasestorage.googleapis.com/v0/b/mern-estate-17ea4.appspot.com/o/1706693414315kiranAdmin.jpg?alt=media&token=e732a080-f5e1-407d-850d-daef52539e94"
          alt=""
        />
        <span className="text-black-700">
          Admin/founder{" "}
          <a
            href="https://www.instagram.com/kiran_k_das/"
            target="_blank"
            className="text-blue-600"
          >
            contact
          </a>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center m-5">
        <h1>K_P_rahul</h1>
        <img
          className="w-1/12 rounded-full"
          src="https://firebasestorage.googleapis.com/v0/b/mern-estate-17ea4.appspot.com/o/1706693531983steveRoger.jpg?alt=media&token=673ad4d0-73f3-4a2b-ac9d-22f42794d9b6"
          alt=""
        />
        <span>co-founder</span>
      </div>
    </div>
  );
}
