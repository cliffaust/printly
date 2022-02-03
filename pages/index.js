import React, { useState } from "react";
import ItemImageSection from "../components/ItemImageSection";
import ItemColorSection from "../components/ItemColorSection";

export default function Home() {
  const [color, setColor] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "1",
  });

  return (
    <div className="mb-20">
      <div className="mt-12 px-20 flex items-center">
        <div className="w-2/4">
          <ItemImageSection color={color}></ItemImageSection>
        </div>
        <div className="w-2/4">
          <ItemColorSection setColor={setColor}></ItemColorSection>
        </div>
      </div>
    </div>
  );
}
