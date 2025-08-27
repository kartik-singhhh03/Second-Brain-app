import { ShareIcon } from "../icons/shareIcon";

function getYouTubeVideoID(url) {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*)/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
}


interface CardProps {
    title: string;
    link: string;
    type: "twitter"| "youtube";
}

export function Card({title, link , type}: CardProps){

    return <div>  <div className ="bg-white p-4 rounded-md shadow-md border-gray-100 max-w-72 border min-h-48 min-w-72  ">

<div className = "flex justify-between">

    <div className="flex items-center gap-2 text">
        <ShareIcon/>
       {title}
    </div>
    <div className ="flex">
    <div className="flex items-center pr-2 text-gray-500"> <a href={link} target ="_blank">
        <ShareIcon/>
        </a>
        </div>
         <div className="flex items-center pr-2 text-gray-500">
        <ShareIcon/>
        </div>
        </div>

    
</div>
 <div className ="pt-4">
   {type === "youtube" && (() => {
  const id = getYouTubeVideoID(link);
  if (!id) return <p>Invalid YouTube link</p>;

  return (
    <iframe
      className="w-full"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
})()}

{type === "twitter" && <blockquote className="twitter-tweet">
  <a href={link.replace("x.com", "twitter.com")}></a> 
</blockquote> }


</div>
    </div>
    </div>
}