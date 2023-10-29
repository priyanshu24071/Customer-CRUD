import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink,useLocation } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const GetListCustomer = () => {
    
    const [customer, setCustomer] = useState([]);
    const [isDataLoaded, setDataLoaded] = useState(false);

    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

// ================================get all customer==================================================
    const getAllCustomer = async () => {

  

        try {
            const response = await axios.get(`http://localhost:5000/getallcustomer/${token}`);
            setCustomer(response.data);
           

            if (response.status === 200) {
                toast.success(' All Customer Fetched 😄', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    toastId: "priyanshu0842",
                    theme: "colored",
                    });
            } else {
                console.log('Failed to fetch data');
            }
        } catch (error) {
            console.error(error);
            console.log('An error occurred');
        }
    }



// ================================Update the user==================================================
    const updateUser = async (uuid) => {
        try {

            const alldata = {
                first_name: "Janeeeeeeeeeee",
                last_name: "Doe",
                street: "Elvnu Street",
                address: "H no 2",
                city: "Delhi",
                state: "Delhi",
                email: "sam@gmail.com",
                phone: "12345678"
            };

            const response = await axios.post(`http://localhost:5000/updateuser/${uuid}/${token}`, alldata);

            if (response.status === 200) {
                toast.success('Updated Successfully 😄', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

            } else if (response.status === 500) {
                toast.warn('UUID not Found', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else if (response.status === 400) {
                toast.warn('No Data!! ', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }  else {
                
                toast.danger('Update failed', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        } catch (error) {
            toast.danger('An Error Occured', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }




// ================================Delete The Customer==================================================
    const deleteCustomer = async (uuid) => {
        try {
            const response = await axios.post(`http://localhost:5000/deleteuser/${uuid}/${token}`);

            if (response.status === 200) {
                toast.success('Deleted !!! 😄', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

            } else if (response.status === 500) {
                toast.error('Not Deleted??', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else if (response.status === 400) {
                toast.warn('UUID not Found', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else {
                toast.error('Unkown Error Occured', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        } catch (error) {  
            toast.error('An Error Occured', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }



    useEffect(() => {
        if (!isDataLoaded) {
            getAllCustomer();
        }
    }, [isDataLoaded]);

    return (
        <div className='container'>
            <div className='row'>
                <div style={{ marginTop: "10%", marginLeft: "10%" }} className='col-md-10'>
                    <label style={{ fontSize: "30px", fontWeight: "600" }}>Customer List </label>
                    <NavLink to={`/register?token=${token}`}>
                        <button type="button" class="btn btn-primary ms-2 mb-3">Add Customer</button>
                    </NavLink>
                    <div className='mt-5' style={{ height: "400px", overflow: "auto" }}>
                        {customer.length === 0 ? ( // Check if the 'customer' array is empty
                            <div>
                                <p>No data available or  wait for 10 seconds</p>
                                <NavLink to="/"><button className='btn btn-primary'>Login Again</button></NavLink>
                            </div>
                        ) : (
                            <table className="table table-striped rounded">
                                <thead className='table-primary'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">City</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Update</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.map((customer, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{customer.first_name}</td>
                                            <td>{customer.last_name}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.city}</td>
                                            <td>{customer.state}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    class="btn btn-success"
                                                    onClick={() => updateUser(customer.uuid)}
                                                >
                                                    Update
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteCustomer(customer.uuid)}
                                                    class="btn btn-danger"
                                                >
                                                    <i class="bi bi-pencil-square"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetListCustomer;