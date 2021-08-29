import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Header from "../../Common/Header";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Apiauth from '../../Services/User.js'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const customStyles2 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};
const Dashboard = () => {
  const [Viewmodel, setViewmodel] = useState(false);
  const [Deletemodel, setDeletemodel] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [userdatacount, setUserdatacount] = useState(0);
  const [ModelTitle, setModelTitle] = useState("");
  const [auth, setauth] = useState(true);
  //fields
  const [userid, setUserid] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phnumber, setPhnumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    Apiauth.getallusers()
      .then((response) => {
        setUserdata(response.data)
        setUserdatacount(response.data.length)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const openModal = (title, item) => {
    setUserid(item.id)
    setFirstname(item.firstname)
    setLastname(item.lastname)
    setGender(item.gender)
    setEmail(item.email)
    setPhnumber(item.mobilenumber)
    setAddress(item.address)
    if (title == "View") {
      setauth(true);
      setModelTitle("View");
      setViewmodel(true);
    } else {
      setauth(false);
      setModelTitle("Edit");
      setViewmodel(true);
    }
  };

  const closeModal = () => {
    setViewmodel(false);
  };

  const opendeleteModel = (item) => {
    setDeletemodel(true);
  };
  const closedeleteModel = () => {
    setDeletemodel(false);
  };
  const Updateuser = () => {
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
        setViewmodel(false)
        getUser()
      })
      .catch((error) => {
        alert(error)
      })
  };
  const deleteUser = () => {
    Apiauth.deleteuser(userid)
      .then((response) => {
        setDeletemodel(false);
        getUser()
      })
      .catch((error) => {
        alert(error)
      })
  };

  return (
    <section>
      <Header title={"Dashboard"}></Header>
      <section>
        <div className="container mt-3">
          <div className="card shadow-sm card-pad">
            <div className="d-flex justify-content-between">
              <span>Total Users</span>
              <span>{userdatacount}</span>
            </div>
          </div>
          <section className="mt-3">
            <div className="card shadow-sm card-table">
              <span className="mb-2 ml-2">Users</span>
              <div class="table-responsive-sm">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile Number</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userdata.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{item.firstname}</td>
                          <td>{item.lastname}</td>
                          <td>{item.email}</td>
                          <td>{item.mobilenumber}</td>
                          <td>
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary btn-sm dropdown-toggle btn-action"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a
                                    class="dropdown-item"
                                    onClick={() => openModal("View", item)}
                                  >
                                    View
                                  </a>

                                </li>
                                <li>
                                  <a
                                    class="dropdown-item"
                                    onClick={() => openModal("Edit", item)}
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item"
                                    onClick={() => opendeleteModel(item)}
                                  >
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                    }
                  </tbody>
                </table>
                <Modal
                  isOpen={Viewmodel}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <div className="row">
                    <div className="d-flex justify-content-between">
                      <span className="mb-2 ml-2">
                        {ModelTitle}
                      </span>
                      <AiOutlineCloseCircle
                        size={24}
                        onClick={() => closeModal()}
                        className="close"
                      />
                    </div>
                    <div className="col-12 col-md-4 ">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
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
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
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
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
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
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
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
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
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
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
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
                    {!auth && (
                      <div className="col-12 col-md-12 d-flex justify-content-end">
                        <button
                          type="button"
                          class="btn btn-outline-secondary btn-save"
                          onClick={() => Updateuser()}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </Modal>
                <Modal
                  isOpen={Deletemodel}
                  style={customStyles2}
                  contentLabel="Example Modal"
                >
                  <div class="modal-header">
                    <h5 class="modal-title">Delete User !</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => closedeleteModel()}
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p>
                      Are you sure you want to delete this user?
                    </p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => closedeleteModel()}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-delete"
                      data-bs-dismiss="modal"
                      onClick={() => deleteUser()}
                    >
                      Yes
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
