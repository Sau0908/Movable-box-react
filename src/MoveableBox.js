import React, { useState, useEffect } from "react";
import "./MoveableBox.css";

const MoveableBox = () => {
  const containerWidth = 500;
  const containerHeight = 500;
  const boxSize = 50;

  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [boundaryColors, setBoundaryColors] = useState({
    up: "black",
    down: "black",
    left: "black",
    right: "black",
  });

  const moveBox = (direction) => {
    const step = 50;
    let newPosition = { ...position };

    switch (direction) {
      case "left":
        newPosition = { ...newPosition, left: newPosition.left - step };
        break;
      case "right":
        newPosition = { ...newPosition, left: newPosition.left + step };
        break;
      case "up":
        newPosition = { ...newPosition, top: newPosition.top - step };
        break;
      case "down":
        newPosition = { ...newPosition, top: newPosition.top + step };
        break;
      default:
        break;
    }

    newPosition.left = Math.max(
      0,
      Math.min(newPosition.left, containerWidth - boxSize)
    );
    newPosition.top = Math.max(
      0,
      Math.min(newPosition.top, containerHeight - boxSize)
    );

    setPosition(newPosition);
  };
  useEffect(() => {
    const updatedColors = { ...boundaryColors };

    if (position.top === 0) {
      updatedColors.up = "grey";
    } else {
      updatedColors.up = "black";
    }

    if (position.top === containerHeight - boxSize) {
      updatedColors.down = "grey";
    } else {
      updatedColors.down = "black";
    }

    if (position.left === 0) {
      updatedColors.left = "grey";
    } else {
      updatedColors.left = "black";
    }

    if (position.left === containerWidth - boxSize) {
      updatedColors.right = "grey";
    } else {
      updatedColors.right = "black";
    }

    setBoundaryColors(updatedColors);
  }, [position, containerHeight, containerWidth, boxSize]);

  return (
    <div className="moveable-box-outer-container">
      <div className="moveable-box-container">
        <div className="boundary-top" onClick={() => moveBox("up")}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: boundaryColors.up,
            }}
          >
            Up
          </div>
        </div>
        <div className="boundary-left" onClick={() => moveBox("left")}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: boundaryColors.left,
            }}
          >
            Left
          </div>
        </div>
        <div className="boundary-right" onClick={() => moveBox("right")}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: boundaryColors.right,
            }}
          >
            Right
          </div>
        </div>
        <div className="boundary-bottom" onClick={() => moveBox("down")}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: boundaryColors.down,
            }}
          >
            Down
          </div>
        </div>
        <div
          className="moveable-box"
          style={{ left: position.left, top: position.top }}
        ></div>
      </div>
    </div>
  );
};

export default MoveableBox;
