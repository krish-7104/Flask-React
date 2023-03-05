import React, { useState } from "react";
import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const App = () => {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    image: "",
  });

  const sendData = async (e) => {
    e.preventDefault();
    fetch("/sendData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadPhoto = async (file) => {
    const storageRef = ref(storage, `Test Images/${Math.random() * 10000}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          alert("File Uploaded");
          setData({ ...data, image: downloadURL });
        });
      }
    );
  };

  const setImageHandler = (e) => {
    setData({ ...data, image: e.target.files[0] });
    uploadPhoto();
  };
  return (
    <form onSubmit={sendData}>
      <input
        placeholder="First Name"
        type="text"
        id="firstname"
        value={data.fname}
        onChange={(e) => setData({ ...data, fname: e.target.value })}
      />
      <br></br>
      <br></br>
      <input
        placeholder="Last Name"
        type="text"
        id="lastname"
        value={data.lname}
        onChange={(e) => setData({ ...data, lname: e.target.value })}
      />
      <br></br>
      <br></br>
      <input type="file" id="avatar" name="avatar" onChange={setImageHandler} />
      <br></br>
      <br></br>
      <input type="submit" value="submit" />
    </form>
  );
};

export default App;
