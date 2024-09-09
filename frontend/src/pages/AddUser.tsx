import React from "react";
import AddUser from "../Components/AddNewUser";
import { Container } from "@mui/material";


const AddUserPage:React.FC = () => {
    return (
        <Container item xs={6} md={12} >
            <AddUser />
        </Container>
    )
}

export default AddUserPage;