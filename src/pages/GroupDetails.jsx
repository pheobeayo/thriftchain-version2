import React from "react";
import { useParams } from "react-router-dom";
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
import groupThriftABI from "../constants/groupThrift.json";
import { useState, useCallback, useEffect } from "react";
import { getErc20TokenContract } from "../constants/contract";
import Box from "@mui/material/Box";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdSavings } from "react-icons/md";
import Modal from "@mui/material/Modal";
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

const GroupDetails = () => {
  const params = useParams();
  const groupthriftId = params.groupthriftId;
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const [memberAdd, setMemberAdd] = useState("");
  const handleSaveOpen = () => setShowModal(true);
  const handleSaveClose = () => setShowModal(false);
  const handleClose = () => setOpen(false);
  const [savingsAmount, setSavingsAmount] = useState(0);

  const [groupRequest, setGroupRequest] = useState([]);

  async function handleSave() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const getGroupThriftContract = (providerOrSigner) =>
      new ethers.Contract(groupthriftId, groupThriftABI, providerOrSigner);

    const contract = getGroupThriftContract(signer);
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

      const transaction = await contract.save(memberAdd);
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

      const getGroupThriftContract = (providerOrSigner) =>
        new ethers.Contract(groupthriftId, groupThriftABI, providerOrSigner);

      const contract = getGroupThriftContract(signer);

      try {
        const transaction = await contract.withdraw(memberAdd);
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

  const fetchGroupAccount = useCallback(async () => {
    try {
      const getGroupThriftContract = (providerOrSigner) =>
        new ethers.Contract(groupthriftId, groupThriftABI, providerOrSigner);

      const contract = getGroupThriftContract(readOnlyProvider);

      const res = await contract.getAccount();

      setGroupRequest(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchSavingsPerInterval = useCallback(async () => {
    try {
    const getGroupThriftContract = (providerOrSigner) =>
        new ethers.Contract(groupthriftId, groupThriftABI, providerOrSigner);

    const contract = getGroupThriftContract(readOnlyProvider);

      const res = await contract.amountToSavePerInterval();
  
      setSavingsAmount(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchGroupAccount();
    fetchSavingsPerInterval();
  }, []);

  return (
    <main className="text-white">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 lg:text-[38px] md:text-[38px] text-[24px]">
          Thrift Details
        </h2>
        <p>Total Member: {Number(groupRequest[8])}</p>
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
              <p className="my-4">Your calculated savings per interval is</p>
              <p>{(Number(savingsAmount) / 1e18).toFixed(2)} ETH</p>
              <input type="text" placeholder="Enter your wallet address" onChange={(e) => setMemberAdd(e.target.value)} className="bg-[#B1B7DD] border border-[#B1B7DD] rounded w-full py-2 px-3 text-[#0A134C] mb-3 leading-tight focus:outline-none focus:shadow-outline" />
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
        className="p-6 rounded-lg flex justify-between bg-cover bg-center bg-[#3e3e3e] bg-blend-overlay h-[40vh]"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/diverse-group-people-savings-concept-illustration_53876-35241.jpg?t=st=1715761171~exp=1715764771~hmac=e9d53206898c96b9664d943b122dc0eac9eb157059d8ef836f94881664f48065&w=1800')`,
        }}
      ></section>
      <section className="my-8 p-6 rounded-lg bg-[#060E37]">
        <h2>Members Addresses</h2>
        {Array.isArray(groupRequest[9]) ? (
          <div>
            <ul>
              {groupRequest[9].map((address, index) => (
                <li key={index} className="list-disc my-2">
                  {address}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Invalid data format</p>
        )}
      </section>
      <section className="my-4">
        <div className="p-6 rounded-lg bg-[#060E37]">
          <p>Account owner: {groupRequest[0]}</p>
          <p>Goal description: {groupRequest[2]}</p>
          <p>Target amount: {Number(groupRequest[3]) / 1e18}</p>
          <p>Duration Time : {Number(groupRequest[4]) / 86400 + " days"}</p>
          <p>Currency: {groupRequest[5]}</p>
          <p>Amount contributed: {Number(groupRequest[11]) / 1e18}</p>
          <p>Savings Interval: {Number(groupRequest[10]) / 86400 + " days"}</p>
        </div>
      </section>
      <section className="my-6 bg-[#060E37] p-8 rounded-lg">
        <h3 className="mb-4 lg:text-[28px] md:text-[28px] text-[20px] font-bold">
          Manage Group Thrift Savings
        </h3>
        <div className="flex justify-between">
          <p className="text-[22px] w-[100%] lg:w-[40%] md:w-[40%] my-4">
            Effortlessly manage your savings goals, targets and withdrawals with
            ease.
          </p>
          <div className="w-[100%] lg:w-[55%] md:w-[55%]">
          <div className="flex items-center">
            <input type="text" placeholder="Enter your wallet address" onChange={(e) => setMemberAdd(e.target.value)} className="bg-[#B1B7DD] border border-[#B1B7DD] w-full py-2 px-3 text-[#0A134C] leading-tight focus:outline-none focus:shadow-outline" />
            <button
              className="style border py-2 px-8 my-4 hover:bg-[#9C0F94]"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
            </div>
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
                    {/* <button className="style border py-2 px-8 my-4 hover:bg-[#9C0F94]" onClick={handleEmergencyWithdraw}>Save</button> */}
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GroupDetails;
