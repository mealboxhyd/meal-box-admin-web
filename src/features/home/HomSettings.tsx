import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { HOME_ROUTE } from "../../constants/route.constants";

export const HomSettings = () => {
    const navigate = useNavigate();
    return (
        <div>
                <Button variant="contained" color="secondary"
                onClick={()=>navigate(HOME_ROUTE)}
                >Go Back To Home</Button>
        </div>
    )
}