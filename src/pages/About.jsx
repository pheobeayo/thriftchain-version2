import objects from "../assets/objects.svg";

const About = () => {
  return (
    <div className="bg-[#070624]">
      <div className="container mx-auto px-8 sm:px-[80px] pb-[100px]">
        <div className="flex md:flex-row lg:flex-row flex-col justify-between">
          <div className="content-card w-[100%] lg:w-[40%] md:w-[40%] mb-5 h-full p-1 self-center order-2 lg:order-1 md:order-1">
            <h1 className="text-white  lg:text-[48px] md:text-[35px] text-[32px] mb-4">ThriftChain</h1>
            <p className=" text-white text-lg font-normal text-justify text-[14px] lg:text-[18px] md:text-[18px]">
              A blockchain-based financial management platform.
              It enables individual and group savings, contributions, and goal
              achievement. Users can track progress in real-time, and blockchain
              technology ensures security and transparency. ThriftChain
              encourages financial discipline, making it a powerful tool for
              both individual and group financial planning.
            </p>
          </div>
          <div className="content-card w-full lg:w-[55%] md:w-[50%] mb-5 h-full order-1 lg:order-2 md:order-2">
            <img
              src={objects}
              alt="objects"
              className="object-fit-object  w-full object-center"
            />
        </div>
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row my-12 justify-between text-">
            <div className="w-[100%] lg:w-[32%] md:w-[32%] p-6 bg-[#060E37] rounded-lg mb-4">
              <p className=" text-white text-[15px] font-normal text-justify">
                ThriftChain leverages blockchain technology for enhanced
                security and transparency. Smart contracts are used for
                automated savings and contribution management, creating an
                immutable ledger for transaction history and saving activities.
                The use of blockchain ensures that users can trust the with
                their financial transactions and contributes to the overall
                reliability and security of the service.
              </p>
            </div>
            <div className="w-[100%] lg:w-[32%] md:w-[32%] p-6 bg-[#060E37] rounded-lg mb-4">
              <p className=" text-white text-[15px] font-normal text-justify">
                ThriftChain integration of blockchain technology ensures that
                all transactions, savings activities, and contributions are
                recorded on an immutableledger. This ledger is transparent and
                can be audited by users, providing a high level of trust and
                accountability. Users can verify their financial activities,
                contributing to a secure and transparent financial ecosystem.
              </p>
            </div>
            <div className="w-[100%] lg:w-[32%] md:w-[32%] p-6 bg-[#060E37] rounded-lg mb-4">
              <p className=" text-white text-[15px] font-normal text-justify">
                The use of smart contracts in ThriftChain automates various
                aspects of the platform. Smart contracts manage individual and
                group-based savings, including the deduction of funds from users
                wallets, tracking progress, and releasing savings upon maturity.
                This automation reduces the need for manual intervention,
                increasing efficiency and reliability in the savings process.
              </p>
            </div>
          </div>

         
      </div>
    </div>
  );
};

export default About;
