import React from 'react'
import { backendUrl } from '../App'

const ListCart = ({name,price,description,id,remove,image,category}) => {
  return (
    <div className="w-80 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="relative h-48 overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <span className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {category}
                </span>
            </div>
        </div>
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{name}</h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
            <div className="flex justify-between items-center">
                <span className="text-indigo-600 font-bold text-lg">{price}</span>
                <div className="relative group">
                    <button 
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            remove(id);
                        }}
                    >
                        <i className="ri-delete-bin-6-line text-xl"></i>
                    </button>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        Remove blog
                    </span>
                </div>
            </div>
        </div>
        <div 
            className="bg-indigo-50 px-4 py-2 mt-2 cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
            onClick={() => {
                // Create a modal or expand the card to show all details
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                modal.innerHTML = `
                    <div class="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 relative">
                        <button class="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onclick="this.closest('.fixed').remove()">
                            <i class="ri-close-line text-2xl"></i>
                        </button>
                        <h2 class="text-2xl font-bold mb-4">${name}</h2>
                        <img src="${image}" alt="${name}" class="w-full h-64 object-cover rounded-lg mb-4">
                        <p class="text-gray-600 mb-2"><strong>Category:</strong> ${category}</p>
                        <p class="text-gray-600 mb-2"><strong>Price:</strong> ${price}</p>
                        <p class="text-gray-700">${description}</p>
                    </div>
                `;
                document.body.appendChild(modal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.remove();
                });
            }}
        >
            <div className="flex justify-between items-center text-sm text-indigo-600">
                <span className="font-semibold">Read more</span>
                <i className="ri-arrow-right-line"></i>
            </div>
        </div>
    </div>
  )
}

export default ListCart