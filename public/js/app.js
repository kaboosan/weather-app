const weatherForm = document.querySelector('form');
const cityInput = document.querySelector('input');

const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msg1.textContent ="Recherche des infos..."
    msg2.textContent = "";

    fetch('http://localhost:3000/weather?location=' + cityInput.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error;
            }
            else{
                msg1.textContent = data.location;
                msg2.textContent = data.forecast.summary + " Température : " + data.forecast.temp + "°C."
            }
        })
    })
})