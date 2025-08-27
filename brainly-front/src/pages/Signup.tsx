import { Input } from "../components/Input";
import { Button } from "../components/button";
import { useRef } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup(){
    
      const usernameRef = useRef<HTMLInputElement>();
      const passwordRef = useRef<HTMLInputElement>();
      const navigate = useNavigate();


    async function Signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

    
await axios.post(BACKEND_URL + "/api/v1/signup", {

    
        username,
        password
    
})
navigate("/Signin")
alert("Signup Successful ")


    }


    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">

        <div className="bg-white rounded-xl border min-w-48 p-8">

<Input reference ={usernameRef} placeholder="Username" />
<Input reference={passwordRef} placeholder="Password" />
<div className="flex justify-center">
<Button onClick={Signup} loading={false} variant="primary" text="Signup" fullWidth={true}/>
</div>
        </div>

    </div>
}