
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
import { UseTheme, UseThemeDispatch } from '../hooks/ThemeContext'



const Navbar = () => {

    const theme = UseTheme()
    const dispatch = UseThemeDispatch()


    return (
        <>
            <nav className="navbar-container">
                <NavLink className="navbar-home" to="/">Where in the world?</NavLink>
                <div style={{ display: 'flex', alignItems: "end", gap: "0.5rem" }}>
                    <label>Dark Mode</label>
                    <div className="toggle-container">
                        <input type="checkbox" id="toggle" className="toggle-input" onChange={() => dispatch({type: "SWITCH_THEME"})} checked={theme.themeReducer} />
                        <label htmlFor="toggle" className="toggle-label"></label>
                    </div>
                </div>
            </nav>            
        </>
    )
}

export default Navbar
