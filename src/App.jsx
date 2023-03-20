import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import APIForm from './Components/APIform';
import Gallery from './Components/gallery';

function App() {
  const [count, setCount] = useState(0)
  const [currentImage, setCurrentImage] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    weight: "",
    height: ""
  });
  const [outputs, setOutputs] = useState({
    name: "",
    weight: "",
    height: ""
  });
  const [prevImages, setPrevImages] = useState([]);

  let defaultValues = {
    name: "",
    weight: "",
    height: ""
  };
  
  const submitForm = () => {
      for (const [key, value] of Object.entries(inputs)) {
        if (value == ""){
          inputs[key] = defaultValues[key]
        }
      }
      makeQuery();

  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    if (json[0].url == null){
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      setCurrentImage(json[0].url);
      setPrevImages((images) => [...images, json[0].url]);
      setOutputs({
        name: json[0].breeds[0].name,
        weight: json[0].breeds[0].weight.metric,
        height: json[0].breeds[0].height.metric
      });
      reset();
    }
  
  }

  const reset = () => {
    setInputs({
      name: "",
      weight: "",
      height: ""
    });
    
  }

  const setFilter = (keys) => {
    
    if(keys == 1)
      setInputs({
        name: outputs.name
      });
    if(keys == 2)
      setInputs({
        height: outputs.height
      });
    if(keys == 3)
    setInputs({
      height: outputs.weight
    });
  }
  

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    let query = `https://api.thedogapi.com/v1/images/search?api_key=live_LdILMVcZMhsdukGROUNGyvjsXnUrez5cb4aqwU3hlR5KwMWLyC7gWcKofRhHVfk2&format=${response_type}&limit=1&has_breeds=1`;
    callAPI(query).catch(console.error);
  }
  return (
    <div className="whole-page">
    <h1>Find Your Dog!</h1>
    Breed: {outputs.name}
    <br />
    Height: {outputs.height}
    
    <br />
    Weight: {outputs.weight}
    <br />
    <h2>Banlist:</h2>
    {inputs.name && <div>{inputs.name}</div>}
    {inputs.height && <div>{inputs.height}</div>}
    {inputs.weight && <div>{inputs.weight}</div>}
    <APIForm
      inputs={inputs}
      handleChange={(e) =>
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value.trim(),
        }))
      }
      onSubmit={submitForm}
      outputs={outputs}
      setFilter = {setFilter}
    />
    <br />
    {currentImage ? (
      <img
        className="screenshot"
        src={currentImage}
        alt="Screenshot returned"
      />
    ) : (
      <div> </div>
    )}
    <br></br>

      
      <div className="container">
      <Gallery images={prevImages} />
    
    </div>

    <br></br>

  </div>
);
}
  


export default App
