"use client"
import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  // Simulated dynamic data for cards
  const cards = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Car ${i + 1}`,
    description: `Description for Car ${i + 1}`,
    image: i === 0 ? "/pics/blanket.webp" : "", // Add image only for Car 1
  }));

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-6 sm:justify-center">
        <h1 className="text-3xl font-bold">JM Garage</h1>
        {/* Hamburger Button */}
        {/* <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button> */}
      </header>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row p-6 gap-6">


        {/* Cards Section */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)} // Assign ref
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              {/* Image for Car 1 */}
              {card.image && (
                <div className="mb-4">
                  <Image
                    src={card.image}
                    alt={`Image of ${card.title}`}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside
          className={`${
            sidebarVisible ? "block" : "hidden"
          } sm:block sm:w-64 bg-white shadow-md p-6 lg:static lg:block sm:mb-6`}
        >
          {/* Search Bar */}
          {/* <div className="mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div> */}

          {/* List of Card Names */}
          <ul>
            {cards.map((card, index) => (
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
    </div>
  );
}
