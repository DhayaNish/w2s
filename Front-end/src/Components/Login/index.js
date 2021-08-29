import React, { useState } from "react";
import './login.css';
import logo from '../../Asserts/logo_2.png'
import { useHistory } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { FaUserLock } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { BiMailSend } from "react-icons/bi";
import { BiUserPlus } from "react-icons/bi";
import { BiUserMinus } from "react-icons/bi";
import { BiPhone } from "react-icons/bi";
import Apiauth from '../../Services/User.js'

const Login = () => {
    let history = useHistory();
    //auth
    const [auth, setauth] = useState(true)
    //login
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginfailed, setloginfailed] = useState(false)
    //signup
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [signupemail, setSignupemail] = useState("")
    const [mobilenumber, setMobilenumber] = useState("")
    const [signuppassword, setSignuppassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [passwordnotmatch, setPasswordnotmatch] = useState(false)


    const login = () => {
        let data = {
            "email": email,
            "password": password
        }
        Apiauth.login(data)
            .then((response) => {
                var token=response.data.token
                localStorage.setItem("token",token)
                history.push('/Dashboard')
            })
            .catch((error) => {
                setloginfailed(true)
            })
    }
    const signup = () => {
        if(signuppassword!=confirmpassword){
            setPasswordnotmatch(true)
        }
        else if(firstname && lastname && signupemail && mobilenumber && signuppassword){
        let data = {
            "firstname": firstname,
            "lastname": lastname,
            "email":signupemail,
            "mobilenumber":mobilenumber,
            "password":signuppassword
        }
        Apiauth.register(data)
        .then((response) => {
             setauth(true)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    else{
        alert("Please the fields.")
    }
    }
    return (
        <section>
            <div className="login-img">
                <div className="containers">
                    {auth ?
                        <div class="card card-pad">
                            <img src={logo} alt="logo" className="logo-img" />

                            <form className="mt-2 mb-2">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-user"><FaUserCircle /></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value);setloginfailed(false)}} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-lock"><FaLock /></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value);setloginfailed(false)}} />
                                </div>
                                {loginfailed &&
                                <div className="login-failure">Invalid Email or Password.</div>
                                }
                               <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary btn-block" onClick={() => login()}>Login</button>
                                </div>
                                <div className="message mt-2">
                                    <div>New User?</div>
                                    <div><a href="#" onClick={() => {setauth(false);setPasswordnotmatch(false)}}>Signup</a></div>
                                </div>
                            </form>
                        </div>
                        :
                        <div class="card card-pad">
                            <img src={logo} alt="logo" className="logo-img" />
                            <form className="mt-2 mb-2">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-user"><BiUserPlus /></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="First Name" value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-user"><BiUserMinus /></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Last Name" value={lastname} onChange={(e)=>setLastname(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-user"><BiMailSend /></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Email" value={signupemail} onChange={(e)=>setSignupemail(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-user"><BiPhone /></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Mobile Number" value={mobilenumber} onChange={(e)=>setMobilenumber(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-lock"><FaLock /></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Password" value={signuppassword} onChange={(e)=>setSignuppassword(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-lock"><FaUserLock /></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Confirm Password" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} />
                                </div>
                                {passwordnotmatch &&
                                <div className="login-failure">Password don't match.</div>
                                }
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary btn-block" onClick={() => signup()}>Signup</button>
                                </div>
                                <div className="message mt-2">
                                    <div>Already Have account?</div>
                                    <div><a href="#" onClick={() => {setauth(true);setloginfailed(false)}}>Login</a></div>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default Login;