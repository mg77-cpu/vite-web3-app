import { BiSearchAlt } from "react-icons/bi";
import { RiHeartFill } from "react-icons/ri";
import { SiBlockchaindotcom } from "react-icons/si"
import { BitcoinCircleFilled, SolanaCircleColorful, SolanaCircleFilled, PancakeSwapColorful, PhantomCircleColorful } from '@ant-design/web3-icons';



const ServiceCard = ({ color, tittle, icon, subtitle }) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        
        <div className={`w-5 h-5 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className="mt-2 text-white text-lg">{tittle}</h1>
            <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
        </div>
     </div>
)

const Services = () => {
    return (
        <div className="flex flex-col md:flex-row w-10/12 justify-center items-center white-glassmorphism relative top-36">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
                        BITCOIN finally hit 100k!
                    </h1>

                </div>

            </div>
            <div className="flex-1 flex flex-col justify-start items-center">
                <ServiceCard 
                   color="bg-[#2952E3]"
                   tittle="Security Guaranteed"
                   icon={<BitcoinCircleFilled fontSize={21} className="text-white text-gradient" />}
                   subtitle="Rug makes sure you dont get rugged....."
                />
                <ServiceCard 
                   color="bg-[#2952E3]"
                   tittle="More Blockchains soon"
                   icon={<SolanaCircleColorful fontSize={21} className="text-white text-gradient" />}
                   subtitle="Trade with the fastest blockchain for life."
                />
                <ServiceCard 
                   color="bg-[#2952E3]"
                   tittle="Everything Web3.0"
                   icon={<PhantomCircleColorful fontSize={21} className="text-white text-gradient" />}
                   subtitle="Hit your first 100x with ease trading now."
                />
                <ServiceCard 
                   color="bg-[#2952E3]"
                   tittle="Be early "
                   icon={<PancakeSwapColorful fontSize={21} className="text-white text-gradient" />}
                   subtitle="Decentralized for less fees and quick......."
                />
            </div>
        </div>

    );
}

export default Services;