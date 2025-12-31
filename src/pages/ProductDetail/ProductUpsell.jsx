import { useState } from "react";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="gallery">
      <img className="main-image" src={active} alt="" />

      <div className="thumbs">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={active === img ? "active" : ""}
            onClick={() => setActive(img)}
          />
        ))}
      </div>
    </div>
  );
}
