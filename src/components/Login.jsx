import React, { useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const [inputData, setInputData] = useState({
        login_id : '',
        password : ''
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:5000/login`, inputData);
            const token = response.data.token;
           
    
            if (response.status === 200) {
                toast.success(' Logged In 💻', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            
                    window.location.href = "/customerlist?token=" + token;
               
            } else {
                alert('Failed to login'); 
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div style={{ marginTop: "8%", marginLeft: "27%" }} className='col-md-4'>
                        <label style={{ fontSize: "30px", fontWeight: "600" }}>Login</label>
                        <form className='mt-5'>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    name="login_id"
                                    onChange={handleInputChange}
                                    value={inputData.login_id}
                                    aria-describedby="emailHelp"
                                />
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    name='password'
                                    onChange={handleInputChange}
                                    value={inputData.password}
                                />
                            </div>

                            <button onClick={handleSubmit} type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
