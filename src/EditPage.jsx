// import React, { useEffect,useState } from 'react';
import React, {useState } from 'react';
import {CKEditor} from 'ckeditor4-react';
import { initializeApp } from "firebase/app";
import { getDatabase,ref,push,onValue} from "firebase/database";

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

function EditPage() {
    const [PostContent,setPostContent] = useState('')
    const [PostTitle,setPostTitle] = useState('')
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(database);
    
    // onValue(dbRef, (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data)
    // });
    
    function writeUserData() {
        push(ref(database,), {
            postTitle:PostTitle,
            postContent:PostContent
        });
    }

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <input type="text" onChange={(e)=> setPostTitle(e.target.value)} onBlur={(e)=> setPostTitle(e.target.value)} />
                    <CKEditor
                    onChange={ ( { editor } ) => {  
                        setPostContent(editor.getData())
                    } }
                    onBlur={
                        ( { editor } ) => {
                            setPostContent(editor.getData())
                        }
                    }
                    />
                    <div>
                        標題:{PostTitle}
                    </div>
                    <div>
                        
                        {PostContent}
                    </div>
                    <div>
                        {/* {Test} */}
                    </div>
                    <button onClick={()=>{
                        writeUserData()
                    }}>點我</button>
                </div>
            </div>
        </div>
    );
}

export default EditPage;