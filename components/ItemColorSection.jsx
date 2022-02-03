import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { hexToRgbA } from "../lib/utils";

function ItemColorSection({ setColor }) {
  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: "0",
      g: "0",
      b: "0",
      a: "1",
    },
  });

  const colorStyle = {
    background: `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`,
  };

  const handleClick = () => {
    setState({ ...state, displayColorPicker: !state.displayColorPicker });
  };

  const handleClose = () => {
    setState({ ...state, displayColorPicker: false });
  };

  const handleColorChange = (color) => {
    setState({ ...state, color: color.rgb });
    setColor(color.rgb);
  };

  const showColor = (color) => {
    const rgba = hexToRgbA(color).split(",");
    rgba = {
      r: rgba[0],
      g: rgba[1],
      b: rgba[2],
      a: rgba[3],
    };
    setState({ ...state, color: rgba });
    setColor(rgba);
  };

  return (
    <div className="px-20">
      <div className="flex flex-wrap gap-4">
        <div
          onClick={() => showColor("#6B21A8")}
          className="h-14 w-14 rounded-full bg-purple-800 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#1E40AF")}
          className="h-14 w-14 rounded-full bg-blue-800 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#854D0E")}
          className="h-14 w-14 rounded-full bg-yellow-800 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#166534")}
          className="h-14 w-14 rounded-full bg-green-800 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#FFFFFF")}
          className="h-14 w-14 rounded-full bg-white shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#000000")}
          className="h-14 w-14 rounded-full bg-black shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#115E59")}
          className="h-14 w-14 rounded-full bg-teal-800 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#9D174D")}
          className="h-14 w-14 rounded-full bg-pink-800 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#1F2937")}
          className="h-14 w-14 rounded-full bg-gray-800 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#9A3412")}
          className="h-14 w-14 rounded-full bg-orange-800 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#4ADE80")}
          className="h-14 w-14 rounded-full bg-green-400 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#06B6D4")}
          className="h-14 w-14 rounded-full bg-cyan-500 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#EC4899")}
          className="h-14 w-14 rounded-full bg-pink-500 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#A855F7")}
          className="h-14 w-14 rounded-full bg-purple-500 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#9CA3AF")}
          className="h-14 w-14 rounded-full bg-gray-400 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#FB923C")}
          className="h-14 w-14 rounded-full bg-orange-400 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#818CF8")}
          className="h-14 w-14 rounded-full bg-indigo-400 shadow-md cursor-pointer"
        ></div>
        <div
          onClick={() => showColor("#155E75")}
          className="h-14 w-14 rounded-full bg-cyan-800 shadow-md cursor-pointer"
        ></div>
      </div>
      <div className="mt-12">
        <div
          className="p-2 flex items-center gap-4 cursor-pointer"
          onClick={handleClick}
        >
          <div className="font-bold p-2 bg-white rounded-md shadow-sm">
            Select a color
          </div>
          <div style={colorStyle} className="h-9 w-9 rounded-md shadow-md" />
        </div>
        {state.displayColorPicker ? (
          <div className="absolute z-20">
            <div
              className="fixed top-0 left-0 right-0 bottom-0"
              onClick={handleClose}
            />
            <SketchPicker color={state.color} onChange={handleColorChange} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ItemColorSection;
