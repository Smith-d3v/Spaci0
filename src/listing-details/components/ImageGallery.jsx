import React, { useState } from 'react';

function ImageGallery({ propertyDetail }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = propertyDetail?.images || [];

  return (
    <div className="mb-10">
      {/* Main Image */}
      <div className="relative w-full h-[400px] mb-4">
        <img
          src={images[selectedImage]?.imageUrl || '/placeholder-image.jpg'}
          alt={propertyDetail?.listingTitle}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`cursor-pointer min-w-[100px] h-[80px] rounded-lg overflow-hidden 
              ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
          >
            <img
              src={image.imageUrl}
              alt={`Property view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;