
import '../styles/navbar.css'


const Navbar = ({ toggleDarkMode, isChecked }) => {
    return (
        <nav className="navbar-container">
            <a href="/">Where in the world?</a>
            <div style={{ display: 'flex', alignItems: "end", gap: "0.5rem"}}>
                <label>Dark Mode</label>
                <div className="toggle-container">
                    <input type="checkbox" id="toggle" className="toggle-input" onChange={toggleDarkMode} checked={isChecked} />
                    <label htmlFor="toggle" className="toggle-label"></label>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
