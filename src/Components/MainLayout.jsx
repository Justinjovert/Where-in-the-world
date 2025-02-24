import { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'




// Returns Main layout 
// Separated to avoid re rendering issues
const MainLayout = () => {

    // Dark Theme
    // Using some js
    const [isDark, setIsDark] = useLocalStorage("isDark", false)
    useEffect(() => {
        isDark
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }, [isDark])

    return (
        <>
            <Navbar toggleDarkMode={() => setIsDark(!isDark)} isChecked={isDark} />
            <Outlet />
        </>
    )
}

export default MainLayout
