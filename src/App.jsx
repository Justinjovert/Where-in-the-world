import './App.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Countries from './pages/Countries'
import CountryDetails from './pages/CountryDetails'

// Import local storage for Dark Mode use
import NotFound from './Components/NotFound'
import MainLayout from './Components/MainLayout'

function App() {


    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: [
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
            ]
        },
    ], {
        basename: '/Where-in-the-world'
    })

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
