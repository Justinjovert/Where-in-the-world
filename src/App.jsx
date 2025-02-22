import './App.css'
import './index.css'
import Navbar from './Components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Countries from './pages/Countries'
import CountryDetails from './pages/CountryDetails'

// Import local storage for Dark Mode use
import useLocalStorage from 'use-local-storage';
import { useEffect } from 'react'
import NotFound from './Components/NotFound'

function App() {

    
    // Dark Theme
    // Using some js
    const [isDark, setIsDark] = useLocalStorage("isDark", false)
    useEffect(() => {
        isDark
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }, [isDark])

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            errorElement: <NotFound />,
        },
        {
            path: '/countries',
            element: <Countries />,
            errorElement: <NotFound />,
            loader: async () => {
                return fetch("https://restcountries.com/v3.1/all").then(res => res.json())
            },
            children: [
                {
                    path: ':country',
                    element: <CountryDetails />,
                    // Changed to useEffect to render component while fetching data
                    // Display skeleton loading
                    /* loader: async ({params}) => {
                        return fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(params.country)}`).then(res => res.json())
                    } */
                }
            ]
        }
    ])

    return (
        <>
            <Navbar toggleDarkMode={() => setIsDark(!isDark)} isChecked={isDark} />
            <RouterProvider router={router} />
        </>
    )
}

export default App
