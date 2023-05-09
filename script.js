const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=769b4ca09ff34420bfb110124230905&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();
        updateDOM(data);
    }catch(error){
        alert("Location Not Found!");
    }
}

function updateDOM(data) {
    temperatureField.innerText = `${data.current.temp_c}°`;
    cityField.innerText = data.location.name;
    emojiField.src = data.current.condition.icon;
    weatherField.innerText = data.current.condition.text;
    const time = data.location.localtime.split(" ")[1];
    const date = data.location.localtime.split(" ")[0];
    const dayNumber = new Date(date).getDay();
    const dayName = getDayName(dayNumber);
    dateField.innerText = `${time} - ${dayName} ${date}`
}

function getDayName(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thrusday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let target = searchField.value;
    fetchData(target);
    target="";
})

