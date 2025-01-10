import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { cutAddress } from "../utils/cutddress";

import txData from "../utils/txData";
import  useFetch  from "../hooks/useFetch";
import bi from "../../images/bi.svg";
import b1 from "../../images/b1.svg";
import wi from "../../images/wi.jpg";



const Transactions = () => {


    const { connectedAccount, transactions } = useContext(TransactionContext);

    const TransactionCard = ( {addressTo, addressFrom, timestamp, message, keyword, amount, url} ) => {
        const gifUrl = useFetch({ keyword });
        return (
            <div className="
             m-4 flex flex-1
            2xl:min-w-[430px]
            2xl:max-w-[480px]
            sm:min-w-[290px]
            sm:max-w-[310]
            flex-col p-3 
            rounded-md 
            hover:shadow-2xl
            ">
                <div className="flex flex-col items-center w-full mt-3">
                    <div className="w-full mb-6 p-2">
                        <a href={`https://etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base"> Sent From: {cutAddress(addressFrom)}</p>
                        </a>
                        <a href={`https://etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">Sent To: {cutAddress(addressTo)}</p>
                        </a>
                        <p className="text-white text-base">Amount: {amount} ETH</p>
                        {message && (
                            <>
                            <br />
                            <p className="text-white text-base">Message: {message}</p>
                            </>
                        )}
                    </div>
                        <img 
                           src={ wi }
                           alt="img"
                           className="w-full h-65 2x:h-90 rounded-md shadow-lg object-cover bg-white"
                        />
                        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                           <p className="text-[#37c7da] font-semi-bold">{timestamp}</p>
                        </div>
                </div>
            </div>

        );
    }
    return (
        <div className="flex w-10/12 justify-center items-center 2xl:px-20 white-glassmorphism relative top-56">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {connectedAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">New Transactions</h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">Connect your web3 wallet to see some Txs</h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10 text-white">
                    {transactions.reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Transactions;