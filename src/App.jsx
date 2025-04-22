import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CiWallet } from 'react-icons/ci';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CounterDisplay from './components/CounterDisplay';
import IncreaseButton from './components/IncreaseButton';
import DecreaseButton from './components/DecreaseButton';
import CountSetForm from './components/CountSetForm';
import CounterABI from './components/ContractABI.json';


const contractAddress = "0x7F404c7F9743277A6fe0C3c8431444b81a27EC03"; 

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [count, setCount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('Please install MetaMask!');
      return;
    }

    if (!contractAddress) {
      toast.error('Contract address is missing.');
      return;
    }

    setIsConnecting(true);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress, // Use the hardcoded contractAddress variable
        CounterABI,
        signer
      );
      setContract(contract);
      const address = await signer.getAddress();
      setAccount(address);
      const currentCount = await contract.getCount();
      setCount(Number(currentCount));
      toast.success('Wallet connected!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error(`Failed to connect wallet: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const updateCount = async () => {
    if (contract) {
      try {
        const currentCount = await contract.getCount();
        setCount(Number(currentCount));
      } catch (error) {
        console.error('Error updating count:', error);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-yellow-550 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-6">My Counter DApp</h1>

      {account ? (
        <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-lg truncate">
              {account.slice(0, 6)}...{account.slice(-5)}
            </p>
            <span className="flex items-center bg-green-500 text-white text-sm px-2 py-1 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
              Connected
            </span>
          </div>
          <CounterDisplay count={count} />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <IncreaseButton contract={contract} updateCount={updateCount} />
              <DecreaseButton contract={contract} updateCount={updateCount} />
            </div>
            <CountSetForm contract={contract} updateCount={updateCount} />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-yellow-500 mb-4">
            Please connect your wallet.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center mx-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <CiWallet className="w-6 h-6 mr-2" />
            Connect Wallet
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 sm:mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Connect Wallet</h2>
            <p className="text-gray-300 mb-6">
              Connect your wallet to interact with my Counter DApp on Sepolia.
            </p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className={`w-full flex items-center justify-center px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isConnecting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              <CiWallet className="w-6 h-6 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect with MetaMask'}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-4 px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default App;