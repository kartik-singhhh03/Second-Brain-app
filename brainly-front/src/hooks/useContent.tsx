import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config"; // make sure you have this

export function useContent() {
  const [contents, setContents] = useState<any[]>([]);

  function refresh() {
     axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((err) => {
        console.error("Error fetching contents:", err);
      });
  }

  useEffect(() => {

    refresh();
   

    let interval =  setInterval(() => {
        refresh();


      }, 10* 1000)


      

      return () => {
        clearInterval(interval);
      }
  }, [])

  return {contents, refresh};
}
