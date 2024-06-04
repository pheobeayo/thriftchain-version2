import avatar from "../../assets/avatar.svg";
import avatartwo from "../../assets/avatartwo.svg";
import avatarthree from "../../assets/avatarthree.svg";
import avatarfour from "../../assets/avatarfour.svg";

const Message = () => {
  return (
    <main className="bg-[#070624] w-screen">
      <div className="container mx-auto sm:px-[80px] py-[100px]">
        <div className="flex flex-col lg:flex-row md:flex-row">
          <div className='w-[10%]'>
            <img src={avatar} alt={avatar} />
          </div>
          <div className="bg-[#020B37] w-[50%] rounded-lg p-2">
            <h1 className="text-white font-bold">Naomi Roberts</h1>
            <p className="text-white font-light">
              {" "}
              Woohoo! 🏝️ This is so exciting. 
              Where is everyone planning to go?
              Let us share some destination inspiration!
            </p>
          </div>
          <div className="text-white mt-8 p-2">12:15pm</div>
        </div>
        <div  className="flex flex-col lg:flex-row md:flex-row mt-2">
          <div className="w-[10%]">
            <img src={avatartwo} alt={avatartwo} />
          </div>
          <div className="bg-[#020B37] w-[50%] rounded-lg p-2">
            <h1 className="text-white font-bold">Wade Warren</h1>
            <p className="text-white font-light">
              {" "}
              I am all in for a tropical paradise.
              Bali, Indonesia, has always
              been a dream destination for me. 🌺
            </p>
          </div>
          <div className="text-white mt-8 p-2">12:17pm</div>
        </div>
        <div  className="flex flex-col lg:flex-row md:flex-row mt-2">
          <div className="w-[10%]">
            <img src={avatarthree} alt={avatarthree} />
          </div>
          <div className="bg-[#020B37] w-[50%] rounded-lg p-2">
            <h1 className="text-white font-bold">Cody Fisher</h1>
            <p className="text-white font-light">
              {" "}
              That sounds amazing, User3! I am eyeing the enchanting streets of
              Kyoto, Japan, for our dream adventure. 🏯
            </p>
          </div>
          <div className="text-white mt-8 p-2">12:20pm</div>
        </div>
        <div  className="flex flex-col lg:flex-row md:flex-row mt-2">
          <div className="w-[10%]">
            <img src={avatarfour} alt={avatarfour} />
          </div>
          <div className="bg-[#020B37] w-[50%] rounded-lg p-2 ">
            <h1 className="text-white font-bold">Dianne Russell</h1>
            <p className="text-white font-light">
              {" "}
              Count me in for an African safari! Kenya or Tanzania, surrounded
              by wildlife and stunning landscapes. 🦁🦒
            </p>
          </div>
          <div className="text-white mt-8 p-2">12:20pm</div>
        </div>
      </div>
    </main>
  );
};

export default Message;