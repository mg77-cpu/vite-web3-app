import bn from "../../images/bn.gif"

const Footer = () => {
    return (
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 white-glassmorphism rounded-none relative top-full ">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div>
                    <img src={bn} alt="logo" className="w-32" />
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <p className="text-white text-center mx-2 cursor-pointer text-bold">Market</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer text-bold">Web3 platforms</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer text-bold">Layer2s</p>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5"/>
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
            <p className="text-white text-sm text-center text-bold">rugged@web3.com</p>
            <p className="text-white text-sm text-center text-bold">All rights reserved</p>

            </div>
        </div>
    );
}

export default Footer;