import { SUPPORTED_CHAIN } from "../connection";
import { getThriftContract } from "../constants/contract";
import { getProvider } from "../constants/providers";

export const isSupportedChain = (chainId) =>
    Number(chainId) === SUPPORTED_CHAIN;

export const getWriteThriftContract = async (provider) => {
    const readWriteProvider = getProvider(provider);

    const signer = await readWriteProvider.getSigner();

    return getThriftContract(signer);
};
