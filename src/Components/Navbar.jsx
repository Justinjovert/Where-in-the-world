
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'


const Navbar = ({ toggleDarkMode, isChecked }) => {
    return (
        <>
            <nav className="navbar-container">
                <NavLink className="navbar-home" to="/">Where in the world?</NavLink>
                <div style={{ display: 'flex', alignItems: "end", gap: "0.5rem" }}>
                    <label>Dark Mode</label>
                    <div className="toggle-container">
                        <input type="checkbox" id="toggle" className="toggle-input" onChange={toggleDarkMode} checked={isChecked} />
                        <label htmlFor="toggle" className="toggle-label"></label>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
