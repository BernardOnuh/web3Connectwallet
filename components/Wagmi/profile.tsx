import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
  import Image from 'next/image'
  
  export default function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()
  
    if (isConnected) {
      return (
        <div>
          <div>{ensName ? `${ensName} (${address})` : address}</div>
        </div>
      )
    }
  
    return (
      <div >
        <p className='text-center mt-5'> WAGMI Connect Wallet</p>
      <div className='flex flex-col items-center'>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className={`bg-blue-500 hover:bg-blue-700 text-white m-2 text-center font-bold py-2 px-4 rounded ${
            !connector.ready ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!connector.ready}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}
    
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
    </div>
    )
  }
  