import React, { useEffect, useState } from "react";

const GallerySectionIi = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Define the images (replace with your image URLs)
    const imageUrls = [
      "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8271_ef0uof.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8273_qtouui.jpg",
      "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715627032/5919f0d917510a632268b369b6e61be4_-_Copy_mvoiyw.webp",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626500/original_2_hjkvni.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8278_smypua.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8264_scfefo.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8266_y1buyw.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427078/michael-oxendine-GHCVUtBECuY-unsplash_wuxwja.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427076/francesca-tosolini-Gh_UjjYoVwk-unsplash_vb28gq.jpg",

      "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8271_ef0uof.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8273_qtouui.jpg",
      "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715627032/5919f0d917510a632268b369b6e61be4_-_Copy_mvoiyw.webp",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626500/original_2_hjkvni.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8278_smypua.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8264_scfefo.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8266_y1buyw.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427078/michael-oxendine-GHCVUtBECuY-unsplash_wuxwja.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427076/francesca-tosolini-Gh_UjjYoVwk-unsplash_vb28gq.jpg",

      "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8271_ef0uof.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8273_qtouui.jpg",
      "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715627032/5919f0d917510a632268b369b6e61be4_-_Copy_mvoiyw.webp",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626500/original_2_hjkvni.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8278_smypua.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8264_scfefo.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8266_y1buyw.jpg",
      "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427078/michael-oxendine-GHCVUtBECuY-unsplash_wuxwja.jpg",
    ];

     // Shuffle the images array initially
    shuffleAndSetImages(imageUrls);

    // Shuffle the images every 10 seconds
    const interval = setInterval(() => {
      shuffleAndSetImages(imageUrls);
    }, 120);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Function to shuffle images and update state
  const shuffleAndSetImages = (imageUrls) => {
    const shuffledImages = shuffleArray(imageUrls);
    setImages(shuffledImages);
  };

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Images will fill the available width
        gap: "0px", // No gap between images
        backgroundColor: `#161616`,
        margin: "0px", // Remove margin
        padding: "0px", // Remove padding
        position: "relative", // Make the container relative for absolute positioning of overlay
      }}
    >
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          style={{
            width: "100%", // Each image will take up the full width of its grid cell
            height: "200px", // Fixed height for all images
            objectFit: "cover",
          }}
        />
      ))}
    </section>
  );
};

export default GallerySectionIi;