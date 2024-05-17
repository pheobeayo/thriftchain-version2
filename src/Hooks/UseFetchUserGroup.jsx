import { useCallback, useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getProvider } from "../constants/providers";
import { getThriftContract } from "../constants/contract";
import { wssProvider } from "../constants/providers";
import { ethers } from "ethers";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
  } from "@web3modal/ethers/react";

const UseFetchUserGroup = () => {
    const [allUserGroupRequests, setAllUserGroupRequests] = useState([]);
    const [count, setCount] = useState(0);
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();      

    const fetchAllUserGroupThrift = useCallback(async () => {
        try {
            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();
            const address = await signer.getAddress();
        
            const contract = getThriftContract(readOnlyProvider);
            const res = await contract.userGroupThrift(address);
            const converted = res?.map((addInfo)=>{
                return{addInfo,
            }
            }) 
            setAllUserGroupRequests(converted)
        } catch (error) {
            console.error(error);
        }
    }, []);

    const trackingRequests = useCallback(() => {
        setCount((prevValue) => prevValue + 1);
        fetchAllUserGroupThrift();
    }, [fetchAllUserGroupThrift]);


    useEffect(() => {
        fetchAllUserGroupThrift();

        const filter = {
            address: import.meta.env.VITE_CONTRACT_ADDRESS,
            topics: [ethers.id("NewSingleCreated(address,string,SingleThrift)")],
        };

        wssProvider.getLogs({ ...filter, fromBlock: 4702687 }).then((events) => {
            setCount(events.length + 1);
        });

        const provider = new ethers.WebSocketProvider(
            import.meta.env.VITE_WSS_RPC_URL
        );
        provider.on(filter, trackingRequests);

        return () => {
            // Perform cleanup
            provider.off(filter, trackingRequests);
        };

    }, [fetchAllUserGroupThrift, trackingRequests, count]);

    return allUserGroupRequests;
}

export default UseFetchUserGroup 