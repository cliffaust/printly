import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fabric } from "fabric";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

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

  const nodeRef = React.useRef(null);

  const [image, setImage] = useState("/images/shirt.png");

  const [files, setFiles] = useState([]);

  const [colorState, setColorState] = useState("");

  const [isColorBlack, setIsColorBlack] = useState(false);

  const [state, setState] = useState({
    height: 60,
    width: 128,
  });

  let showControls = {
    tl: false,
    tr: true,
    bl: true,
    br: true,
    ml: true,
    mt: true,
    mr: true,
    mb: true,
    mtr: true,
  };

  var deleteIcon =
    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='red'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' /%3e%3c/svg%3e";
  if (process.browser) {
    var img = document.createElement("img");
    img.src = deleteIcon;
  }

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: -0.54,
    y: -0.54,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24,
  });

  function deleteObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const { getRootProps, getInputProps } = useDropzone({
    accepts: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        files.concat(
          acceptedFiles.map((file, index) =>
            Object.assign(file, {
              id: index,
              preview: URL.createObjectURL(file),
              completedPercent: 0,
            })
          )
        )
      );
    },
  });

  const [canvas, setCanvas] = useState("");

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 600,
      preserveObjectStacking: false,
      // backgroundColor: "pink",
    });
  const onResize = (event, { element, size, handle }) => {
    event.stopPropagation();
    setState({ ...state, width: size.width, height: size.height });
  };

  const addRect = (canvi, imageUrl = null) => {
    // const rect = new fabric.Rect({
    //   height: 280,
    //   width: 200,
    //   fill: "yellow",
    // });

    var text = new fabric.Text("Angle: 0.00°", {
      top: -10,
      left: 100,
      fontSize: 16,
      fill: "#FFFFFF",
      backgroundColor: "#112244",
    });

    const updateAngleText = (obj, text) => {
      var rotHandlePos = obj.oCoords.mt;
      var angle = (obj.angle % 360).toFixed(1);
      text.text = angle + "°";
      text.top = rotHandlePos.y - 70;
      text.left = rotHandlePos.x - text.width / 2;
    };

    new fabric.Image.fromURL(imageUrl, (img) => {
      img.scaleToWidth(200);
      img.scaleToHeight(200);
      img.setControlsVisibility(showControls);
      canvi.add(img);
      canvi.bringForward(img);
    });

    canvi.on("object:rotating", (e) => {
      var obj = e.target;

      updateAngleText(obj, text);
    });

    const getObjectFromCanvasById = (id) => {
      const canvasObject = canvi.getObjects().filter((item) => {
        return item.id === id;
      });
      return canvasObject[0];
    };

    const removeObjectFromCanvas = (objectId) => {
      const canvasObject = getObjectFromCanvasById(objectId);
      canvi.remove(canvasObject);
    };

    canvas.on("selection:cleared", function (e) {
      removeObjectFromCanvas("horizontalLine");
      removeObjectFromCanvas("verticalLine");
    });

    canvi.on("object:moving", function (e) {
      var obj = e.target;

      var verticalLine = new fabric.Line(
        [canvi.width / 2, 0, canvi.width / 2, canvi.height],
        {
          strokeDashArray: [5, 5],
          strokeWidth: 2,
          stroke: "#0077b6",
          id: "verticalLine",
          selectable: false,
        }
      );

      var horizontalLine = new fabric.Line(
        [canvi.width, 0, canvi.width, canvi.height],
        {
          strokeDashArray: [5, 5],
          strokeWidth: 2,
          stroke: "#0077b6",
          id: "horizontalLine",
          selectable: false,
          angle: 90,
          top: canvi.height / 2,
        }
      );

      let verticalLineExists = getObjectFromCanvasById("verticalLine")
        ? true
        : false;

      let horizontalLineExists = getObjectFromCanvasById("horizontalLine")
        ? true
        : false;

      if (obj.getCenterPoint().x >= 300 && obj.getCenterPoint().x <= 303) {
        !verticalLineExists ? canvi.add(verticalLine) : null;
      } else {
        removeObjectFromCanvas("verticalLine");
      }

      if (obj.getCenterPoint().y >= 300 && obj.getCenterPoint().y <= 303) {
        !horizontalLineExists ? canvi.add(horizontalLine) : null;
      } else {
        removeObjectFromCanvas("horizontalLine");
      }

      if (
        obj.currentHeight > obj.canvas.height ||
        obj.currentWidth > obj.canvas.width
      ) {
        return;
      }
      obj.setCoords();
      // top-left  corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
      }
      // bot-right corner
      if (
        obj.getBoundingRect().top + obj.getBoundingRect().height >
          obj.canvas.height ||
        obj.getBoundingRect().left + obj.getBoundingRect().width >
          obj.canvas.width
      ) {
        obj.top = Math.min(
          obj.top,
          obj.canvas.height -
            obj.getBoundingRect().height +
            obj.top -
            obj.getBoundingRect().top
        );
        obj.left = Math.min(
          obj.left,
          obj.canvas.width -
            obj.getBoundingRect().width +
            obj.left -
            obj.getBoundingRect().left
        );
      }
    });
    // canvi.centerObject(rect);
    // canvi.renderAll();
  };

  useEffect(() => {
    setColorState(
      lightOrDark(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)
    );
    let colorIsCloserToBlack =
      0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;

    colorIsCloserToBlack = colorIsCloserToBlack < 20 ? true : false;

    setIsColorBlack(colorIsCloserToBlack);
  }, [color, isColorBlack, colorState]);

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    // canvas ? canvas.clear() : null;
    files.length > 0 ? addRect(canvas, files.slice(-1).pop().preview) : null;
    // files.forEach((file) => {
    //   addRect(canvas, file.preview);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

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
      <div
        {...getRootProps({
          onClick: (event) => event.stopPropagation(),
          className: "relative shirt-container",
        })}
      >
        <input {...getInputProps()} />
        <canvas id="canvas"></canvas>
        <div
          className={
            (!isColorBlack ? "shirt " : "shirt-black ") +
            "absolute top-0 left-0 right-0"
          }
        >
          <svg
            style={style.color}
            className={isColorBlack ? "hidden" : "absolute"}
            viewBox="0 0 301.86771 300.40253"
          >
            <defs id="defs2" />
            <g
              id="layer1"
              fill="currentColor"
              transform="translate(53.583506,-19.926364)"
            >
              <path
                d="m -53.583506,123.03275 4.144351,-3.85131 4.646695,-4.81415 3.60014,-4.06062 2.888485,-3.30711 3.600144,-3.80945 4.144348,-5.274627 5.818834,-6.363042 4.981592,-5.274627 6.15373,-7.158421 6.8235247,-8.539871 7.786353,-10.632975 2.595451,-3.223384 5.7769717,-6.404904 3.7675906,-3.60014 6.614213,-4.688557 5.902558,-3.516418 6.404903,-3.390831 10.381805,-4.269936 9.209664,-4.144349 7.577042,-3.097796 5.860696,-2.428003 1.542197,-1.034028 0.969532,-0.221837 1.925656,0.20931 3.13966,0.920967 5.1909,1.004691 5.065315,0.669794 8.581734,0.627931 8.204975,0.293035 7.702626,-0.418621 12.89353,-2.051244 5.40021,-1.046553 1.63263,0.962829 4.35366,2.428003 12.14001,6.739801 18.79609,8.16311 12.51677,5.735111 5.90256,5.358349 6.57235,6.279317 9.67015,10.298081 8.83291,9.753872 9.08407,10.088769 11.3865,13.647049 21.68457,23.610235 -3.68386,2.97221 -10.21436,7.53518 -24.90796,21.09851 -14.10753,12.85166 -11.09346,-7.32587 -7.53518,-4.47924 -1.17833,-0.37542 0.38295,9.08274 0.3349,20.59616 0.71165,29.51279 0.96283,34.70369 -0.0837,37.29914 -0.12559,31.68962 -0.16745,1.96752 -8.12125,-0.79539 -5.65138,-0.54419 -7.4096,-0.75353 -18.79609,-0.96282 -7.66076,-0.1256 -8.95849,-0.12557 -9.29339,-0.0837 H 92.180374 l -16.954155,0.29305 -21.977612,0.50234 -12.809805,1.17213 -13.228428,0.8791 -3.432694,-0.0419 -1.80007,-0.58606 -0.795381,-2.05126 -0.125586,-14.31684 0.418621,-22.39624 0.125586,-15.02849 0.125587,-20.17753 0.502345,-17.62395 0.627932,-18.16816 0.79538,-21.47526 0.334897,-18.92168 -0.376759,-13.73077 -2.930348,1.13027 -6.070007,3.22339 -10.4655279,5.94442 -2.8466236,2.0931 -1.9256572,-0.0419 -1.7163466,-0.79538 -0.7953802,-0.71166 -9.6701485,-8.16311 -11.88884,-9.75387 -14.861051,-12.09815 -13.730771,-11.88884 z"
                id="path87"
              />
            </g>
          </svg>
        </div>
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
