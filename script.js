// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 8f8584b331db29f5a91181990ba79318

// Event Listener function on key press
const weatherApi = {
	key: "8f8584b331db29f5a91181990ba79318",
	baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input_box');

searchInputBox.addEventListener('keypress' , (event) => {
	if(event.keyCode == 13){
		console.log(searchInputBox.value);
		getWeatherReport(searchInputBox.value);
		document.querySelector('.weather_body').style.display = 'block';

	}
})

// Get weather report
function getWeatherReport(city) {
	fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
	.then(weather => {
		return weather.json();
	}).then(showWeatherReport);
}

// Show weather reoprt
function showWeatherReport(weather) {	
	console.log('weather');
	let city = document.getElementById('city');
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let temp = document.getElementById('temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

	let min_max = document.getElementById('min_max');
	min_max.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`
	
	let weatherType = document.getElementById('weather');
	weatherType.innerText = `${weather.weather[0].main}`; 

	let date = document.getElementById('date');
	let todayDate = new Date();
	date.innerText = dateManage(todayDate);

	if(weatherType.textContent == 'Clear'){
		document.body.style.backgroundImage = 'url(bg_images/clear.jpg)';
	}else if(weatherType.textContent == 'Haze'){
		document.body.style.backgroundImage = 'url(bg_images/haze.jpg)';
	}else if(weatherType.textContent == 'Clouds'){
		document.body.style.backgroundImage = 'url(bg_images/cloud.jpg)';
	}else if(weatherType.textContent == 'Rain'){
		document.body.style.backgroundImage = 'url(bg_images/rain.jpg)';
	}else if(weatherType.textContent == 'Snow'){
		document.body.style.backgroundImage = 'url(bg_images/snow.jpg)';
	}else if(weatherType.textContent == 'Thunderstorm'){
		document.body.style.backgroundImage = 'url(bg_images/thunderstorm.jpg)';
	}
}

// Date managing
function dateManage(dateArg){
	let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
	let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
	let year = dateArg.getFullYear();
	let month = months[dateArg.getMonth()];
	let date = dateArg.getDate();
	let day = days[dateArg.getDay()];

	return `${date} ${month} (${day}), ${year}`;
}