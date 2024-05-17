import  { useState, useEffect } from "react";
import axios from "axios";
import SuccessPage from "../components/SuccessPage";
import { Navigate } from "react-router-dom";

const OnboardingData = () => {
    const [formData, setFormData] = useState({


    });


    const [isLoading, setIsLoading] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [isLoginFail, setIsLoginFail] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);


    useEffect(() => {
        if (isLoginSuccess) {
            const redirectTimer = setTimeout(() => {
                setIsRedirecting(true); // Start redirecting after 2.5 seconds
            }, 3000);

            return () => clearTimeout(redirectTimer);

        }
    }, [isLoginSuccess]);

    useEffect(() => {
        if (isLoginFail) {
            const redirectTimer = setTimeout(() => {
                setIsRedirecting(true); // Start redirecting after 2.5 seconds
            }, 3000);

            return () => clearTimeout(redirectTimer);

        
        }
    }, [isLoginFail]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {

            const response = await axios.post(
                "https://thriftchain.onrender.com/waitlist/joinwaitlist", { email: formData }

            );
            console.log(response)

            if (response.data.message === "You have been successfully added to the waitlist") {
                console.log("Registration successful");
                setIsLoginSuccess(true);
                setIsLoading(false);
            } else if (response.data.message === "Email already exists in the waitlist") {
                console.log("Registration failed");
                setIsLoginFail(true);
                setIsLoading(false);
            } else {
                console.log("Registration failed");
                setIsLoading(false);
            }
        }
        catch (error) {
            if (error.response.data.message === "Email already exists in the waitlist") {
                console.log("Registration failed");
                setIsLoginFail(true);
                setIsLoading(false);
            }
            console.log(error);
            setIsLoading(false);
        }
    };




    const handleChange = (e) => {
        setFormData(e.target.value);
    };


    return (
        <>
            {isRedirecting ? ( // Conditional rendering for redirecting
                <Navigate to="/log-in" /> // Replace with the actual home page route
            ) : isLoginSuccess ? (
                <SuccessPage text="Thank you for Joining the waitlist, you will be notified" /> // Replace with the actual successPage component
            ) : isLoginFail ? (
                <SuccessPage text="This email already exist!" /> // Replace with the actual successPage component
            ) : (

                <main className="bg-[#070624] w-screen">
                    <h1 className="text-[28px] md:text-[34px] lg:text-[34px] font-bold capitalize  text-white md:mx-96 md:mt-20 sm:mt-10 md:px-16 sm:mx-4 px-4">
                        Welcome to ThriftChain:{" "}
                    </h1>
                    <h2 className="text-[28px] md:text-[34px] lg:text-[34px] mb-4 font-bold capitalize text-[#BD5FB8] md:mx-96 md:px-12 sm:mx-4 px-4">
                        Get ready for  <span className="text-[#BD5FB8]">Something big!</span>
                    </h2>
                    <div className="md:mx-96 md:px-24 mb-2">

                        <div className="border-2 border-white bg-[#070624] rounded-lg mb-6 sm:mb-0 md:w-[340px] md:h-[400px] sm:w-[280px]">
                            <h2 className="text-white text-sm  text-center font-normal mt-2">
                                Thriftchain is a decentralized platform created to
                                <br />  make savings, contributions and goal
                                <br /> achievement possible for individuals and
                                <br /> groups
                            </h2>

                            <form onSubmit={handleSubmit} className="bg-[#070624] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <div className="mb-1">
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Email Address
                                    </label>
                                    <input className="bg-[#B1B7DD] border-[#B1B7DD] rounded w-full py-2 px-3 text-[#0A134C] leading-tight focus:outline-none focus:shadow-outline" id="emailaddress" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} ></input>
                                </div>
                                <button className="bg-gradient-to-r from-[#9C0F94] to-[#142698] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button" onClick={handleSubmit}>
                                    {isLoading ? 'Loading...' : 'Notify me'}
                                </button>

                            </form>

                        </div>
                    </div>


                    <hr />
                </main>
            )}
        </>

    );
};

export default OnboardingData;
