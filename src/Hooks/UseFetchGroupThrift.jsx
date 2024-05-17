import { useCallback, useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getThriftContract } from "../constants/contract";
import { wssProvider } from "../constants/providers";
import { ethers } from "ethers";

const UseFetchGroupThrift = () => {
    const [allGroupRequests, setAllGroupRequests] = useState([]);
    const [count, setCount] = useState(0);

    const fetchAllGroupThrift = useCallback(async () => {
        try {
            const contract = getThriftContract(readOnlyProvider);
            const res = await contract.allGroup();
            const converted = res?.map((groupAdd)=>{
                return{groupAdd,
            }
            }) 
            setAllGroupRequests(converted)
        } catch (error) {
            console.error(error);
        }
    }, []);

    const trackingRequests = useCallback(() => {
        setCount((prevValue) => prevValue + 1);
        fetchAllGroupThrift();
    }, [fetchAllGroupThrift]);


    useEffect(() => {
        fetchAllGroupThrift();

        const filter = {
            address: import.meta.env.VITE_CONTRACT_ADDRESS,
            topics: [ethers.id("NewGroupCreated(address,string,GroupThrift)")],
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

    }, [fetchAllGroupThrift, trackingRequests, count]);

    return allGroupRequests;
}

export default UseFetchGroupThrift 