import React from 'react';
import { toast } from 'react-toastify';
import { CiCircleMinus } from 'react-icons/ci';

function DecreaseButton({ contract, updateCount }) {
  const handleDecrement = async () => {
    try {
      const tx = await contract.decrement();
      await tx.wait();
      await updateCount();
      toast.success('Count decremented!');
    } catch (error) {
      console.error('Error decrementing:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleDecrement}
      className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      <CiCircleMinus className="w-6 h-6 mr-2" />
      Decrement
    </button>
  );
}

export default DecreaseButton;