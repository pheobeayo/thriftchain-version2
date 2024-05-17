import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { isSupportedChain } from "../utility";
// import { isAddress } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getThriftContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import TokenList from "../constants/tokenList.json";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "white",
  bgcolor: "#2C2C2C",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateSingleThrift = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, seTStartTime] = useState("");
  const [savingsInterval, setSavingsInterval] = useState("");
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function handleCreateSingleThrift() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getThriftContract(signer);

    try {
      const _duration = Number(duration) * 7 * 24 * 60 * 60;
      const _savingsInterval = Number(savingsInterval) * 24 * 60 * 60;
      const _startTime = Number(startTime) * 24 * 60 * 60;
      const _target = ethers.parseUnits(target, TokenList[currency].decimals);

      const transaction = await contract.createSingleThrift(
        currency,
        description,
        _target,
        _duration,
        _startTime,
        _savingsInterval
      );
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();
      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("Single Thrift creation successful!", {
          position: "top-center",
        });
      }

      toast.error("Thrift Creation Failed!", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Single Thrift Creation Failed!", {
        position: "top-center",
      });
    } finally {
      setTarget(0);
      setCurrency("");
      setDescription("");
      setDuration("");
      setSavingsInterval("");
      setTarget("");

      handleClose()
    }
  }

  return (
    <div>
      <button
        onClick={handleOpen}
        className="style border py-2 px-8 my-4  hover:bg-[#9C0F94]"
      >
        Create Single Thrift
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
              Currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                backgroundColor: "#ffffff23",
                outline: "none",
                color: "gray",
                marginBottom: "20px",
              }}
            >
              {Object.keys(TokenList).map((address) => {
                const token = TokenList[address];
                return (
                  <MenuItem key={token.address} value={token.address}>
                    {token.symbol}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <input
            type="text"
            placeholder="Goal description"
            className="bg-[#B1B7DD] border border-[#B1B7DD] rounded w-full py-2 px-3 text-[#0A134C] mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="target"
            className="bg-[#B1B7DD] border border-[#B1B7DD] rounded w-full py-2 px-3 text-[#0A134C] mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setTarget(e.target.value)}
          />
          <input
            type="text"
            placeholder="duration"
            className="bg-[#B1B7DD] border border-[#B1B7DD] rounded w-full py-2 px-3 text-[#0A134C] mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setDuration(e.target.value)}
          />
          <input
            type="text"
            placeholder="Start time"
            className="bg-[#B1B7DD] border border-[#B1B7DD] rounded w-full py-2 px-3 text-[#0A134C] mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => seTStartTime(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Saving interval"
            className="bg-[#B1B7DD] border border-[#B1B7DD] rounded w-full py-2 px-3 text-[#0A134C] mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSavingsInterval(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-[#9C0F94] to-[#142698] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline min-w-full"
            onClick={handleCreateSingleThrift}
          >
            Create
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateSingleThrift;
