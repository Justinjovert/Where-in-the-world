import { createContext, useCallback, useContext, useEffect } from 'react'
import useLocalStorage from 'use-local-storage'
import PropTypes from "prop-types"; 

const ThemeContext = createContext()


export function UseTheme() {
    return useContext(ThemeContext)
}


export function ThemeProvider({ children }) {

    const [theme, setTheme] = useLocalStorage("IsDark", false)

    const handleTheme = useCallback(() => {
        setTheme(prevTheme => (!prevTheme))
    }, [])

    useEffect(() => {
        theme
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}



ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};