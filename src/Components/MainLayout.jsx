import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'




// Returns Main layout 
// Separated to avoid re rendering issues
const MainLayout = () => {


    /* const { theme, handleTheme } = useContext(ThemeContext) */

    // Dark Theme
    // Using some js
    //const [isDark, setIsDark] = useLocalStorage("isDark", false)
    /* useEffect(() => {
        theme
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }, [theme]) */

    return (
        <>
            <Navbar /* toggleDarkMode={handleTheme} isChecked={theme} */ />
            <Outlet />
        </>
    )
}

export default MainLayout
