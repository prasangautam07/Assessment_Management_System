import React from "react";

export const Profile = () => {
  return (
    <div className=" flex  justify-evenly gap-4 mt-10">
      <div className="flex flex-col gap-20  w-1/2 p-3">
        <div className=" bg-white p-4 border-t-3 border-primary card-shadow flex flex-col items-start">
          <h1 className="font-normal text-[24px] text-[#787777]">
            Personal Information
          </h1>
          <hr className="my-4 w-full border-t-2 border-gray-300" />
          <div className=" flex flex-col text-[#888888] items-start font-semibold text-[15px] mb-4">
            <p>Full Name: PRASAN GAUTAM</p>
            <p>Contact : 9821593427 / 9821593427</p>
            <p>Gender : M</p>
            <p>Date Of Birth : 2060-05-18 / 2003-09-04(AD)</p>
            <p>Ethnicity : || Category : Regular</p>
          </div>
        </div>
        
      </div>
      <div className="flex flex-col gap-13 w-1/2">
        <div className='flex items-center justify-evenly p-4 w-full gap-5'>
          <div className="flex flex-col items-center bg-white card-shadow p-4 border-t-3 border-primary w-1/2">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
              className="w-39 h-39 rounded-full border-2 border-gray-300"
            />
            <input type="file" accept='image/*' className='border-2 w-70 border-dotted items-center' />
            <p>Choose Photo to update</p>
          </div>
        </div>
      </div>
    </div>
  );
};

