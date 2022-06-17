import React, { useState} from "react";
import "./Staff.css";
import Axios from 'axios';
import { useHistory } from "react-router-dom";

function Log(){

    const history = useHistory();

    const [customerList, setCustomerList] = useState([]);
    const [StaffList, setStaffList] = useState([]);



    const getCustomer = () =>{
        console.log("lol");
        Axios.get("http://localhost:3001/getCustomers").then(response => {
            setCustomerList(response.data)
        });
    };

    const getStaff = () =>{
        console.log("lol");
        Axios.get("http://localhost:3001/getStaff").then(response => {
            console.log(response);
            setStaffList(response.data)
        });
    };

    const navCust = () => history.push('/Home');
    const navStaff = () => history.push('/Staff');
    const navLogin = () => history.push('./');

    return(

        <div className="Home">
            <div>
                <h1>End Child Food Poverty</h1>
                <div className="nav" >
                <button  onClick={navCust}>Customers</button>
                <button  onClick={navStaff}> Edit Staff</button>
                <button  onClick={navLogin}> Login</button>
                </div>
            </div>
                <button onClick={getCustomer}>Show Customer Log</button>
            {customerList.map((val, key) => {
                return <div className="customerLog"><h3>{val.customerID}{" "}{val.customerName} {val.report}</h3></div>
            })}
            <button onClick={getStaff}>Show Staff Log</button>
            {StaffList.map((val, key) => {
                return <div className="customerLog"><h3>{val.username}</h3></div>
            })}
        </div>
    )
}

export default Log;