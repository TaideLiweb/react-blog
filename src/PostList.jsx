import React, { useEffect,useState,useCallback } from 'react';
import ReviewPost from './component/ReviewPost.jsx'
import firebase from './utils/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getDatabase, ref, get, remove } from "firebase/database";
import { Link } from 'react-router-dom';

function PostList() {
    const [DbPost,setDbPost] = useState('')
    const [IsAdmin,setIsAdmin] = useState('')
    // Initialize Firebase
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const auth = getAuth();

    function removePost(postKey){
        remove(ref(database,postKey))
        getPost()
    }
    const getPost = useCallback(
        () => {
            get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    setDbPost(snapshot.val())
                } else {
                    setDbPost('')
                    console.log("No data available");
                }
                }).catch((error) => {
                    console.error(error);
                });
        },
        [dbRef],
    );
    useEffect(()=>{
        getPost()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if(user.uid === 'B4rLpzaQq7Xhbc3leipESVUsDrB3'){
                    console.log(user.uid)
                    setIsAdmin(true)
                }
                // ...
            }
        });
    },[auth,getPost])

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {Object.keys(DbPost).reverse().map((key) => {
                        // console.log(key); // 001, 002, 003
                        // console.log(DbPost[key]); // { name: 'Casper', ... }
                        if(IsAdmin){
                            return (
                            <div>
                                <div className="text-start">
                                    <span className="postSettingBtn me-3" onClick={()=>removePost(key)}>刪除文章</span>
                                    <span className="postSettingBtn"><Link to={`/editPage?id=${key}`}>編輯文章</Link></span>
                                </div>
                                <Link to={`/post/${key}`}>
                                    <ReviewPost title = {DbPost[key].postTitle} key = {key}></ReviewPost>
                                </Link>
                            </div>)
                        }else{
                            return <Link to={`/post/${key}`}>
                            <ReviewPost title = {DbPost[key].postTitle} key = {key}></ReviewPost>
                        </Link>
                        }
                    })}
                    {/* {JSON.stringify(DbPost)} */}
                </div>
            </div>
        </div>
    );
}

export default PostList;