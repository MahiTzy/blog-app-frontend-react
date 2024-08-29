import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { doLogout, getUser, isLoggedIn } from '../auth';

const NavComp = ({ toggleLoginModal, toggleRegisterModal }) => {

  const mainNavRef = useRef(null);

  useEffect(() => {
    const MQL = 992;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const mainNav = mainNavRef.current;

    if (mainNav && vw > MQL) {
      const headerHeight = mainNav.offsetHeight;
      let previousTop = window.pageYOffset;

      const handleScroll = () => {
        const currentTop = window.pageYOffset;

        // Check if the user is scrolling up
        if (currentTop < previousTop) {
          // If scrolling up...
          if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
            mainNav.classList.add('is-visible');
          } else {
            mainNav.classList.remove('is-visible', 'is-fixed');
          }
        } else if (currentTop > previousTop) {
          // If scrolling down...
          mainNav.classList.remove('is-visible');

          if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
            mainNav.classList.add('is-fixed');
          }
        }
        previousTop = currentTop;
      };

      window.addEventListener('scroll', handleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const navigate = useNavigate();
  const [login, setLogin] = useState(isLoggedIn());
  const [user, setUser] = useState(isLoggedIn() ? getUser() : null);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(isLoggedIn() ? getUser() : null);
  }, []);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      setUser(null);
      setTimeout(() => {
      navigate('/',{state:{message:'User logged out successfully!', type:'success'}});
      }, 0);
      // console.log('Logged out');
    });
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light" id="mainNav" ref={mainNavRef}>
        <div className="container"><NavLink className="navbar-brand" href="#">PostSphere</NavLink><button data-bs-toggle="collapse" data-bs-target="#navbarResponsive" className="navbar-toggler" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars"></i></button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><NavLink tag={Link} to={"/"} className="nav-link" href="#">Home</NavLink></li>
              <li className="nav-item"><NavLink tag={Link} to={"/about"} className="nav-link" href="#">About us</NavLink></li>
              <li className="nav-item"><NavLink tag={Link} to={"/contact"} className="nav-link" href="#">Contact us</NavLink></li>
              {
                login ? (
                  <>
                  <li className="nav-item"><NavLink tag={Link} to={"/user/dashboard"} className="nav-link" href="#">{user?.user?.name}'s&nbsp;Dashboard</NavLink></li>
                  <li className="nav-item"><NavLink tag={Link} onClick={logout} className="nav-link">Logout</NavLink></li>
                  </>
                ) : (
                  <>
                    <li className="nav-item"><NavLink tag={Link} onClick={toggleLoginModal} className="nav-link">Login</NavLink></li>
                    <li className="nav-item"><NavLink tag={Link} onClick={toggleRegisterModal} className="nav-link">Register</NavLink></li>
                  </>

                )
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavComp
