import { useMemo, useReducer } from 'react'
import '../styles/countries.css'
import { Outlet, useLoaderData, useParams } from 'react-router-dom'
import CountryCard from '../Components/CountryCard'


const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'World']


// Sort Countries
const sortCountries = (countries) => {
    return [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
};


// UseReducer function
function reduce(state, action) {
    switch (action.type) {
        case "SELECT_REGION":
            return { ...state, selectedRegion: action.payload, dropDown: !state.dropDown }
        case "TOGGLE_DROPDOWN":
            return { ...state, dropDown: !state.dropDown }
        case "SEARCH_QUERY":
            return { ...state, searchQuery: action.payload }
        default:
            return state
    }
}

// Main content that renders country cards with navigation ui
function Countries() {


    // Attempt to use useReducer
    const [state, dispatch] = useReducer(reduce, { dropDown: false, selectedRegion: 'World', searchQuery: '' })


    /* ---------------------- */

    // Parameter :country
    // When dynamic segment has value, render details of selected param
    // Otherwise render whole country cards
    const { country } = useParams()

    // Sort Function
    const countries = useLoaderData().filter(country => country.independent == true)
    const sortedCountries = useMemo(() => sortCountries(countries), [countries])
    // Return searched countries using filter method
    const filteredCountries = useMemo(() => {
        return sortedCountries.filter(country =>
            country.name.common.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
    }, [state.searchQuery, sortedCountries])

    return (
        <>
            <main className='main-container'>
                {/* If country exists, load details. Else, load country cards */}
                {!country
                    ? (
                        <>
                            <section className='heading-container'>
                                <div data-heading="front" className="search-container">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" width="25px"
                                            fill="var(--icoColor)">
                                            <path
                                                d="M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z" />
                                        </svg>
                                    </i>
                                    <input value={state.searchQuery} className="searchbar" placeholder="Search for a country" onChange={(e) => dispatch({ type: "SEARCH_QUERY", payload: e.target.value})} />
                                </div>
                                <div data-heading="front" className="region-select-wrapper">
                                    <div className="region-selection-container"  onClick={() => dispatch({ type: 'TOGGLE_DROPDOWN' })}>
                                        <span>{state.selectedRegion == 'World' ? 'Filter By Region' : state.selectedRegion}</span>
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" width="15px"
                                                height="15px">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="48" d="M112 184l144 144 144-144" />
                                            </svg>
                                        </i>
                                    </div>
                                    {state.dropDown && (
                                        <div data-heading="front" className="region-options-container">
                                            {regions.map(region => (
                                                <button key={region} value={region} onClick={() => dispatch({ type: 'SELECT_REGION', payload: region })}>{region}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
                            {/* // Display country cards */}
                            <section className='countries-container'>
                                {state.selectedRegion == 'World'
                                    ?
                                    filteredCountries.map(country => (
                                        <CountryCard key={country.cca3} {...country} />
                                    ))
                                    :
                                    // Filter countries by region and use map to render countries
                                    filteredCountries
                                        .filter(country => country.region.toUpperCase() === state.selectedRegion.toUpperCase())
                                        .map(country => <CountryCard key={country.cca3} {...country} />)
                                }
                            </section>
                        </>
                        // If selected region is 'World' display all countries
                        // If selected region is a region, map each country that matches that region
                    )
                    :
                    (
                        //Display country detail of selected country
                        <>
                            <Outlet />
                        </>
                    )
                }
            </main>
        </>
    )
}

export default Countries
