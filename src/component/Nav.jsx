import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [IsAdmin, setIsAdmin] = useState('')
    const [LoggedIn, setLoggedIn] = useState('')
    const auth = getAuth();
    const navigate = useNavigate();
    function handleSignOut(){
        Swal.fire({
            title: '確定要登出嗎?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '是的',
            cancelButtonText: '取消',
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth,(user) => {
                    console.log(user.uid)
                    console.log('我登出了')
                })
                navigate(0)
                Swal.fire({
                    title: '成功登出!',
                    icon: 'success',
                    confirmButtonText: '好~'
                })
            }
        })

    }
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if(user === null) return
            if (user.uid === process.env.REACT_APP_zongZhanUid || user.uid === process.env.REACT_APP_tedUid) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log(user.uid)
                setLoggedIn(true)
                setIsAdmin(true)
                // ...
            }else if(user){
                setLoggedIn(true)
                setIsAdmin(false)
            }else{
                setIsAdmin(false)
                setLoggedIn(false)
            }
        });
        
    }, [auth])
    return (
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link to="/" className="navbar-brand">展哥的部落格</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        選單
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link to="/" className="nav-link px-lg-3 py-3 py-lg-4">首頁</Link></li>
                            {IsAdmin && <li className="nav-item"><Link to="/editPage" className="nav-link px-lg-3 py-3 py-lg-4">撰寫文章</Link></li>}
                            {LoggedIn ? 
                                (
                                <li className="nav-item"><button href='#' onClick={()=>handleSignOut()} className="nav-link px-lg-3 py-3 py-lg-4">登出</button></li>
                                ) : (
                                <li className="nav-item"><Link to="/loginPage" className="nav-link px-lg-3 py-3 py-lg-4">登入</Link></li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
    );
}

export default Nav;