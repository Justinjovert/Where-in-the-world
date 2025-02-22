
import { useNavigate } from 'react-router-dom'
import '../styles/home.css'

function NotFound() {

    let navigate = useNavigate()

    setTimeout(() => {
        navigate('/')
    }, 4000)

    return (
        <div className='not-found'>
            404 Not Found
        </div>
    )
}

export default NotFound
