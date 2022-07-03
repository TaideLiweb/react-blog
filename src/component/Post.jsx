import React, { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
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
function Post() {
    const [DbPost,setDbPost] = useState('')
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
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