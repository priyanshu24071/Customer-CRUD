import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink,useLocation } from 'react-router-dom';

const Registeration = () => {
    
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    const [inputData, setInputData] = useState({
        first_name: '',
        last_name: '',
        street: '',
        address: '',
        city: '',
        state: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/createuser/${token}`, inputData);
            

            if (response.status === 201) {
                toast.success('Customer successfully created 😅', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })
               
            } else{
                toast.error(' Server Error ', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        } catch (error) {
            toast.warn('Please Enter First and last name 😲', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
           
        }
    };



    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div style={{ marginTop: "6%", marginLeft: "30%" }} className='col-md-5'>
                        <label style={{ fontSize: "30px", fontWeight: "600" }}>Customer Details</label>
                        <form method='post' class="row g-3 mt-5">
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">First Name</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="First name"
                                    aria-label="First name"
                                    name='first_name'
                                    onChange={handleInputChange}
                                    value={inputData.first_name}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Last Name</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="Last name"
                                    aria-label="Last name"
                                    name='last_name'
                                    onChange={handleInputChange}
                                    value={inputData.last_name}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Street</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="Street"
                                    aria-label="Street"
                                    name='street'
                                    onChange={handleInputChange}
                                    value={inputData.street}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Address</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="Address"
                                    aria-label="Address"
                                    name='address'
                                    onChange={handleInputChange}
                                    value={inputData.address}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">City</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="City"
                                    aria-label="City"
                                    name='city'
                                    onChange={handleInputChange}
                                    value={inputData.city}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">State</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="State"
                                    aria-label="State"
                                    name='state'
                                    onChange={handleInputChange}
                                    value={inputData.state}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="Email"
                                    aria-label="Email"
                                    name='email'
                                    onChange={handleInputChange}
                                    value={inputData.email}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Phone</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="Phone"
                                    aria-label="Phone"
                                    name='phone'
                                    onChange={handleInputChange}
                                    value={inputData.phone}
                                />
                            </div>
                            <div class="col-12">
                                <button onClick={handleSubmit} type="submit" class="btn btn-primary">Submit</button>     <NavLink to="/customerlist"><button  type="submit" class="btn btn-secondary">Get Customer List</button></NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registeration