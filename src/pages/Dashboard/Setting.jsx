
const Setting = () => {
  return (
    <main className="bg-[#070624] w-screen">
      <div className="container mx-auto sm:px-[80px] py-[100px]">
        <h1 className='text-white font-serif font-bold mx-20 text-lg'>Make Your Settings here</h1>
        <form className="mx-20 md:28 mt-8 w-1/2" >
          <div className="mb-2">
            <label
              className="block text-white text-base font-bold mb-2"
            >
              Add or Change Email address
            </label>
            <input
              className="bg-white border-[#06214A] border-2 rounded w-full py-2 px-3 text-[#06214A] leading-tight focus:outline-none focus:shadow-outline"
              id="emailaddress"
              type="email"
              placeholder="Add or Change your email address"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-white text-base font-bold mb-2"

            >
              Add or Change Password
            </label>

            <input
              className="bg-white border-[#06214A] border-2 rounded w-full py-2 px-3 text-[#06214A] leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-white text-base font-bold mb-2"

            >
              Add or Change the Thrift Type
            </label>
            <input
              className="bg-white border-[#06214A] border-2 rounded w-full py-2 px-3 text-[#06214A] leading-tight focus:outline-none focus:shadow-outline"
              id="thrifttype"
              type="text"
              placeholder="add or change the thrift type"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-white text-base font-bold mb-2"

            >
              Add or Change Reasons for thrift
            </label>
            <input
              className="bg-white border-[#06214A] border-2 rounded w-full py-2 px-3 text-[#06214A] leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              type="text"
              placeholder="add or change reasons for thrift"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-8 py-2 mb-2 font-semibold rounded-lg text-white bg-[#9C0F94] hover:bg-[#070624]"
            >
              Make Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Setting;