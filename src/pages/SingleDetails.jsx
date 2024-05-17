import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { isSupportedChain } from "../utility";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProvider } from "../constants/providers";
import { readOnlyProvider } from "../constants/providers";
import singleThriftABI from "../constants/singleThrift.json";
import { useState, useCallback, useEffect } from "react";
import { getErc20TokenContract } from "../constants/contract";
import Box from "@mui/material/Box";
import { RiErrorWarningFill } from "react-icons/ri";
import Modal from "@mui/material/Modal";
import { MdSavings } from "react-icons/md";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "13px",
  backgroundColor: "#242424",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  p: 4,
  border: "1px solid #424155",
};

const SingleDetails = () => {
  const params = useParams();
  const singlethriftId = params.singlethriftId;
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleSaveOpen = () => setShowModal(true);
  const handleSaveClose = () => setShowModal(false);
  const handleClose = () => setOpen(false);
  const [ savingsAmount, setSavingsAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0)

  const [accountRequest, setAccountRequest] = useState([]);

  async function handleSave() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const getSingleThriftContract = (providerOrSigner) =>
      new ethers.Contract(singlethriftId, singleThriftABI, providerOrSigner);

    const contract = getSingleThriftContract(signer);
    const ercContract = getErc20TokenContract(signer);

    try {
      const _amount = (5 * 1e18).toString();

      const approveTx = await ercContract.approve(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        ethers.parseUnits(_amount, 18)
      );
      const approveReceipt = await approveTx.wait();

      if (approveReceipt.status) {
        toast.success("Approval successful!", {
          position: "top-center",
        });
      } else {
        toast.error("Approval failed!", {
          position: "top-center",
        });
        throw new Error("Approval failed");
      }

      const transaction = await contract.save();
      const receipt = await transaction.wait();

      if (receipt.status) {
        return toast.success("Funds transfer successful!", {
          position: "top-center",
        });
      }
    } catch (e) {
      const errors = {
        Start: "Can't save yet!",
        PaymentCycle: "WAIT FOR NEXT PAYMENT CYCLE!!",
        Deleted: "ACCOUNT Deleted!!",
        Amount: "INVALID AMOUNT!!",
        Goal: "TARGET REACHED!!!",
        Deadline: "DEADLINE PASSED!!",
      };

      if (e.data && contract) {
        const decodedError = contract.interface.parseError(e.data);
        const errorName = decodedError?.name;
        if (errors[errorName]) {
          toast.error(`Transaction failed: ${errors[errorName]}`, {
            position: "top-center",
          });
          console.log(`Transaction failed: ${errors[errorName]}`);
        } else {
          toast.error(`Unknown error: ${errorName}`, {
            position: "top-center",
          });
          console.log(`Unknown error: ${errorName}`);
        }
      } else {
        toast.error(`Error in Save function:`, e, { position: "top-center" });
        console.log(`Error in Save function:`, e);
      }
    }
  }

  async function handleWithdraw() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const getSingleThriftContract = (providerOrSigner) =>
      new ethers.Contract(singlethriftId, singleThriftABI, providerOrSigner);

    const contract = getSingleThriftContract(signer);

    try {
      const transaction = await contract.withdraw();
      const receipt = await transaction.wait();

      if (receipt.status) {
        return toast.success("Funds transfer successful!", {
          position: "top-center",
        });
      }
    } catch (e) {
      const errors = {
        Owner: "NOT OWNER!!",
        Deleted: "ACCOUNT Deleted!!",
        Goal: "TARGET REACHED!!!",
        Amount: "NO FUNDS!!!!",
        Deadline: "DEADLINE NOT REACHED!!",
      };

      if (e.data && contract) {
        const decodedError = contract.interface.parseError(e.data);
        const errorName = decodedError?.name;
        if (errors[errorName]) {
          toast.error(`Transaction failed: ${errors[errorName]}`, {
            position: "top-center",
          });
        } else {
          toast.error(`Unknown error: ${errorName}`, {
            position: "top-center",
          });
        }
      } else {
        toast.error(`Error in widthraw function:`, e, {
          position: "top-center",
        });
      }
    }
  }

  async function handleEmergencyWithdraw() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const getSingleThriftContract = (providerOrSigner) =>
      new ethers.Contract(singlethriftId, singleThriftABI, providerOrSigner);

    const contract = getSingleThriftContract(signer);

    try {
      const transaction = await contract.emergencyWithdrawal();
      const receipt = await transaction.wait();

      if (receipt.status) {
        return toast.success("Withdrawal successful!", {
          position: "top-center",
        });
      }
    } catch (e) {
      const errors = {
        Owner: "NOT OWNER!!",
        Deleted: "ACCOUNT Deleted!!",
        Goal: "TARGET REACHED!!!",
      };

      if (e.data && contract) {
        const decodedError = contract.interface.parseError(e.data);
        const errorName = decodedError?.name;
        if (errors[errorName]) {
          toast.error(`Transaction failed: ${errors[errorName]}`, {
            position: "top-center",
          });
          console.log(`Transaction failed: ${errors[errorName]}`);
        } else {
          toast.error(`Unknown error: ${errorName}`, {
            position: "top-center",
          });
          console.log(`Unknown error: ${errorName}`);
        }
      } else {
        toast.error(`Error in widthraw function:`, e, {
          position: "top-center",
        });
        console.log(`Error in widthraw function:`, e);
      }
    }
  }

  const fetchAccount = useCallback(async () => {
    try {
      const getSingleThriftContract = (providerOrSigner) =>
        new ethers.Contract(singlethriftId, singleThriftABI, providerOrSigner);

      const contract = getSingleThriftContract(readOnlyProvider);

      const res = await contract.getAccount();

      setAccountRequest(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchSavingsPerInterval = useCallback(async () => {
    try {
      const getSingleThriftContract = (providerOrSigner) =>
        new ethers.Contract(singlethriftId, singleThriftABI, providerOrSigner);

      const contract = getSingleThriftContract(readOnlyProvider);

      const res = await contract.amountToSavePerInterval();
      setSavingsAmount(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchCalTimeLeft = useCallback(async () => {
    try {
      const getSingleThriftContract = (providerOrSigner) => new ethers.Contract(singlethriftId, singleThriftABI, providerOrSigner);
      const contract = getSingleThriftContract(readOnlyProvider);
      const res = await contract.calculateTimeLeft();
      console.log(res);
      const parsedTime = Number(res);
      setTimeLeft(parsedTime >= 0 ? parsedTime : 0);
    } catch (error) {
      console.error(error);
      setTimeLeft(0); // Set timeLeft to 0 on error
    }
  }, [singlethriftId, singleThriftABI, readOnlyProvider]);

  useEffect(() => {
    fetchCalTimeLeft(); 

    const interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0); 
    }, 1000);

    return () => clearInterval(interval); 
  }, [fetchCalTimeLeft]);

  const days = Math.floor(timeLeft / (24 * 3600));
  const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    fetchAccount();
    fetchSavingsPerInterval();
    fetchCalTimeLeft();
  }, []);

  return (
    <main className="text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 lg:text-[38px] md:text-[38px] text-[24px]">
          Thrift Details
        </h2>
        <div className="flex items-center w-[100%] lg:w-[30%] md:w-[30%] justify-between">
          <div className="flex flex-col">
            <p className="p-4 rounded-lg bg-[#9C0F94] text-white font-black">{days}</p>
            <p className="text-center">Days</p>
          </div> 
          <div className="flex flex-col">
            <p className="p-4 rounded-lg bg-[#9C0F94] text-white font-black">{hours}</p>
            <p className="text-center">Hours</p>
          </div> 
          <div className="flex flex-col">
            <p className="p-4 rounded-lg bg-[#9C0F94] text-white font-black">{minutes}</p>
            <p className="text-center">Min</p>
          </div> 
          <div className="flex flex-col">
            <p className="p-4 rounded-lg bg-[#9C0F94] text-white font-black">{seconds}</p>
            <p className="text-center">Sec</p>
          </div> 
        </div>
        <div>
          <button
            className="style border py-2 px-8 my-4  hover:bg-[#9C0F94]"
            onClick={handleSaveOpen}
          >
            Save
          </button>
          <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <MdSavings className="text-[58px]" />
              <p className="my-4">
                Your calculated savings per interval is
              </p>
              <p>{(Number(savingsAmount) / 1e18).toFixed(2)} ETH</p>
              <p>Are you sure you want to proceed? </p>
              <div className="mb-4">
                <button
                  onClick={handleSaveClose}
                  className="border border-white py-2 px-8 my-4 mr-2 hover:bg-[#383838]"
                >
                  Cancel
                </button>
                <button
                  className="style border py-2 px-8 my-4 hover:bg-[#9C0F94]"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <section
        className="p-6 rounded-lg flex justify-between bg-cover bg-center bg-[#696969] bg-blend-overlay h-[40vh]"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2017/11/12/19/59/piggy-bank-2943633_1280.jpg')`,
        }}
      ></section>
      <section className="my-4">
        <div className="p-6 rounded-lg bg-[#060E37]">
          <p>Account owner: {accountRequest[0]}</p>
          {/* <p>Thrift contract address: {accountRequest[1]}</p> */}
          <p>Goal description: {accountRequest[2]}</p>
          <p>Target amount: {Number(accountRequest[3]) / 1e18} ETH</p>
          <p>Duration Time : {Number(accountRequest[4]) / 86400 + " days"}</p>
          <p>Currency: {accountRequest[5]}</p>
          {/* <p>Start Time: {Number(accountRequest[6]) / 86400}</p>
          <p>End Time: {Number(accountRequest[7]) / 86400}</p> */}
          <p>Amount contributed: {Number(accountRequest[8]) / 1e18} ETH</p>
          <p>Savings Interval: {Number(accountRequest[9]) / 86400 + " days"}</p>
          <p>Goal status: {accountRequest[10] === "true" ? "true" : "false"}</p>
          {/* <p>Cancelled: {accountRequest[11] === "true" ? "true" : "false"}</p> */}
        </div>
      </section>
      <section className="my-6 bg-[#060E37] p-8 rounded-lg">
        <h3 className="mb-4 lg:text-[28px] md:text-[28px] text-[20px] font-bold">
          Manage Single Thrift Savings
        </h3>
        <div className="flex justify-between">
          <p className="text-[22px] w-[100%] lg:w-[40%] md:w-[40%] my-4">
            Effortlessly manage your savings goals, targets and withdrawals with
            ease.
          </p>
          <div className="flex justify-between items-center w-[100%] lg:w-[55%] md:w-[55%]">
            <div>
              <button
                className="style border py-2 px-8 my-4  hover:bg-[#9C0F94]"
                onClick={handleOpen}
              >
                Emergency Withdrawal
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <RiErrorWarningFill className="text-[58px]" />
                  <p className="my-4">
                    Emergency Withdrawal attracts 2% penalty fee.
                  </p>
                  <p>Are you sure you want to proceed? </p>
                  <div className="mb-4">
                    <button
                      onClick={handleClose}
                      className="border border-white py-2 px-8 my-4 mr-2 hover:bg-[#383838]"
                    >
                      Cancel
                    </button>
                    <button
                      className="style border py-2 px-8 my-4 hover:bg-[#9C0F94]"
                      onClick={handleEmergencyWithdraw}
                    >
                      Save
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
            <button
              className="style border py-2 px-8 my-4 hover:bg-[#9C0F94]"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleDetails;
