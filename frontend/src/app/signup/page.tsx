"use client"

import { useState } from "react";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";


type SignInResponse = {
  message: string
};
export default function Home(){
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const router = useRouter();

  async function signupHandler(): Promise<void> {
      try{
        await axios.post<SignInResponse>("http://localhost:3000/api/signup",{
          email,
          password
        });

        router.push("/dashboard");
      }
      catch(error){
        if (error.response?.data?.message){
          alert(error.response.data.message);
        }else{
          alert("Something went wrong. Please try again.");
        }

        console.error("Login error:", error);
      }
  }

  return (
    <div className="bg-gray-300 flex justify-center items-center h-screen">
      <div className="bg-white m-2 p-8 rounded-lg min-w-[23%] flex flex-col">
        <div className="text-4xl font-bold flex justify-center items-center bg-yellow-400 rounded-lg p-4">Welcome to TinyURL!</div>
        <div className="text-2xl mt-5 font-bold flex flex-col">
            <div className="flex items-center">
              <label className="mr-2 w-30">Email:</label>
              <input 
                className="flex-1 m-2 font-normal text-xl bg-gray-200 rounded-sm p-2 pl-4 placeholder-gray-400 opacity-90" 
                placeholder="eg: xyz@gmail.com"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label className="mr-2 w-30">Password:</label>
              <input 
                className="flex-1 m-2 font-normal text-xl bg-gray-200 rounded-sm p-2 pl-4 opacity-90"
                value = {password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button 
              className="bg-yellow-400 rounded-lg p-2 font-bold text-white mt-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
              onClick={signupHandler}
            >
              Sign up
            </button>
            <div className="text-sm font-normal mt-2 flex">
              Already have an account?
              <Link href="/">
                <div className="ml-1 underline hover:cursor-pointer">Sign in</div>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
