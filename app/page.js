"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import cards from "./cardsData";

export default function Home() {
  // State for modals
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ description: "", images: [] });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the current image index

  // State to toggle sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Create a ref for each card
  const cardRefs = useRef([]);

  const handleFocus = (index) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Function to open the description modal
  const handleDescriptionClick = (card) => {
    setModalContent({
      ...modalContent,
      title: card.title,
      description: card.description,
      connect: card.connect,
    });
    setDescriptionModalOpen(true);
  };

  // Function to open the image modal
  const handleImageClick = (images) => {
    setModalContent({ ...modalContent, images });
    setCurrentImageIndex(0); // Reset to the first image
    setImageModalOpen(true);
  };

  // Sort cards alphabetically by title
  const sortedCards = [...cards].sort((a, b) => a.title.localeCompare(b.title));

  // Function to handle previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? modalContent.images.length - 1 : prevIndex - 1
    );
  };

  // Function to handle next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === modalContent.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-6 sm:justify-center">
        <h1 className="text-3xl font-bold">JM Garage</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row p-6 gap-6">
        {/* Cards Section */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {sortedCards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)} // Assign ref
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition text-center"
            >
              {/* Image */}
              {card.images && card.images.length > 0 && (
                <div className="mb-4">
                  <button
                    onClick={() => handleImageClick(card.images)} // Pass the list of images
                    className="p-2 h-[10em] flex items-center justify-center w-full"
                  >
                    <Image
                      src={card.images[0]} // Display the first image
                      alt={`Image of ${card.title}`}
                      width={300}
                      height={200}
                      className="object-cover rounded-lg cursor-pointer max-h-full max-w-full"
                    />
                  </button>
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p>₱ {card.price}</p>
              <p>Stock: {card.stock}</p>
              <button
                onClick={() => handleDescriptionClick(card)} // Pass the full card object
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Details
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside
          className={`$${sidebarVisible ? "block" : "hidden"} sm:block sm:w-64 bg-white shadow-md p-6 lg:static lg:block sm:mb-6`}
        >
          <ul>
            {sortedCards.map((card, index) => (
              <li
                key={card.id}
                onClick={() => handleFocus(index)} // Handle click
                className="py-2 px-3 mb-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
              >
                {card.title}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Description Modal */}
      {isDescriptionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2">
            <h2 className="text-xl font-bold mb-4">{modalContent.title}</h2>
            <p className="text-gray-700">{modalContent.description}</p>
            <h3 className="text-l font-bold my-4">Ready to purchase? Contact me @:</h3>
            <p className="text-gray-700">{modalContent.connect}</p>
            <button
              onClick={() => setDescriptionModalOpen(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white grid text-center items-center justify-center p-6 rounded-lg shadow-lg w-7/12 sm:w-2/4">
            <h2 className="text-xl font-bold mb-4">Images</h2>
            <p className="mb-4 text-gray-700">
              {currentImageIndex + 1}/{modalContent.images.length}
            </p>
            <button
              onClick={() => setImageModalOpen(false)}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>

            {/* Display the current image */}
            <div className="relative bg-white flex justify-center">
              {/* Left and Right Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
              >
                &lt;
              </button>

              <Image
                src={modalContent.images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                width={300}
                height={200}
                className="object-cover rounded-lg"
              />

              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
