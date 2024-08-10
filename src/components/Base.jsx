import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FootTool from './FootTool'
import Login from './Login'
import NavComp from './NavComp'
import Register from './Register'

const Base = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    const toggleLoginModal = () => setLoginModal(!loginModal);
    const toggleRegisterModal = () => setRegisterModal(!registerModal);
    return (
        <div>
            <NavComp toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} />
            <Login toggleModal={toggleLoginModal} isOpen={loginModal} />
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            <Register toggleModal={toggleRegisterModal} isOpen={registerModal} />
            {children}
            <FootTool />
        </div>
    )
}

export default Base
