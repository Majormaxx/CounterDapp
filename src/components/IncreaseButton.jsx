import React from 'react';
import { toast } from 'react-toastify';
import { CiCirclePlus } from 'react-icons/ci';

function IncreaseButton({ contract, updateCount }) {
  const handleIncrement = async () => {
    try {
      const tx = await contract.increment();
      await tx.wait();
      await updateCount();
      toast.success('Count incremented!');
    } catch (error) {
      console.error('Error incrementing:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleIncrement}
      className="flex items-center justify-center w-full px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <CiCirclePlus className="w-6 h-6 mr-2" />
      Increment
    </button>
  );
}

export default IncreaseButton;