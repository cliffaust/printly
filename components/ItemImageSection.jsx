import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function ItemImageSection({ color }) {
  const style = {
    color: {
      color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    },
  };

  const [image, setImage] = useState("/images/shirt.png");

  const showPopup = {
    show: {
      y: 10,
      opacity: 1,
    },

    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },

    hide: {
      y: 20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          variants={showPopup}
          animate="show"
          initial="hide"
          exit="exit"
        >
          <Image
            width={600}
            height={600}
            src={image}
            alt="Image of a sweater"
          />
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-4 mt-4">
        <div className="bg-white px-4 py-2 rounded-md shadow-md font-bold cursor-pointer">
          Front
        </div>
        <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md font-bold cursor-pointer">
          Back
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <div
          onClick={() => setImage("/images/shirt.png")}
          className={
            "px-2 py-1 rounded-md shadow-md bg-gray-200 cursor-pointer " +
            (image === "/images/shirt.png" ? "!bg-white" : "")
          }
        >
          <Image
            width={60}
            height={60}
            src="/images/shirt.png"
            alt="Image of a sweater"
            className="rounded-md"
          />
        </div>
        <div
          onClick={() => setImage("/images/sweater2.png")}
          className={
            "px-2 py-1 rounded-md shadow-md bg-gray-200 cursor-pointer " +
            (image === "/images/sweater2.png" ? "!bg-white" : "")
          }
        >
          <Image
            width={60}
            height={60}
            src="/images/sweater2.png"
            alt="Image of a sweater"
            className="rounded-md"
          />
        </div>
        <div
          onClick={() => setImage("/images/shirt3.png")}
          className={
            "px-2 py-1 rounded-md shadow-md bg-gray-200 cursor-pointer " +
            (image === "/images/shirt3.png" ? "!bg-white" : "")
          }
        >
          <Image
            width={60}
            height={60}
            src="/images/shirt3.png"
            alt="Image of a sweater"
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default ItemImageSection;
