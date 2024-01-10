import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';




function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState();
    const navigate = useNavigate();


    const register = () =>{
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email",email);
        formData.append("password",password);
        formData.append("avatar", avatar, avatar.name);

       
        axios.post("http://localhost:5000/api/register",formData)
            .then(res=>{
                console.log(res);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user))
                navigate("/");
            });
            
        //api isteği
        navigate("/");
    }

    return(
        <div className="d-flex justify-content-center" style={{marginTop:"50px"}}>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                       <h1> Register Page</h1> 
                    </div>
                    <div className="card-body">
                        <form onSubmit={register}>
                            <div className="form-group">
                                Name
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" required minLength="3"></input>
                            </div>
                            <div className="form-group mt-2">
                                Email 
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"  className="form-control" required email="true"></input>
                            </div>
                            <div className="form-group mt-2">
                               Password
                               <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required></input>
                            </div>
                            <div className="form-group mt2"> 
                             
                             Avatar 
                             <input type="file" onChange={(e) => setAvatar(e.target.files[0])} className="form-control" required></input>
                            </div>
                            <div className="form-group mt-2">
                                <button type="submit" className="btn btn-outline-success w-100"> Register </button>
                            </div>

                            
                        </form>
                        <Link className="mt-2" style={{float:"right"}} to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;