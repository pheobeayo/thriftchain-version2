import { ethers } from "ethers";
import thriftABI from "./thrift.json"
import ERC20ABI from './erc20.json'
// import groupABI from "./groupThrift.json"
// import singleABI from "./singleThrift.json"
import UseFetchRequests from "../Hooks/UseFetchRequests";

export const getThriftContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        thriftABI,
        providerOrSigner
    );

export const getErc20TokenContract = (providerOrSigner, tokenAddress) =>
    new ethers.Contract(import.meta.env.VITE_USDC_TOKEN_ADDRESS, ERC20ABI, providerOrSigner);

// export const getSingleThriftContract = (providerOrSigner) =>
//    { const allRequests = UseFetchRequests()
//     new ethers.Contract(
//         import.meta.env.VITE_DAO_CONTRACT_ADDRESS,
//         singleABI,
//         providerOrSigner
//     )}

// export const getErc20TokenContract = (providerOrSigner, tokenAddress) =>
//     new ethers.Contract(tokenAddress, erc20ABI, providerOrSigner);