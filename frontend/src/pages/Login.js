import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){

    const navigate = useNavigate();
    const [email ,setEmail] = useState("");
    const [password , setPassword] = useState("");

    const login = (e) => {
        //api req
        e.preventDefault();
        axios.post("http://localhost:5000/api/login",{email:email,password:password}).then(res =>{
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            navigate("/");
        }).catch((err) => {
            alert(err.response.data.message);
        })
        navigate("/");
    }

    return(
        <div className="d-flex justify-content-center" style={{marginTop:"20px"}}>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                    <h1 className="text-center"> Login Page </h1>
                </div>
                <div className="card-body">
                    <form autoComplete="off" onSubmit={login}>
                        <div className="form-group">
                            Email
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required email="true" className="form-control"></input>
                        </div>
                        <div className="form-group mt-2">
                            Password
                            <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="form-control"></input>
                        </div>
                        <div className="form-group mt-2">
                            <button type="submit" className="btn btn-primary w-100"> 
                              Login
                            </button>
                        </div>
                    </form>
                    <Link to="/register" style={{float:"right"}}> Register </Link>
                </div>
              </div>
            </div>
        </div>
    )
}
export default Login;