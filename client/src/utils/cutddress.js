// export const shortenAddress = (address) => {
export const cutAddress = (address) =>{
    if (!address) {
        return "No wallet connected yet."; // or return a default value if preferred
    }
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
