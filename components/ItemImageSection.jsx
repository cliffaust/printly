import React from "react";
import Image from "next/image";

function ItemImageSection() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <Image
          width={500}
          height={500}
          src="/images/sweater2.png"
          alt="Image of a sweater"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <div className="bg-white px-4 py-2 rounded-md shadow-md font-bold cursor-pointer">
          Front
        </div>
        <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md font-bold cursor-pointer">
          Back
        </div>
      </div>
    </div>
  );
}

export default ItemImageSection;
