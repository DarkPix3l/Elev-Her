import React from 'react';

export default function ErrorCard({ message, Icon }) {
  return (
    <div className="bg-red-100 border-2 border-red-400 px-4 py-3 rounded-md relative max-w-2xl mx-auto" role="alert">
      {Icon && <Icon size={150} color="#ff3f43" className="mx-auto" />}
      <p className="block text-red-700 font-bold mx-auto" >
        {message}
      </p>
    </div>
  );
}
