import React, { useState} from "react";
import "./Home.css";
import Axios from 'axios';
import image from './homepage.jpg'
import { useHistory } from "react-router-dom";


function Home(){

    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [ customerReport, setCustomerReport] = useState("");

    const [ updateId, setupdateId] = useState("");
    const [ updateReport, setupdateReport] = useState("");

    const [ deleteId, setdeleteId] = useState("");


    const registerCustomer = () => {
        Axios.post("http://localhost:3001/registerCustomer",{
            id: customerId,
            name: customerName,
            report: customerReport,
        }).then(() => {
            alert("Customer Registered");
        });
    };

    const updateCustomer = () => {
        Axios.post("http://localhost:3001/updateCustomer",{
            id: updateId,
            report: updateReport,
        }).then(() => {
            alert("Report Updated");
        });
    };

    const deleteCustomer = () => {
        Axios.post("http://localhost:3001/deleteCustomer",{
            id: deleteId,
        }).then(() => {
            alert("Customer Deleted");
        });
    };

    const history = useHistory();

    const navStaff = () => history.push('/Staff');
    const navLog = () => history.push('./Log');
    const navLogin = () => history.push('./');

    return(
        <div className="Home">
            <div>
                <h1>End Child Food Poverty</h1>
                <div className="nav" >
                <button  onClick={navStaff}> Edit Staff</button>
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
            <div className="customers">
            <h2>Register Customer</h2>
                <label>Customer Number: </label>
                    <input type="text" name= "customerId" onChange={(e) => {
                        setCustomerId(e.target.value)
                }}/>
                <label>Customer Name: </label>
                <input type="text" name= "customerName" onChange={(e) => {
                    setCustomerName(e.target.value)
                }}/>
                <label>Customer Report: </label>
                <div className="customerReport">
                <input type="text" name= "customerReport" onChange={(e) => {
                    setCustomerReport(e.target.value)
                }}/></div>
                <button className="register" onClick={registerCustomer}>Register</button>
            </div>

            <div className="update">
            <h2>Update Customer Report</h2>
                <label>Customer Number: </label>
                    <input type="text" name= "updateId" onChange={(e) => {
                        setupdateId(e.target.value)
                }}/>
            
                <label>Customer Report: </label>
                <div className="customerReport">
                <input type="text" name= "customerReport" onChange={(e) => {
                    setupdateReport(e.target.value)
                }}/></div>

                <button className="Update" onClick={updateCustomer}>Update</button>
            </div>

            <div className="delete">
            <h2>Delete Customer </h2>
                <label>Customer Number: </label>
                    <input type="text" name= "customerId" onChange={(e) => {
                        setdeleteId(e.target.value)
                }}/>
        

                <button className="Delete" onClick={deleteCustomer}>Delete</button>
            </div>


        </div>

        
    )
}

export default Home;