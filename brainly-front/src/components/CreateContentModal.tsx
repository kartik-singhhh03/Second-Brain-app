//contoller component

import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    
}

export function CreatComponentModal({open, onClose}){
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const[type, setType] = useState(ContentType.Youtube);

   async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type
        },{
headers: {
    "Authorization": localStorage.getItem("token") 
}

        })

        onClose();


    }





return <div>

  {open && <div>




  <div className ="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
   

    </div>
     <div className ="w-screen h-screen  fixed top-0  left-0  flex justify-center">
   
  <div className="flex
    flex-col justify-center">

    <span className="bg-white opacity-100 p-4 rounded fixed">
<div className="flex justify-end">
    <div onClick={onClose}  className="cursor-pointer" >   <CrossIcon/> </div>
 


</div>
<div>
    <Input reference={titleRef} placeholder={"Title"} />
    <Input reference={linkRef} placeholder={"Link"} />
</div>
<h1>Type</h1> 
<div className="flex  gap-1 justify-center pb-2" >
<Button size="medium" text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)}></Button>
<Button size="medium" text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)}></Button>
 <div className="flex justify-center">
<Button onClick={addContent} size="medium" variant="primary" text="Submit"></Button>
</div>
</div>

    </span>
    </div>
    </div>
   

     </div>}
    
   
</div>
}
