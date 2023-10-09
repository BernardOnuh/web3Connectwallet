import { createPublicClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { useState } from 'react';

const Viem: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [blockNo, setBlockNo] = useState<bigint | string>('');
  const [balance, setBalance] = useState<bigint | string>('');
  const [txnCount, setTxnCount] = useState<bigint | string>('');
  const connectWallet = async (): Promise<void> => {
    try {
      // Request accounts from MetaMask
      const [address] = await (window.ethereum as any).request({
        method: 'eth_requestAccounts'
      });

      // Create a public client

      const client1 = createPublicClient({ 
        chain: mainnet,
        transport: custom(window.ethereum)
      })
      setWalletAddress(address)

      const blockNumber = await client1.getBlockNumber()
      setBlockNo(blockNumber.toString())


      const balance = await client1.getBalance({ 
        address: address,
      })
      setBalance(balance.toString())

      const transactionCount = await client1.getTransactionCount({  
        address: address,
      })
      setTxnCount(transactionCount.toString())
     
      // For example, you can fetch the balance, send transactions, etc.

      console.log('Connected to wallet:', address);
    } catch (error:any) {
      console.error('Error connecting to wallet:', error.message);
    }
  };

  return (
    <div className="items-center text-center py-2 justify-center">
      <h1 className="py-2">VIEM CONNECT WALLET</h1>
      <button onClick={connectWallet} className="bg-blue-300 rounded px-5 py-2">Connect to MetaMask</button>
      <p className="text-white py-2">Wallet Address: {walletAddress}</p>
      <p className="text-white py-2">Block No: {blockNo.toString()}</p>
      <p className="text-white py-2">Balance: {balance.toString()}</p>
      <p className="text-white py-2">Txn Count: {txnCount.toString()}</p>
    </div>
  );
};

export default Viem;
