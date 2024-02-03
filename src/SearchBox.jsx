import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}){

    let [city,setCity]=useState("");
    let [error,setError]=useState(false);
    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="0692ba1ca35bae830dd56094329aa04f";

    let getWeatherInfo=async() =>{
    try{
        let respose=await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    let jsonRespose=await respose.json();
    
    let result={
        city:city,
        temp:jsonRespose.main.temp,
        tempMin:jsonRespose.main.temp_min,
        tempMax:jsonRespose.main.temp_max,
        humidity:jsonRespose.main.humidity,
        feelslike:jsonRespose.main.feels_like,
        weather:jsonRespose.weather[0].description,

    }
    console.log(result);
    return result;

    }catch(err){
       throw err;
    }
    
    };
    

    let handleChange=(evt)=>{
        setCity(evt.target.value);
    }

    let handleSumbit=async(evt)=>{
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newInfo=await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
        
    }

    return(
        <div className='SearachBox'>
            
            <form onSubmit={handleSumbit}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
                <br></br><br></br>
                <Button variant="contained" type="submit">Search</Button>
                {error && <p style={{color:"red"}}>No such place exits</p>}
            </form>
        </div>
    )
}