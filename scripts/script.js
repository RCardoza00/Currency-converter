const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const result = document.querySelector(".exchange-rate");

const getButton = document.getElementById("convert-button");
//loop
console.log(dropList.length+"flag");
for(let i = 0; i<dropList.length; i++){
    for(currency_code in country_code){
        let selected;
        if(i === 0){
            //condición ? expr1 : expr2 
            //si es USD regresa selected si no una cadena vacia
            selected = currency_code == "USD" ? "selected" : "";
            
        }else if(i==1){
            selected = currency_code == "MXN" ? "selected" : "";
        }
        //se crea la etiqueta de opcion con el codigo de la moneda pasada como texto y valor
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //se insertan las opciones dentro de la etiqueta select
        dropList[i].insertAdjacentHTML("afterbegin",optionTag);
        //console.log(currency_code);
    }
    dropList[i].addEventListener("change",(params) => {
        changeFlag(params.target);
    });
}
//boton
getButton.addEventListener("click",(e) => {
    e.preventDefault(); //prevenimos que se envie el form
    getExchangeRate();
});
window.addEventListener("load",getExchangeRate);

function changeFlag(params){
    for(code in country_code){
        if(code == params.value){
            let imgTag = params.parentElement.querySelector("img");
            imgTag.src = `https://countryflagsapi.com/svg/${country_code[code]}`
        }
    }
}
function getExchangeRate(){
    
    const API_KEY = "db7b6783f7404ea27002dd81";
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    console.log(amountVal);
    //si no se pone nada en el input o se pone 0, por defecto se pone el valor de "1"
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`;
    console.log(url);
    fetch(url).then(response => response.json()).then(result =>{
        console.log(result.conversion_rates.MXN);
        let resultadini = result.conversion_rates[toCurrency.value];
        console.log(resultadini);
        let total = (amountVal*resultadini).toFixed(2);
        console.log(total);
        const resultado_texto = document.querySelector(".exchange-rate");
        resultado_texto.innerHTML = `${amountVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
        

    });
    
  
    //result = `${resultadini}`;
}