import { CgHomeAlt } from "react-icons/cg";
import { BiBox } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { AiOutlineTeam } from "react-icons/ai";
import { NavLink } from "react-router-dom"

const Sidebar = () =>  {
  const activeStyle = {
    borderLeft: '1px solid #9C0F94',
    borderRight: '1px solid #9C0F94',
    width: '100%',
    padding: '20px'
  };

  return (
    <div className='bg-[#060E37] w-[25%] text-white p-8 py-12 h-[85vh]'>
      <NavLink to="/dashboard" className="text-[18px] flex items-center py-4 mb-4 px-4" style={({isActive}) => isActive ? activeStyle : null } end><CgHomeAlt className="mr-4" />Dashboard</NavLink>
      <NavLink to="singlethrift" className="text-[18px] flex items-center py-4 mb-4 px-6" style={({isActive}) => isActive ? activeStyle : null }><BiBox className="mr-4" /> Single Thrift</NavLink>
      <NavLink to="groupthrift" className="text-[18px] flex items-center py-4 mb-4 px-6" style={({isActive}) => isActive ? activeStyle : null }><BiBox className="mr-4" /> Group Thrift</NavLink>
      <NavLink to="message" className="text-[18px] flex items-center py-4 mb-4 px-6" style={({isActive}) => isActive ? activeStyle : null }><BiBox className="mr-4" /> Message</NavLink>
      <NavLink to="profile" className="text-[18px] flex items-center py-4 mb-4 px-6" style={({isActive}) => isActive ? activeStyle : null }><AiOutlineTeam className="mr-4" /> Profile</NavLink>
      <NavLink to="/settings" className="text-[18px] flex items-center py-4 mb-4 px-6" style={({isActive}) => isActive ? activeStyle : null }><TbSettings className="mr-4" /> Settings</NavLink>
    </div>
  );
}

export default Sidebar;
