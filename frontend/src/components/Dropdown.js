import React from 'react'
import { Link } from 'react-router-dom'
import { clearStore } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';

const Dropdown1 = () => {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const getInitials = (name) => {
        // Memisahkan nama berdasarkan spasi
        const parts = name.split(' ');
        
        // Mendapatkan inisial dari nama depan dan nama belakang
        const initials = parts.map(part => part.charAt(0)).join('.');
      
        return initials;
      };
    return (
        <>
            <div className="app-navbar-item" id="kt_header_user_menu_toggle">
                <button
                    className="btn btn-flat rounded-pill p-0 d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"

                >
                <div className="d-flex align-items-center">
                    {/* Container teks */}
                    <div className="text-container">
                        <span className="fw-bold">{getInitials(user?.name)}</span>
                        <span className="small text-muted">{user?.id.toString().padStart(6, '0')}</span>
                    </div>
                    {/* Ikon dropdown */}
                    <i className="bi bi-caret-down-fill dropdown-icon text-dark"></i>
                </div>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item py-2" to="/profile"><i className='bi bi-person'></i>&nbsp;&nbsp;Profile</Link>
                    </li>
                
                    <li>
                        <Link onClick={() => dispatch(clearStore('Logging out...'))} to={"/"} className="dropdown-item py-2"><i className='bi bi-arrow-right'></i>&nbsp;&nbsp;Keluar</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Dropdown1