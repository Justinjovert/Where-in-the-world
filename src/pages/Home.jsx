
import '../styles/home.css'
import { NavLink } from 'react-router-dom'

function Home() {
    return (
        <div className='homeContainer'>
            <NavLink className='view-countries' to={'/countries'}>View Countries</NavLink>
        </div>
    )
}

export default Home
