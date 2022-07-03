import React, { useEffect,useState } from 'react';
import ReviewPost from './ReviewPost.jsx'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from 'react-router-dom';
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
    databaseURL: process.env.REACT_APP_databaseURL,
};

function PostList() {
    const [DbPost,setDbPost] = useState('')
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(database);
    
    useEffect(()=>{
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                setDbPost(snapshot.val())
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
                console.error(error);
            });
        
    },[dbRef])

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {Object.keys(DbPost).map((key) => {
                        // console.log(key); // 001, 002, 003
                        // console.log(DbPost[key]); // { name: 'Casper', ... }
                        return <Link to={`/post/${key}`}><ReviewPost title = {DbPost[key].postTitle} key = {key}></ReviewPost></Link>
                    })}
                    {/* {JSON.stringify(DbPost)} */}
                </div>
            </div>
        </div>
    );
}

export default PostList;