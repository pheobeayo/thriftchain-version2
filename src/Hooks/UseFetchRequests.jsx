import { useCallback, useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getThriftContract } from "../constants/contract";
import { wssProvider } from "../constants/providers";
import { ethers } from "ethers";

const UseFetchRequests = () => {
    const [allRequests, setAllRequests] = useState([]);
    const [count, setCount] = useState(0);

    const fetchAllSingleThrift = useCallback(async () => {
        try {
            const contract = getThriftContract(readOnlyProvider);
            const res = await contract.allSingle();
            const converted = res?.map((addInfo)=>{
                return{addInfo,
            }
            }) 
            setAllRequests(converted)
        } catch (error) {
            console.error(error);
        }
    }, []);

    const trackingRequests = useCallback(() => {
        setCount((prevValue) => prevValue + 1);
        fetchAllSingleThrift();
    }, [fetchAllSingleThrift]);


    useEffect(() => {
        fetchAllSingleThrift();

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

    }, [fetchAllSingleThrift, trackingRequests, count]);

    return allRequests;
}

export default UseFetchRequests