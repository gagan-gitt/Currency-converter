//URL of API
let baseURL = "https://api.frankfurter.app/latest?from=USD&to=EUR";

//Selecting elements
let select = document.querySelectorAll(".dropdowns select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from-select select");
let toCurr = document.querySelector(".to-select select");
let input = document.querySelector("form input");
let msg = document.querySelector("#msg");

//Adding currency codes to the dropdowns
for(let abc of select){
    for(let def in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = def;
        newOption.value = def;
        if(abc.name === "from" && def === "USD")
        {
            newOption.selected = "selected";
        }
        else if(abc.name === "to" && def === "INR")
        {
            newOption.selected = "selected";
        }
        abc.append(newOption);
    }
    abc.addEventListener("change",(evt)=>
    {
        flag(evt.target);  
    })
}

//Flag change with change in currency
function flag(element)
{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

//To prevent default behaviour of button
btn.addEventListener("click", (evt)=>
{
    evt.preventDefault();
    getExchange();
    
})

//Exchange currency value
async function getExchange(){
    let newURL = `https://api.frankfurter.app/latest?from=${fromCurr.value}&to=${toCurr.value}`
    let response = await fetch(newURL);
    let data = await response.json();
    let amt = data["rates"][toCurr.value];
    let inputAmt = input.value;
    let finalAmount = inputAmt * amt;
    msg.innerText = `${inputAmt} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

//Getting exchange value when page loads
window.addEventListener("load", ()=>
{
    getExchange();
})