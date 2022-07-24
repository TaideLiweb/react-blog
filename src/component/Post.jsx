import React, { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import firebase from '../utils/firebase'
import { getDatabase, ref, get } from "firebase/database";

function Post() {
    const [DbPost,setDbPost] = useState('')
    // Initialize Firebase
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const postId = useParams()
    function createMarkup() {
        return {__html: DbPost};
    }

    useEffect(()=>{
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
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
        
    },[dbRef,postId.key])
    return (
        <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7" dangerouslySetInnerHTML={createMarkup()}>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Post;