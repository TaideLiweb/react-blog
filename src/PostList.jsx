import React, { useEffect, useState, useCallback } from 'react';
import ReviewPost from './component/ReviewPost.jsx'
import firebase from './utils/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2'
import { getDatabase, ref,child, get, remove } from "firebase/database";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

function PostList() {
    const [DbPostList, setDbPostList] = useState([])
    const [PostList, setPostList] = useState([])
    const [IsUser, setIsUser] = useState('')
    const admin = useSelector((state) => state.nav.admin)
    // Initialize Firebase
    const database = getDatabase(firebase);
    const auth = getAuth();

    function removePost(postKey) {
        Swal.fire({
            title: '確認要刪除此文章嗎❓',
            text: "刪除過後資料將無法回復😔",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#8d8d8d',
            confirmButtonText: '確定要刪除',
            cancelButtonText: '取消',
        }).then((result) => {
            if (result.isConfirmed) {
                remove(ref(database, IsUser+"/"+postKey))
                getPost()
                Swal.fire({
                    title: '已完成刪除!',
                    icon: 'success',
                    confirmButtonText: '好~'
                })
            }
        })
        // remove(ref(database, postKey))
        getPost()
    }
    const getPost = useCallback(
        () => {
            if(IsUser === "") return
            get(child(ref(database),IsUser)).then((snapshot) => {
                if (snapshot.exists()) {
                    let replaceAry = []
                    Object.keys(snapshot.val()).forEach((key) => {
                        replaceAry.push({
                            id: key,
                            ...snapshot.val()[key],
                        })
                    });
                    let replaceAryReverse = replaceAry.reverse()
                    setDbPostList(replaceAryReverse)
                    setPostList(replaceAryReverse)
                } else {
                    setDbPostList([])
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        [database,IsUser],
    );
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user === null) {
                setIsUser('ted')
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

    function searchPost(value) {
        if (value.length > 0) {
            let filtered = DbPostList.filter((DbPostListItem) => {
                console.log(DbPostListItem.postTitle.indexOf(value))
                return DbPostListItem.postTitle.indexOf(value) !== -1
            })
            setPostList(filtered)
        } else {
            setPostList(DbPostList)
        }
    }
    return (
        <div className="container px-4 px-lg-5">
            <div className="row mb-4 gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <div className='row justify-content-between'>
                        <div className='col-6'>
                            <div className="input-outline-x">
                                <input className="input-control input-outline" onChange={(e) => {
                                    searchPost(e.target.value)
                                }} placeholder="搜尋文章標題" type="text" />
                                <label className="input-label">搜尋文章標題</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {PostList.map((PostListItem) => {
                        // console.log(key); // 001, 002, 003
                        // console.log(DbPostList[key]); // { name: 'Casper', ... }
                        if (admin) {
                            return (
                                <div>
                                    <div className="text-start">
                                        <span className="postSettingBtn me-3" onClick={() => removePost(PostListItem.id)}>刪除文章</span>
                                        <span className="postSettingBtn"><Link to={`/editPage?id=${PostListItem.id}`}>編輯文章</Link></span>
                                    </div>
                                    <Link to={`/post/${PostListItem.id}`}>
                                        <ReviewPost title={PostListItem.postTitle} key={PostListItem.id} postDate={PostListItem.date}></ReviewPost>
                                    </Link>
                                </div>)
                        } else {
                            return <Link to={`/post/${PostListItem.id}`}>
                                <ReviewPost title={PostListItem.postTitle} key={PostListItem.id} postDate={PostListItem.date}></ReviewPost>
                            </Link>
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default PostList;