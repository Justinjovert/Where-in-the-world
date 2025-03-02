import { NavLink, useParams } from 'react-router-dom'
import '../styles/countries.css'
import { useEffect, useMemo, useState } from 'react'
import SkeletonLoading from '../Components/SkeletonLoading'
import UseFetch from '../hooks/UseFetch'
import NotFound from '../Components/NotFound'










function CountryDetails() {

    const searchThisCountryInAPI = useParams().country
    const { data: country, error } = UseFetch(`https://restcountries.com/v3.1/name/${searchThisCountryInAPI}`)

    // Function that formats language to a string
    // REUSED CODE
    const formatLanguage = (languages) => {
        const languagesObj = languages

        //Format language array to a string
        let string = ''
        let keys = Object.keys(languagesObj)

        //IF conditions for multiple languages
        for (let index = 0; index < keys.length; index++) {
            if (Object.keys(keys).length <= 1) {
                string = languagesObj[keys[index]]
            }
            else if (Object.keys(keys).length == 2) {
                string = languagesObj[keys[index]] + ' and ' + languagesObj[keys[1]]
                break
            }
            else if (Object.keys(keys).length > 2) {
                if (index == Object.keys(keys).length - 1) {
                    string += ' and ' + languagesObj[keys[index]]
                }
                else {
                    string += languagesObj[keys[index]] + ', '
                }
            }
        }
        return string
    }



    // States
    //const [country, setCountry] = useState(data)
    const [borders, setBorders] = useState([])

    //const country = useLoaderData()[0] || {}

    const countryDetails = useMemo(() => ({
        name: country?.name?.common || <SkeletonLoading width={100} />,
        nativeName: country?.name?.nativeName
            ? Object.keys(country.name.nativeName).map(key => country.name.nativeName[key].common).join(', ')
            : <SkeletonLoading width={100} />,
        population: country?.population ? country?.population.toLocaleString('en-gb') : <SkeletonLoading width={100} />,
        region: country?.region || <SkeletonLoading width={100} />,
        subRegion: country?.subregion || <SkeletonLoading width={100} />,
        capital: country?.capital?.[0] || <SkeletonLoading width={100} />,
        tld: country?.tld?.[0] || <SkeletonLoading width={100} />,
        currency: country?.currencies ? Object.values(country.currencies)?.[0]?.name || <SkeletonLoading width={100} /> : <SkeletonLoading width={100} />,
        flag: country?.flags.png || '',
        languages: country
            ? formatLanguage(country?.languages)
            : <SkeletonLoading width={100} />,
        borders: country?.borders
    }), [country])


    // After Using UseFetch custom hooks
    // Update borders if it exists
    useEffect(() => {
        const fetchBorders = async () => {
            // Set Borders
            const borderCountries = await Promise.all(
                countryDetails.borders.map(async (border) => {
                    const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    const data = await res.json()
                    return data[0]
                }),
            )
            setBorders(borderCountries)
        }
        if (countryDetails.borders?.length) {
            fetchBorders()
        }
    }, [countryDetails])


    if (error) {
        return <NotFound />
    }
    return (
        <>

            {/* Back Button */}
            <NavLink className="back-button" to={'..'}>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" width="20px"
                        height="20px">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="48" d="M244 400L100 256l144-144M120 256h292" />
                    </svg>
                </i>
                <button>Back</button>
            </NavLink>
            {/* Details section */}
            <section className='country-detailed-page'>
                <div className="flag-container">
                    {countryDetails.flag
                        ? <img alt='' src={countryDetails.flag} />
                        : <SkeletonLoading width={450} height={337} />
                    }

                </div>
                <div className="details-container">
                    <h1>{countryDetails.name}</h1>
                    <div className="about-country">
                        <div className="details-country">
                            <span><b>Native Name:</b> {countryDetails.nativeName}</span>
                            <span><b>Population:</b> {countryDetails.population}</span>
                            <span><b>Region:</b> {countryDetails.region}</span>
                            <span><b>Sub Region:</b> {countryDetails.subRegion}</span>
                            <span><b>Capital: </b> {countryDetails.capital}</span>
                        </div>
                        <div className="details-country">
                            <span><b>Top Level Domain:</b> {countryDetails.tld}</span>
                            <span><b>Currencies:</b> {countryDetails.currency}</span>
                            <span><b>Languages:</b> {countryDetails.languages}</span>
                        </div>
                    </div>
                    <div className="border-countries-container">
                        <span><b>Border Countries:</b></span>
                        {
                            borders && borders.map(border => (
                                <NavLink key={border.cca3} to={`/countries/${border.name.common}`} className="border-countries">
                                    {border.name.common}
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>

    )
}

export default CountryDetails
