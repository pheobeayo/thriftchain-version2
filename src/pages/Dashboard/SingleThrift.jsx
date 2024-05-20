import React, { useState, useLocation } from 'react'
import CreateSingleThrift from "../../components/CreateSingleThrift";
import { RiFolderWarningFill } from "react-icons/ri";
import UseFetchUserSingle from '../../Hooks/UseFetchUserSingle';
import { Link } from "react-router-dom";
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';

const SingleThrift = () => {
  const allUserRequests = UseFetchUserSingle();

  const itemsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = allUserRequests.slice(startIndex, endIndex);
  console.log(paginatedData)

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="text-white">
      <section className='flex justify-between bg-[#060E37] p-6 rounded-lg mb-8 '>
        <div className='w-[100%] lg:w-[48%] md:w-[48%]'>
        <h2 className='text-[18px] lg:text-[28px] md:text-[28px] font-bold mb-4'>Manage your personal goals</h2>
        <p>Create a single thrift, track and achieve your personal financial goals with ease.</p>
        </div>
        <div>
          <CreateSingleThrift />
        </div>
      </section>
      <h2 className='text-[20px] lg:text-[28px] md:text-[28px] font-bold my-6'>Active Thrifts</h2>
      <section className="flex justify-between flex-wrap mt-8">
      {paginatedData.length > 0 ? (
          paginatedData.map((info, index) => (
        <div className="lg:w-[30%] md:w-[30%] w-[100%] p-6 rounded-lg shadow-md shadow-[#3b3b3b]" key={index}>
          <Link to={`/dashboard/singlethrift/${info.addInfo}`}>
            <img
              src="https://img.freepik.com/free-photo/3d-cartoon-character-fun-teenager_183364-80805.jpg?t=st=1715518957~exp=1715522557~hmac=d5a2038f20c2276af324113fc4a15bca2d989b6953b052cdccda61b165e4834e&w=1380"
              alt=""
              className="w-[100%] rounded-lg"
            />
            <p className="truncate mt-4">{info.addInfo}</p>
            <p className="font-normal text-justify text-white text-xs">Save towards a goal.</p>
          </Link>
        </div>
          ))
        ) : (
          <div className='flex flex-col items-center w-full'>
            <RiFolderWarningFill className='text-[48px] mb-4'/>
            <h2 className='text-[18px] lg:text-[24px] md:text-[24px] mb-4'>No active thrift yet!</h2>
          </div>
        )}
      </section>
      <div className='text-white h-14 mt-6 w-[100%] lg:w-[50%] md:w-[50%] mx-auto flex justify-center'>
      {paginatedData > itemsPerPage ? (<Stack spacing={2}>
      <Pagination
        count={Math.ceil(allUserRequests.length / itemsPerPage)}
        size='large'
        page={currentPage}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        color="primary"
        sx={{backgroundColor: 'white'}}
      />  
    </Stack>) : ''}
    </div>
    </div>
  );
};

export default SingleThrift;
