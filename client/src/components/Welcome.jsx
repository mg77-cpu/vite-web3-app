import { AiFillCustomerService } from "react-icons/ai";
import { SiEthereum, SiBitcoin } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import React, { useContext } from 'react';
import { Loader } from "./";
import { TransactionContext } from "../context/TransactionContext.jsx";
import { cutAddress } from "../utils/cutddress.js";


const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white font-semibold ";
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm blue-glassmorphism"
    />
)

const Welcome = () => {
    const { connectWallet, connectedAccount, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);


    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;
    
        e.preventDefault();
    
        if (!addressTo || !amount || !keyword || !message) return;
    
        sendTransaction();
      };

    return (
       <div className="flex justify-center items-center relative w-10/12 white-glassmorphism top-20 m-5">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start flex-col mf:mr-10">
                <h1 className="txt-3xl sm:text-5xl text-white text-gradient py-1">
                    Transfer some tokens or coins whatever you wanna call it.
                </h1 >
                <p className="text-left mt-5m text-white font-light md:w-9/12 w-11/12 text-base">
                Crypto is not hard but normies scare the boomers and make it hard for adoption.
                </p>
                {!connectedAccount && (
                <button
                   type="button"
                   onClick={connectWallet}
                   className="flex flex-row justify-center items-center my-5 bg-[#000070] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    <AiFillCustomerService className="text-white mr-2" />
                    <p className="text-white text-base font-semibold">
                        Connect Web3 Wallet
                    </p>
                </button>
                )}

                <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 ">
                    <div className={ `${commonStyles}` }>
                        Reliability
                    </div>
                    <div className={commonStyles}>
                        Security
                    </div> 
                    <div className={ `${commonStyles}` }>
                        Blockchain 
                    </div>
                    <div className={ `${commonStyles}` }>
                        Web3 tech
                    </div>
                    <div className={ `${commonStyles}` }>
                        Reduced Latency <br/> increased bandwidth
                    </div>
                    <div className={ `${commonStyles}` }>
                        Decentralized Finance
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 relative left-20">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiBitcoin fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
                        <div>
                        <p className="text-white font-light text-sm">
                         {cutAddress(connectedAccount)}
                        </p>
                        <p className="text-white font-semibold text-lg mt-1">
                            Eth
                        </p>
                        </div>
                    </div>
                </div>
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <Input placeholder="Receiving address" name="addressTo" type="text" handleChange={handleChange} />
                    <Input placeholder="Amount in crypto" name="amount" type="number" handleChange={handleChange} />
                    <Input placeholder="Keyword" name="keyword" type="text" handleChange={handleChange} />
                    <Input placeholder="Enter the message" name="message" type="text" handleChange={handleChange} />

                    <div className="h-[1px] w-full bg-gray-400 my-2" />

                    {isLoading
                       ? <Loader />
                           : (
                                <button
                                   type="button"
                                   onClick={handleSubmit}
                                   className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer text-gradient"
                                >
                                  Send Some Crypto
                                </button>
                         )}
                    
                </div>
            </div>
        </div>

       </div>
    );
}

export default Welcome;