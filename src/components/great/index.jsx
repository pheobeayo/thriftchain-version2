const Great = () => {
  return (
    <div className="bg-[#070624] ">
      <div className="container mx-auto px-4 sm:px-[80px] py-[100px]">
        <h2 className="text-white text-3xl pb-[48px] font-bold leading-10">
          ThriftChain is great for:
        </h2>
        <div className="bg-[#070624] grid-cols-4 gap-4 md:flex md:flex-row">
          <div className="mx-3 mt-6 flex flex-col rounded-lg bg-[#060E37] sm:shrink-0 sm:grow sm:basis-0 border-white border-2">
            <div className="w-full h-1/2 shadow-md mx-2">
              <h3 className="font-bold text-white text-lg mx-4">
                Individual Savers
              </h3>
              <p className="font-normal text-justify text-white text-sm sm:p-4">
                Individuals looking to save for specific goals and
                <br></br>earn interest on their savings.
              </p>
            </div>
          </div>

          <div className="mx-3 mt-6 flex flex-col rounded-lg bg-[#060E37] sm:shrink-0 sm:grow sm:basis-0 border-white border-2">
            <div className="w-full h-1/2  shadow-md mx-2">
              <h3 className="font-bold text-white text-lg mx-4">
                Group Savers
              </h3>
              <p className="font-normal text-justify text-white text-sm sm:p-4">
                Communities, organizations, or friends with
                <br></br>shared financial objectives, such as purchasing
                <br></br>assets collectively or achieving specific targets.
              </p>
            </div>
          </div>
          <div className="mx-3 mt-6 flex flex-col rounded-lg bg-[#060E37] sm:shrink-0 sm:grow sm:basis-0 border-white border-2">
            <div className="w-full h-1/2 shadow-md mx-2">
              <h3 className="font-bold text-white text-lg mx-4">
                Asset Managers
              </h3>
              <p className="font-normal text-justify text-white text-sm sm:p-4">
                Professionals responsible for overseeing and
                <br></br>managing diverse assets within the platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Great;
