const APIForm = ({inputs,outputs, setFilter, onSubmit}) => {
    const inputsInfo = [
        "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
        "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
        "Input true or false if you would like your website screenshot to not contain any ads",
        "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
        "Choose the width of your screenshot (in pixels)",
        "Choose the height of your screenshot (in pixels)",
      ];
    return (
      <div>
        <h2> Filters: </h2>
        {outputs.name ? <button type="submit" className="button" value={outputs.name} onClick={() => setFilter(1)}>{outputs.name}</button> : <div>No options yet, click the button below to start.</div>}
        {outputs.height && <button type="submit" className="button" value ={outputs.height} onClick={() => setFilter(2)}>{outputs.height}</button>}
        {outputs.weight && <button type="submit" className="button" value ={outputs.weight} onClick={() => setFilter(3)}>{outputs.weight}</button>}
        <h2> New Picture: </h2>
    <button type="submit" className="button" onClick={onSubmit}>
    Find that Dog!
    </button>
      </div>
    );
  };
  
  export default APIForm;