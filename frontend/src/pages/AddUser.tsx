import React from "react";
import AddUser from "../Components/AddNewUser";
import { Container } from "@mui/material";
import Left from "../Containers/Left";
import Right from "../Containers/Right";
import Middle from "../Containers/Middle";

const AddUserPage:React.FC = () => {
    return (

        <Container item xs={6} md={12} >
            <Left/>
            <Middle>
                <AddUser />
            </Middle>
        </Container>
    )
}

export default AddUserPage;