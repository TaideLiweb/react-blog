// import React, { useEffect,useState } from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/loginPage.scss';
// import firebase from './utils/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
function LoginPage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [Email,SetEmail] = useState('')
    const [Password,SetPassword] = useState('')
    function login(){
        signInWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('登入了')
            navigate('/');
            // ...
        })
    }
    return (
        <div className="login" onSubmit={login}>
            <div className="login_content">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
                    <div className="form-group">
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        id="inputEmail"
                        onChange={(e)=> SetEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        id="inputPassword"
                        onChange={(e)=> SetPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                    />
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">登入</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

