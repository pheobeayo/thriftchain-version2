import CreateGroupThrift from "../../components/CreateGroupThrift"
import CreateSingleThrift from "../../components/CreateSingleThrift"
import { NavLink } from 'react-router-dom'
import UseFetchRequests from "../../Hooks/UseFetchRequests"
import UseFetchUserSingle from "../../Hooks/UseFetchUserSingle"
import UseFetchGroupThrift from "../../Hooks/UseFetchGroupThrift"

const Dashboard = () => {
    const allRequests = UseFetchRequests();
    const allUserRequests = UseFetchUserSingle();
    const allGroupRequests = UseFetchGroupThrift();
    const allUserGroupRequests = UseFetchGroupThrift();
   
  return (
    <main className='text-white'>
        <h1 className="mb-4 lg:text-[38px] md:text-[38px] text-[24px]">
        Overview
      </h1>
        <div className="flex flex-col lg:flex-row md:flex-row justify-between">
            <div className="bg-[#060E37] p-8 rounded-lg w-[100%] lg:w-[22%] md:w-[22%] text-center my-4">
                <h3 className='text-[16px] mb-2 uppercase'>Single Thrift Total</h3>
                <p className='text-[18px] lg:text-[26px] md:text-[26px]'>{allRequests.length}</p>
            </div>
            <div className="bg-[#060E37] p-8 rounded-lg w-[100%] lg:w-[22%] md:w-[22%] text-center my-4">
                <h3 className='text-[16px] mb-2 uppercase'>my Single Thrift Total</h3>
                <p className='text-[18px] lg:text-[26px] md:text-[26px]'>{allUserRequests.length}</p>
            </div>
            <div className="bg-[#060E37] p-8 rounded-lg w-[100%] lg:w-[22%] md:w-[22%] text-center my-4">
                <h3 className='text-[16px] mb-2 uppercase'>group Thrift Total</h3>
                <p className='text-[18px] lg:text-[26px] md:text-[26px]'>{allGroupRequests.length}</p>
            </div>
            <div className="bg-[#060E37] p-8 rounded-lg w-[100%] lg:w-[22%] md:w-[22%] text-center my-4">
                <h3 className='text-[16px] mb-2 uppercase'>My group Thrift Total</h3>
                <p className='text-[18px] lg:text-[26px] md:text-[26px]'>{allUserGroupRequests.length}</p>
            </div>
        </div>
        
      <div className="px-8 py-10 bg-[#060E37] rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] lg:text-[22px] md:text-[22px] font-bold">
            Browse and find contribution modules to join
          </h2>
          <div className="mt-4 mb-3 flex items-center">
            <CreateGroupThrift />
            <CreateSingleThrift />
          </div>
        </div>
        </div>
  
    </main>
    )
}

export default Dashboard