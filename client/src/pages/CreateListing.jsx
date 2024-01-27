import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl  mx-auto">
      <h1 className="font-semibold py-7 text-center text-3xl">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="p-3 rounded-lg border "
            placeholder="name"
            id="name"
            minLength="10"
            maxLength="62"
            required
          />
          <textarea
            type="text"
            className="p-3 rounded-lg border "
            placeholder="description"
            id="description"
            required
          />
          <input
            type="text"
            className="p-3 rounded-lg border "
            placeholder="address"
            id="address"
            required
          />
          <div className="flex gap-7 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sell" />
              <span>sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">(₹/month) </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">(₹/month) </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex pt-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            <input className="border p-3 border-gray-300 rounded w-full" type="file" id="images" accept='image/*'/>
            <button className="p-3 text-green-700 rounded border border-green-700 uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
        <button className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">Create listing</button>
        </div>
      </form>
    </main>
  );
};
export default CreateListing;
