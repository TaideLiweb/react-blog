// import React, { useEffect,useState } from 'react';
import React, {useState,useEffect,useMemo,useRef} from 'react';
// import {CKEditor} from 'ckeditor4-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import firebase from './utils/firebase'
import { getDatabase,ref,get,set,push} from "firebase/database";
import { useLocation } from "react-router-dom";


function EditPage() {

    const [PostContent,setPostContent] = useState('')
    const [Postkey,setPostkey] = useState(0)
    const [PostTitle,setPostTitle] = useState('')
    const [CKEditorInitData,setCKEditorInitData] = useState('')
    let clearEffect = useRef(true)
    const [urlQueryString]  = useState(useQuery().get("id")) 
    // Initialize Firebase
    const location = useLocation()
    const database = getDatabase(firebase);

    function useQuery() {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    useEffect(()=>{
        console.log(urlQueryString)
        if(location.search !== "" && clearEffect.current){
            get(ref(database,urlQueryString)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                    setCKEditorInitData(snapshot.val().postContent)
                    setPostTitle(snapshot.val().postTitle)
                    //初始化CKediter編輯器
                    setPostkey(pre => pre +1)
                }
                }).catch((error) => {
                    console.error(error);
                });
        }else{
            setPostkey(pre => pre +1)
            setCKEditorInitData('')
            setPostTitle('')
        }
        clearEffect.current = false
    },[database,location,urlQueryString])
    
    function submitPost() {

        if(urlQueryString){
            set(ref(database,urlQueryString),{
                postTitle:PostTitle,
                postContent:PostContent
            })
            setCKEditorInitData('')
        }else{
            push(ref(database), {
                postTitle:PostTitle,
                postContent:PostContent
            });
        }
        //初始化CKediter編輯器
        setPostTitle('')
        setPostkey(pre => pre +1)
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
                        {/* <CKEditor
                        initData={CKEditorInitData}
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
                        /> */}
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                    </div>
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