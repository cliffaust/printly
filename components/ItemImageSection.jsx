import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { lightOrDark } from "../lib/utils";

function ItemImageSection({
  color,
  showClothingOptions,
  changeClothingOptions,
}) {
  const style = {
    color: {
      color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    },
  };

  const [image, setImage] = useState("/images/shirt.png");

  const [colorState, setColorState] = useState("");

  useEffect(() => {
    setColorState(
      lightOrDark(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)
    );
  }, [color, colorState]);

  const showClothingOptionsPopup = {
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

  const showPopup = {
    show: {
      y: 5,
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
      {/* {image === "/images/shirt.png" ? (
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
      ) : (
        ""
      )}
      {image === "/images/sweater2.png" ? (
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
      ) : (
        ""
      )}
      {image === "/images/shirt3.png" ? (
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
      ) : (
        ""
      )} */}
      <div className="container-product-image">
        <svg
          style={style.color}
          className="product-svg"
          viewBox="0 0 1205.000000 1121.000000"
        >
          <g
            transform="translate(0.000000,1121.000000) scale(0.100000,-0.100000)"
            fill="currentColor"
            stroke="none"
          >
            <path
              d="M4890 9741 c-56 -33 -592 -247 -715 -286 -82 -26 -238 -82 -345 -125
-107 -43 -256 -101 -330 -130 -74 -28 -178 -76 -231 -106 -90 -50 -105 -64
-217 -191 -66 -76 -194 -239 -283 -363 -314 -436 -566 -759 -892 -1143 l-329
-389 24 -25 c42 -46 280 -217 608 -438 387 -261 491 -337 630 -465 157 -144
345 -307 370 -320 35 -19 83 33 377 399 1 2 5 2 8 0 13 -14 22 -791 15 -1309
-5 -322 -14 -1208 -21 -1968 -10 -1193 -9 -1386 3 -1398 12 -12 91 -13 558 -3
300 5 766 14 1035 18 689 10 2695 3 3089 -12 l329 -12 -7 445 c-9 574 -21
1036 -36 1325 -26 533 -36 1308 -26 2083 5 419 12 762 16 762 20 0 72 -76 101
-149 40 -102 124 -225 157 -229 17 -3 81 40 240 160 119 90 408 297 642 461
234 164 508 357 610 429 102 72 194 136 204 144 18 12 6 31 -185 286 -112 150
-237 314 -279 363 -79 93 -247 320 -410 555 -52 74 -155 218 -230 320 -75 102
-156 214 -180 250 -71 106 -243 321 -301 375 -129 121 -271 178 -846 341 -575
162 -636 182 -861 291 -152 72 -160 73 -209 30 -46 -42 -127 -80 -241 -113
-430 -127 -723 -135 -1244 -35 -256 50 -362 81 -460 137 -76 44 -109 52 -138
35z"
            />
          </g>
        </svg>

        <Image
          className="shirt"
          src="/images/img2.png"
          alt=""
          layout="fill"
          priority
        ></Image>
      </div>
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
      <div className="relative">
        <div
          onClick={() => changeClothingOptions()}
          className="flex gap-4 items-center mt-8 bg-white rounded-md px-6 py-3 cursor-pointer"
        >
          <div className="font-bold">T-Shirt</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <AnimatePresence exitBeforeEnter>
          {showClothingOptions ? (
            <motion.div
              variants={showClothingOptionsPopup}
              animate="show"
              initial="hide"
              exit="exit"
              className="bg-white z-10 shadow-lg rounded-lg w-48 overflow-hidden absolute"
            >
              <div className="option-select">Hoodie</div>
              <div className="option-select">Sweater</div>
              <div className="option-select">Polo Shirt</div>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ItemImageSection;
