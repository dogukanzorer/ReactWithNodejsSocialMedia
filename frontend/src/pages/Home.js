import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../env";

function Home() {
  const [content, setContent] = useState("");
  const [post, setPost] = useState([]);

  const addPost = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user")); // "user" anahtarını kullanın
    axios
      .post( apiUrl + "/api/post", {
        userId: user._id,
        content: content,
      })
      .then(async (res) => {
       await getPost();
        alert(res.data.message);
        setContent("");
        
      })
      .catch((err) => {
        console.error(err.response.data); // "err.response.data" kullanın
      });
  };

  const getPost = async () => {
    axios.get(apiUrl + "/api/posts").then((res) => {
      setPost(res.data);
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form autoComplete="off" onSubmit={addPost}>
              <div className="form-group">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="form-control"
                  rows="5"
                  placeholder="What do you think?"
                ></textarea>
              </div>
              <div className="form-group mt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  {" "}
                  Share{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        {post.map((val, index) => {
          return (
            <div key={index} className="card mt-2">
              <div className="card-body">
                <img src={ apiUrl + '/' + val.users[0].avatar.path} style={{width:"50px",borderRadius:"20px",height:"40px"}}></img>
                <h5> {val.users[0].name} - {val.createDate}</h5>
                <p>{val.content}</p>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
