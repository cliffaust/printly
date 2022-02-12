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
          viewBox="0 0 301.86771 300.40253"
        >
          <defs id="defs2" />
          <g
            id="layer1"
            fill="currentColor"
            transform="translate(53.583506,-19.926364)"
          >
            <path
              // style="fill:#000000;stroke:none;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
              d="m -53.583506,123.03275 4.144351,-3.85131 4.646695,-4.81415 3.60014,-4.06062 2.888485,-3.30711 3.600144,-3.80945 4.144348,-5.274627 5.818834,-6.363042 4.981592,-5.274627 6.15373,-7.158421 6.8235247,-8.539871 7.786353,-10.632975 2.595451,-3.223384 5.7769717,-6.404904 3.7675906,-3.60014 6.614213,-4.688557 5.902558,-3.516418 6.404903,-3.390831 10.381805,-4.269936 9.209664,-4.144349 7.577042,-3.097796 5.860696,-2.428003 1.542197,-1.034028 0.969532,-0.221837 1.925656,0.20931 3.13966,0.920967 5.1909,1.004691 5.065315,0.669794 8.581734,0.627931 8.204975,0.293035 7.702626,-0.418621 12.89353,-2.051244 5.40021,-1.046553 1.63263,0.962829 4.35366,2.428003 12.14001,6.739801 18.79609,8.16311 12.51677,5.735111 5.90256,5.358349 6.57235,6.279317 9.67015,10.298081 8.83291,9.753872 9.08407,10.088769 11.3865,13.647049 21.68457,23.610235 -3.68386,2.97221 -10.21436,7.53518 -24.90796,21.09851 -14.10753,12.85166 -11.09346,-7.32587 -7.53518,-4.47924 -1.17833,-0.37542 0.38295,9.08274 0.3349,20.59616 0.71165,29.51279 0.96283,34.70369 -0.0837,37.29914 -0.12559,31.68962 -0.16745,1.96752 -8.12125,-0.79539 -5.65138,-0.54419 -7.4096,-0.75353 -18.79609,-0.96282 -7.66076,-0.1256 -8.95849,-0.12557 -9.29339,-0.0837 H 92.180374 l -16.954155,0.29305 -21.977612,0.50234 -12.809805,1.17213 -13.228428,0.8791 -3.432694,-0.0419 -1.80007,-0.58606 -0.795381,-2.05126 -0.125586,-14.31684 0.418621,-22.39624 0.125586,-15.02849 0.125587,-20.17753 0.502345,-17.62395 0.627932,-18.16816 0.79538,-21.47526 0.334897,-18.92168 -0.376759,-13.73077 -2.930348,1.13027 -6.070007,3.22339 -10.4655279,5.94442 -2.8466236,2.0931 -1.9256572,-0.0419 -1.7163466,-0.79538 -0.7953802,-0.71166 -9.6701485,-8.16311 -11.88884,-9.75387 -14.861051,-12.09815 -13.730771,-11.88884 z"
              id="path87"
            />
          </g>
        </svg>

        <Image
          className="shirt"
          src="/images/image17.png"
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
