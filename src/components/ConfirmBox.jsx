import React from 'react';

export const ConfirmBox = ({ message, onCancel, onConfirm }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-transparent flex items-center justify-center z-50'>
      <div className='bg-[#DDD0C8] rounded-lg p-8'>
        <p className='text-gray-800 font-bold text-lg'>{message}</p>
        <div className='flex justify-end mt-4'>
          <button
            className='px-4 py-1 bg-[#323232] text-white rounded-lg mr-2 hover:bg-[#252525] hover:text-[#EEEEEE] text-lg'
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className='px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg'
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
