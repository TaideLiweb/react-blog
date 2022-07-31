// import React, { useEffect,useState } from 'react';
import React, {useState } from 'react';
import {CKEditor} from 'ckeditor4-react';
import firebase from './utils/firebase'
import { getDatabase,ref,push,onValue} from "firebase/database";



function EditPage() {

    const [PostContent,setPostContent] = useState('')
    const [Postkey,setPostkey] = useState(0)
    const [PostTitle,setPostTitle] = useState('')
    // Initialize Firebase
    const database = getDatabase(firebase);
    
    // onValue(dbRef, (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data)
    // });
    
    function submitPost() {
        // push(ref(database), {
        //     postTitle:PostTitle,
        //     postContent:PostContent
        // });

        //初始化CKediter編輯器
        setPostkey(Postkey+1)
        setPostTitle('')
    }

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                <div className='d-flex align-items-center mb-3'>
                    <span>文章標題：</span>
                    <div className="input-outline-x">
                        <input className="input-control input-outline" placeholder="標題" type="text" value={PostTitle} onChange={(e)=> setPostTitle(e.target.value)} onBlur={(e)=> setPostTitle(e.target.value)} />
                        <label className="input-label">標題</label>
                    </div>
                </div>
                <div className='mb-3'>
                    <CKEditor
                    key={Postkey}
                    // config={{
                    //     filebrowserBrowseUrl: 'gs://blog-7078e.appspot.com',
                    //     filebrowserUploadUrl: 'gs://blog-7078e.appspot.com'
                    // }}
                    onChange={ ( { editor } ) => {  
                        setPostContent(editor.getData())
                    } }
                    onBlur={
                        ( { editor } ) => {
                            setPostContent(editor.getData())
                        }
                    }
                    />
                </div>
                    {/* <div>
                        標題:{PostTitle}
                    </div>
                    <div>
                        
                        {PostContent}
                    </div> */}
                    <div className="d-flex justify-content-end mb-4">
                        <button className="btn btn-primary text-uppercase"  onClick={()=>{
                        submitPost()
                    }}>送出</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPage;