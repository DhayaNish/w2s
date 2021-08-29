import React, { useState,useEffect } from "react";
import "./profile.css";
import Header from "../../Common/Header";
import user from "../../Asserts/user.png";
import Apiauth from '../../Services/User'

const Profile = () => {
  const [auth, setauth] = useState(true);
  const [userid, setUserid] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phnumber, setPhnumber] = useState('');
  const [address, setAddress] = useState('');
  
  useEffect(() => {
    getusers()
  }, [])

  const getusers=()=>{
    Apiauth.getuser()
    .then((response)=>{
     setUserid(response.data.id)
     setFirstname(response.data.firstname)
     setLastname(response.data.lastname)
     setGender(response.data.gender)
     setEmail(response.data.email)
     setPhnumber(response.data.mobilenumber)
     setAddress(response.data.address)
    })
    .catch((error)=>{
    alert(error)
    })
  }

  const profileedit = () => {
    setauth(!auth);
  };
  const profilesave = () => {
    let data = {
      "firstname": firstname,
      "lastname": lastname,
      "gender": gender,
      "email": email,
      "mobilenumber": phnumber,
      "address": address
    }
    Apiauth.updateuser(userid, data)
      .then((response) => {
        getusers()
        setauth(!auth);
      })
      .catch((error) => {
        alert(error)
      })
    setauth(!auth);
  };
  return (
    <section>
      <Header title={"Profile"}></Header>
      <section>
        <div className="container space-content">
          <div className="row">
            <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3">
              <div className="card shadow-sm">
                <img src={user} alt="user" />
              </div>
            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-9">
              <div className="card shadow-sm card-pad">
                <div className="row">
                  <div className="col-12 col-md-12 d-flex justify-content-end">
                    {auth ? (
                      <button
                        type="button"
                        class="btn btn-outline-secondary btn-auth"
                        onClick={() => profileedit()}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        type="button"
                       class="btn btn-outline-secondary btn-auth"
                        onClick={() => profilesave()}
                      >
                        Save
                      </button>
                    )}
                  </div>
                  <div className="col-12 col-md-4 ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        First Name
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="-"
                        disabled={auth}
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4 ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Last Name
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="-"
                        disabled={auth}
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4 ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Gender
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        placeholder="-"
                        disabled={auth}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option selected value="-">
                          -
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="-"
                        disabled={auth}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12 ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Mobile Number
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="-"
                        disabled={auth}
                         value={phnumber}
                        onChange={(e) => setPhnumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12 ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Address
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="-"
                        disabled={auth}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Profile;
