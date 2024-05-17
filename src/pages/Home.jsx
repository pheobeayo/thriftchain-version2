import { Link } from "react-router-dom";
import Key from "../components/key";
import objects from "../assets/objects.svg";
import Great from "../components/great";

const Home = () => {
  return (
    <main className="bg-[#070624] w-screen">
      <div className="container mx-auto px-4 sm:px-[80px] py-[100px]">
        <h1 className=" mt-4 lg:text-[45px] md:text-[35px] text-[32px] font-bold capitalize  text-[#BD5FB8] text-center">
          Your contribution to financial{" "}
        </h1>
        <h2 className=" lg:text-[45px] md:text-[35px] text-[32px] font-bold capitalize text-[#BD5FB8] text-center ">
          independence
        </h2>
        <h3 className="text-[20px] md:text-[20px]  font-light capitalize text-white text-center   md:mx-80 sm:mx-6">
          Unlock Savings, Achieve Dreams, Secure Tomorrow
        </h3>
        <div className="grid place-items-center mt-6">
          <Link to="/onboarding-data">
            <button className="bg-gradient-to-r from-[#9C0F94] to-[#142698] hover:bg-blue-700 text-white font-semibold py-2 rounded-full border-white border-2 w-48 h-20">
              Join the Waitlist{" "}
            </button>{" "}
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-[80px] py-[100px]">
        <div className="md:mx-56 sm:mx-4">
          <div>
            <img src={objects} alt="objects" />
          </div>
          <div className="mt-16">
            <h1 className="text-[30px] md:text-[30px] font-bold capitalize  text-white md:mx-28 sm:mx-4 sm:text-sm mb-2 text-center leading-10">
              About ThriftChain{" "}
            </h1>
            <p className="text-[15px] md:text-[15px] text-white mb-4 sm:text-sm text-center mt-4 leading-9">
              ThriftChain is a blockchain-based financial management platform.
              It enables individual and
              <br></br>group savings, contributions, and goal achievement. Users
              can track progress in real-time,
              <br></br>and blockchain technology ensures security and
              transparency. ThriftChain encourages
              <br></br>financial discipline, making it a powerful tool for both
              individual and group financial
              <br></br>planning.
            </p>
          </div>
        </div>
      </div>
      <Key />
      <Great />
    </main>
  );
};

export default Home;
