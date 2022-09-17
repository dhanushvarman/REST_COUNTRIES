let h1=document.createElement("h1");
h1.setAttribute("id","title");
h1.classList.add("text-center");
h1.innerHTML="Countries Data Using Api";

let div=document.createElement("div");
div.classList.add("container");

let row=document.createElement("div");
row.classList.add("row");

div.append(row);
document.body.append(h1,div);

async function foo(){
    let res=await fetch("https://restcountries.com/v2/all");
    let res1=await res.json();
    for(var i=0;i<res1.length;i++){
        row.innerHTML+=`
                <div class="card border-secondary mb-3" style="max-width: 20rem; margin-left:30px">
                    <div class="card-header" style="text-align:center"><b>${res1[i].name}</b></div>
                    <img src="${res1[i].flag}" class="card-img-top" style="height:200px; width:300px">
                    <div class="card-body text-secondary" id="weather_data${[i]}" style="text-align: center">
                        <h5 class="card-title"><b>CAPITAL:</b> ${res1[i].capital}</h5>
                        <h5 class="card-title"><b>REGION:</b> ${res1[i].region}</h5>
                        <h5 class="card-title"><b>COUNTRY CODE:</b> ${res1[i].topLevelDomain}</h5>
                        <button type="submit" id="weather${i}" class="btn btn-dark mt-2">Click for Weather</button>
                    </div>
                </div>`;
        let button=document.getElementById("weather"+[i]);
        button.addEventListener("click",foo2);
        async function foo2()
        {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${res1[i].name}&appid=45ad8d997675a066c64f7d4423784e5e`;
            let data=await fetch(url);
            let result=await data.json();
            // console.log(result.main.temp);
            let temp=((result.main.temp) - 273.15).toFixed(2) + "&#176C";
            let wd=document.getElementById("weather_data"+[i]);
            wd.innerHTML+=`<p class="card-text">Temperature: ${temp}</p>`
        }
    }
}

foo();