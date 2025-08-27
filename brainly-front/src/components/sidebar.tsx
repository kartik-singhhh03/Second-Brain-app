import { LogoIcon } from "../icons/Logo"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SidebarItem } from "./sidebarItem"


export function Sidebar(){

    return <div className="h-screen bg-white border-r border-gray-300 w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">

            <div className="pr-2 text-purple-700">
            <LogoIcon/>
            </div>
            Brainly
        </div>

<div className="pt-8 pl-4">
    
<SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
<SidebarItem text="Youtube" icon={<YoutubeIcon/>}/>


</div>
    </div>
}