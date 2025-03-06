import { createContext, useContext, useEffect, useReducer } from 'react'
import PropTypes from "prop-types";

const ThemeContext = createContext()
const ThemeContextDispatch = createContext()

export function UseTheme() {
    return useContext(ThemeContext)
}

export function UseThemeDispatch() {
    return useContext(ThemeContextDispatch)
}

function sampleReducer(state, action) {
    switch (action.type) {
        case "SWITCH_THEME":
            // Set localStorage 'isDark' to opposite value ( true/false )
            localStorage.setItem('isDark', JSON.stringify((!state.themeReducer)))
            return { ...state, themeReducer: !state.themeReducer }
        default:
            return state
    }
}





export function ThemeProvider({ children }) {

    //const [theme, setTheme] = useLocalStorage("IsDark", false)

    const [state, dispatch] = useReducer(sampleReducer,
        {
            // Check if isDark in local storage exists
            // Use string comparison to return boolean value
            // Return true if it exists with a string of 'true'
            // Set string 'false' to localStorage if it doesn't exist
            themeReducer: localStorage.getItem('isDark')
                ? localStorage.getItem('isDark') === 'true'
                : (localStorage.setItem('isDark', 'false'), false)
        })


    // It gets 'isDark' variable from local storage
    // isDark returns boolean via strict comparison
    // Add/remove dark class (dark colors)
    useEffect(() => {
        const isDark = localStorage.getItem('isDark') === 'false'
        isDark === false
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }, [state.themeReducer])

    return (
        <ThemeContext.Provider value={state}>
            <ThemeContextDispatch value={dispatch}>
                {children}
            </ThemeContextDispatch>
        </ThemeContext.Provider>
    )
}



ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};