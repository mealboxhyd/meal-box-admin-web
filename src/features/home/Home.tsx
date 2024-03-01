import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HOME_SETTINGS } from "../../constants/route.constants";
import { useState } from "react";

export default function Home() {

  const [name,setName] = useState("Vishnu");


  const navigate = useNavigate();

  return <div>
   
    <h1>Welcome {name}</h1>


    <Button color="secondary" variant='contained' onClick={()=>setName("Ajay")}>Change Name</Button>
    <br/>
     <Button color="secondary" variant='contained' style={{marginTop:"1rem"}}
    onClick={()=>navigate(HOME_SETTINGS)}
    >Go to Settngs</Button>
  </div>;
}
