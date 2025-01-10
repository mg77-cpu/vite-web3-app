import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { contractABI, contractAddress } from "../utils/constants.js";

export const TransactionContext = React.createContext();



export const TransactionProvider = ({ children }) => {
    
    const [state, setState] = useState({web3:null, contract: null});

    useEffect(() => {
    const provider = new Web3.providers.HttpProvider("http://localhost:7545");
    async function contractInstance() {
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(
            contractABI, 
            contractAddress);
            console.log(contract);
        setState({web3:web3, contract:contract});
    }
    provider && contractInstance();
  }, []);
  console.log(state);


    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [connectedAccount, setConnectedAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [parsedAmount, setParsedAmount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [isWalletConnected, setIsWalletConnected] = useState(false); // Flag for wallet connection
    const [hasBeenConnected, setHasBeenConnected] = useState(false);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
      };

      const getTransactions = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        const { contract, web3 } = state;
        try {
            const availableTransactions = await contract.methods.getAllTransactions().call();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toString() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: web3.utils.fromWei(transaction.amount, "ether")
              }));
              setTransactions(structuredTransactions);

            console.log(structuredTransactions);
        
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("connect your wallet")
      }
    }

      useEffect(() => {
        walletListener();
      }, [connectedAccount]);

      const walletListener = () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          // Add the accountsChanged listener
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0 && hasBeenConnected) {
              // Wallet address removed
              toast.warn('Wallet disconnected.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
    
              setIsWalletConnected(false); // Reset flag
              setConnectedAccount(null); // Clear wallet address
              console.log("Wallet disconnected");
            } else if (isWalletConnected && accounts[0] !== connectedAccount) {
              // Wallet address changed
              //setWalletAddress(accounts[0]); // Update wallet address
              toast.info('Wallet changed successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              console.log(`Wallet changed to ${accounts[0]}`);
            }
          });
        } else {
          // MetaMask is not installed
          setConnectedAccount(null);
          console.log("Please install MetaMask");
          toast.warn('Please install MetaMask', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      };
    
      useEffect(() => {
        walletListener();
      }, [connectedAccount])


    const checkTransactions = async () => {
        try {
            const { contract } = state;
            const currentTransactionsCount = await contract.methods.getAllTransactionCount().call();
            window.localStorage.setItem("transactionCount", currentTransactionsCount);

        } catch (error) {
            console.log(error); 
        }
    }


    const connectWallet = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          /* MetaMask is installed */
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
  
          // Check if wallet address is already set to avoid duplicate toasts
          if (accounts.length > 0 && accounts[0] !== walletAddress) {
            setConnectedAccount(accounts[0]);
            setIsWalletConnected(true);
            setHasBeenConnected(true);
            toast.info('Wallet Connected Successfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } catch (err) {
          console.error(err.message);
        }
      } else {
        /* MetaMask is not installed */
        console.log("Please install MetaMask!");
        toast.error('Please install a web3 wallet.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };

    
      const sendTransaction = async () => {
        const { contract, web3 } = state;
        const { addressTo, amount, message, keyword } = formData;
        const parsedAmount = web3.utils.toWei(amount, "ether");
    
        try {
            if (!connectedAccount) {
                toast.warn('Wallet not connected. Please connect your wallet first!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
    
            if (contract && web3) {
                const gas = await contract.methods.addToBlockchain(
                    addressTo,
                    parsedAmount,
                    message,
                    keyword
                ).estimateGas({ from: connectedAccount, value: parsedAmount });
    
                const gasPrice = await web3.eth.getGasPrice();
    
                // Set loading state before sending the transaction
                setIsLoading(true);
                
                // Send the transaction and wait for it to be mined
                const transaction = await contract.methods.addToBlockchain(
                    addressTo,
                    parsedAmount,
                    message,
                    keyword
                ).send({ 
                    from: connectedAccount, 
                    value: parsedAmount, 
                    gas: gas, 
                    gasPrice: gasPrice 
                });
    
                // Log transaction hash
                console.log(`Success - ${transaction.transactionHash}`);
    
                // Show processing toast
                toast.info('Transaction is processing', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
    
                // Wait for the transaction receipt to confirm it's mined
                await web3.eth.getTransactionReceipt(transaction.transactionHash);
    
                // Transaction was successful
                toast.success('Transaction was successfully sent', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
    
                // Update state after successful transaction
                const transactionsCount = await contract.methods.getAllTransactionCount().call();
                setTransactionCount(transactionsCount.toString()); // Converts to string
    
            }
        } catch (error) {
            console.error(error);
            toast.error('Transaction failed. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            // Ensure loading state is reset in both success and error cases
            setIsLoading(false);
            setParsedAmount(null);
            window.location.reload();
        }
    };
    

      useEffect(() => {
        checkTransactions();
      }, []);


    return (
        <TransactionContext.Provider value={{
             connectWallet, 
             connectedAccount, 
             handleChange, 
             setFormData, 
             formData, 
             sendTransaction,
             isLoading,
             transactionCount,
             transactions 
             }}>
            {children}
            <ToastContainer />
        </TransactionContext.Provider>
    )
}