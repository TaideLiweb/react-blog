import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setAdmin, setLoggedIn } from './navSlice'

function Nav() {
    const auth = getAuth();
    const navigate = useNavigate();
    const admin = useSelector((state) => state.nav.admin)
    const loggedIn = useSelector((state) => state.nav.loggedIn)
    const dispatch = useDispatch()
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
                Swal.fire({
                    title: '成功登出!',
                    icon: 'success',
                    confirmButtonText: '好~'
                })
                dispatch(setAdmin(false))
                dispatch(setLoggedIn(false))
                navigate("/")
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
                dispatch(setAdmin(true))
                dispatch(setLoggedIn(true))
                // ...
            }else if(user){
                dispatch(setAdmin(true))
                dispatch(setLoggedIn(false))
            }else{
                dispatch(setAdmin(false))
                dispatch(setLoggedIn(false))
            }
        });
        
    }, [auth,dispatch])
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
                            {admin && <li className="nav-item"><Link to="/editPage" className="nav-link px-lg-3 py-3 py-lg-4">撰寫文章</Link></li>}
                            {loggedIn ? 
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