import React, { useState } from 'react';
import { toast } from 'react-toastify';

function CountSetForm({ contract, updateCount }) {
  const [value, setValue] = useState('');

  const handleSetCount = async () => {
    if (!value || isNaN(value) || Number(value) < 0) {
      toast.error('Please enter a valid positive number');
      return;
    }

    try {
      const tx = await contract.setCount(value);
      await tx.wait();
      await updateCount();
      toast.success(`Count set to ${value}`);
      setValue('');
    } catch (error) {
      console.error('Error setting count:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Set count"
        className="w-full sm:w-auto px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        onClick={handleSetCount}
        className="w-full sm:w-auto px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        Set Count
      </button>
    </div>
  );
}

export default CountSetForm;