import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { Navigate, Outlet } from "react-router-dom"
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const DashboardLayout = () => {
  const { isConnected } = useWeb3ModalAccount();

  return !isConnected ? <Navigate to={'/'} /> : (
    <div>
        <Header />
        <div className="flex justify-between">
            <Sidebar />
            <div className="px-6 w-[100%] lg:w-[72%] md:w-[72%] h-auto lg:h-[80vh] md:h-[80vh] overflow-y-scroll">
            <Outlet />
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout