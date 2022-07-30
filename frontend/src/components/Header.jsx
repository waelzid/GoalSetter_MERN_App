import React from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import Login from '../pages/Login'
import {useSelector,useDispatch} from 'react-redux'
import {logout,reset} from '../features/auth/authSlice'
//import {reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate() ;
    const dispatch= useDispatch() ;
    const user = useSelector((state)=>state.auth.user)

    const onLogout=()=>{
        dispatch(logout());
        dispatch(reset())
        navigate('/')
    }
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>GoalSetter</Link>
        </div>
        <ul>
            {user ? (
            <li>
                <button className='btn' onClick={onLogout}><FaSignOutAlt />LogOut </button>
            </li>): ( <>
            <li>
                <Link to='/login'><FaSignInAlt />Login </Link>
            </li>
            <li>
                <Link to='/register'><FaUser />register</Link>
            </li></>) }
        </ul>
        
    </header>
  )
}

export default Header