import React from 'react';

function CounterDisplay({ count }) {
  return (
    <div className="my-6 text-center">
      <h2 className="text-2xl font-semibold text-white">Counter Value</h2>
      <p className="text-3xl font-bold text-green-400">
        {count !== null ? count : 'Loading...'}
      </p>
    </div>
  );
}

export default CounterDisplay;