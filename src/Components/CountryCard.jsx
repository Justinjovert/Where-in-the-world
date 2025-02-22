
import { NavLink } from 'react-router-dom'
import '../styles/countries.css'

function CountryCard(country) {


    return (
        < NavLink to={`/countries/${country.name.common}`} className="country-card" >
            <div className="country-flag"><img alt='' src={country.flags.png} /></div>
            <div className="country-card-details">
                <h3>{country.name.common}</h3>
                <span>Population: {country.population.toLocaleString('en-gb')} </span>
                <span data-region="${country.region}">Region: {country.region}</span>
                <span data-capital="${country.capital}">Capital: {country.capital}</span>
            </div>
        </NavLink >
    )
}

export default CountryCard
