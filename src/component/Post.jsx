import React, { useEffect,useState,useCallback } from 'react';
import {useParams} from 'react-router-dom';
import firebase from '../utils/firebase'
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../css/post.scss';
function Post() {
    const [DbPost,setDbPost] = useState('')
    const [IsUser, setIsUser] = useState('')
    // Initialize Firebase
    const database = getDatabase(firebase);
    const postId = useParams()
    const auth = getAuth();
    function createMarkup() {
        return {__html: DbPost};
    }
    const getPost = useCallback(
        () => {
            if(IsUser === "") return
            get(child(ref(database),IsUser)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                    Object.keys(snapshot.val()).forEach((key) => {
                        if(postId.key === key){
                            setDbPost(snapshot.val()[key].postContent) 
                        }
                        // console.log(key); // 001, 002, 003
                        // console.log(snapshot.val()[key]); // { name: 'Casper', ... }
                    })
                } else {
                    console.log("No data available");
                }
                }).catch((error) => {
                    console.error(error);
                });
        },
        [postId.key,IsUser,database],
    );
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user === null) {
                setIsUser('zongZhan')
                getPost()
                return
            }
            if (user.uid === process.env.REACT_APP_zongZhanUid || user.uid === process.env.REACT_APP_tedUid) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log(user.uid)
                if(user.uid === process.env.REACT_APP_zongZhanUid){
                    setIsUser('zongZhan')
                }
                if(user.uid === process.env.REACT_APP_tedUid){
                    setIsUser('ted')
                }
                // ...
            }
            getPost()
        });
    }, [auth, getPost])
    return (
        <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7 postContainer" dangerouslySetInnerHTML={createMarkup()}>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Post;