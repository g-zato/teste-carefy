import React, {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'

export default function AutoComplete(props: any) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly City[]>([]);
  const loading = open && options.length === 0;

const handleCitySelection = ((event: object, value: City) => {
    axios.get('http://dataservice.accuweather.com/currentconditions/v1/'+ value.Key + '?apikey=' + import.meta.env.VITE_API_KEY + '&language=pt-br' )
    .then((res) => {
      //Atualiza state
      props.setWeatherData(res.data[0])
      props.setSelectedCity(value.LocalizedName)
      //Atualiza localStorage
      localStorage.setItem('weatherData', JSON.stringify(res.data[0]))
      localStorage.setItem('selectedCity', value.LocalizedName)
      localStorage.setItem('selectedCityKey', value.Key)
    })
    .catch((err) => alert('Houver um problema ao carregar os dados meteorológicos de ' + value.LocalizedName))
})
  let lastTimeout: number | null = null
 const handleInputChange = ((event: object, value: string) => {
     lastTimeout != null ? clearTimeout(lastTimeout) : null
     lastTimeout = setTimeout(() => {
      axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + import.meta.env.VITE_API_KEY + '&language=pt-br&q=' + value.replaceAll(' ', '%20'))
     .then((res) => {
       if(res.data != null) props.setCityList(res.data)
     })
     .catch((err) => console.log(err))
     }, 1200)
 })

  useEffect(() => {
    setOptions(props.cityList);
  }, [props.cityList]);

  return (
    <Autocomplete
      id="asynchronous"
      sx={props.weatherData ? props.weatherData.IsDayTime ? { width: 400 } : {width: 400, color: 'white', } : { width: 400 }}
      open={open}
      className={props.weatherData ? props.weatherData.IsDayTime ? '' : 'night-time' : ''}
      onSubmit={(() => console.log('enter'))}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.LocalizedName === value.LocalizedName}
      getOptionLabel={(option) => option.LocalizedName}
      options={options}
      loading={loading}
      disableClearable
      loadingText={"Carregando..."}
      noOptionsText={"Sem resultados"}
      onInputChange={handleInputChange}
      onChange={handleCitySelection}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pesquisa de cidade"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={25} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}