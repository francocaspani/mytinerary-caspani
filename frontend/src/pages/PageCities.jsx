import TextField from '@mui/material/TextField';
import '../stylesheets/cities.css';
import data from '../data';
import Card from '../components/Card';
import { useState } from 'react';


export default function PageCities(){
  const [textFilter, setTextFilter]= useState('')
  const handleTextSearch = (event) => {
    setTextFilter(event.target.value)
  }

  const citiesToDisplay = data.filter(cities => cities.city.toLocaleLowerCase().startsWith(textFilter.trim().toLocaleLowerCase()))

  return(
    <div className="body-cities">
      <div className='container-input'><TextField 
      onKeyUp={handleTextSearch}
      sx={{mx:1}} id="search-cities" label="Search" variant="standard" /></div>
      <div className='container-cards'>
        {citiesToDisplay.length > 0 ?  citiesToDisplay.map(city => <Card key={city.id} city ={city} /> ) : <p>No cities availables</p>}

        
      </div>
    </div>

  )

}