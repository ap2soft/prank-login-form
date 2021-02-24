import React from 'react'

export default function Button({ className, children }) {
    return (
        <button
            type="submit"
            className={`bg-gray-900 hover:bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out` + ' ' + className}
        >
            {children}
        </button>
    )
}
