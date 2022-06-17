import React, { useState} from "react";
import "./Staff.css";
import Axios from 'axios';
import image from './homepage.jpg'
import { useHistory } from "react-router-dom";

function Staff(){

    const history = useHistory();

    const [UsernameReg, setUsernameReg] = useState('');
    const [newUsernameReg, setNewUsernameRegReg] = useState('');

    const [ deleteName, setdeleteName] = useState("");
    const [ deletePassword, setDeletePassword] = useState("");

    const editStaff = () =>{
        Axios.post("http://localhost:3001/editStaff",{
            name: UsernameReg,
            newName: newUsernameReg,
        }).then(() => {
            alert("Changed Username");
        });
    }

    const deleteStaff = () =>{
        Axios.post("http://localhost:3001/deleteStaff",{
            name: deleteName,
            password: deletePassword,
        }).then(() => {
            alert("Deleted User");
            history.push('/')
        });
    }

    const navLog = () => {
        history.push('/Log');
    }
    const navCust = () => history.push('/Home');
    const navLogin = () => history.push('./');

    return (
        <div className="Home">
            <div>
                <h1>End Child Food Poverty</h1>
                <div className="nav" >
                <button  onClick={navCust}>Customers</button>
                <button  onClick={navLog}> Log</button>
                <button  onClick={navLogin}> Login</button>
                </div>
                <div className="image">
                <img src={image} alt={""}/>
                </div>
                <div className="text">
                    <p>To help support families most in need across the Saskatoon,<br></br>
                         The Child Food Poverty Taskforce has now launched an online registration portal where people can register,<br></br>
                          or find out how to help charities, in their local area.</p>
                </div>
            </div>

            <div className="editStaff">
            <h2>Edit Staff</h2>
                <label>Username: </label>
                    <input type="text" name= "customerId" onChange={(e) => {
                        setUsernameReg(e.target.value)
                }}/>
                <label>New Username: </label>
                <input type="text" name= "customerName" onChange={(e) => {
                    setNewUsernameRegReg(e.target.value)
                }}/>
                <button className="Update" onClick={editStaff}>Update</button>
            </div>

            <div className="delete">
            <h2>Delete Staff </h2>
                <label>Username: </label>
                    <input type="text" name= "customerId" onChange={(e) => {
                        setdeleteName(e.target.value)
                }}/>
                <label>Password: </label>
                    <input type="password" name= "customerId" onChange={(e) => {
                        setDeletePassword(e.target.value)
                }}/>
        
                <button className="Delete" onClick={deleteStaff}>Delete</button>
            </div>


        </div>
    )
}

export default Staff;