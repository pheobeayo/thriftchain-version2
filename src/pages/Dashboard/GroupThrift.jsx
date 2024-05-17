import React, { useState, useLocation } from 'react'
import CreateGroupThrift from "../../components/CreateGroupThrift";
import { Link } from "react-router-dom";
import UseFetchGroupThrift from '../../Hooks/UseFetchGroupThrift';
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';

const GroupThrift = () => {
  const allGroupRequests = UseFetchGroupThrift()

  const itemsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = allGroupRequests.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="text-white">
        <section className='flex justify-between bg-[#060E37] p-6 rounded-lg mb-8 '>
        <div className='w-[100%] lg:w-[48%] md:w-[48%]'>
        <h2 className='text-[18px] lg:text-[28px] md:text-[28px] font-bold mb-4'>Manage your collective goals</h2>
        <p>Create a groupthrift, track and achieve your personal financial goals with others, stay motivated to save to a cause.</p>
        </div>
        <div>
          <CreateGroupThrift />
        </div>
      </section>
      <h2 className='text-[20px] lg:text-[28px] md:text-[28px] font-bold my-6'>Active Thrifts</h2>
      <section className="flex justify-between flex-wrap mt-8">
      { paginatedData.map((info, index) => (
            <div className="lg:w-[30%] md:w-[30%] w-[100%] p-6 rounded-lg shadow-md shadow-[#3b3b3b]" key={index} >
              <Link to={`/dashboard/groupthrift/${info.groupAdd}`} >
                <img
                  src="https://img.freepik.com/free-vector/diverse-group-people-savings-concept-illustration_53876-32631.jpg?t=st=1715550013~exp=1715553613~hmac=4c9520da4dad94ce1c877974fa7dc68a9d7c5dd653c9d0ae22ad14388ae26e63&w=1800"
                  alt=""
                  className="w-[100%] rounded-lg"
                />
                <p className='truncate mt-4'>{info.groupAdd}</p>
                <p className="font-normal text-justify text-white text-xs">
                  Save towards a goal.
                </p>
              </Link>
            </div>
          ))}
      </section> 
      <div className='text-white h-14 mt-6 w-[100%] lg:w-[50%] md:w-[50%] mx-auto flex justify-center'>
      <Stack spacing={2}>
      <Pagination
        count={Math.ceil(allGroupRequests.length / itemsPerPage)}
        size='large'
        page={currentPage}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        color="primary"
        sx={{backgroundColor: 'white'}}
      />  
    </Stack>
    </div>
    </div>
  );
};

export default GroupThrift;
