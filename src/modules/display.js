export default display;

const process = document.getElementById("process");
const city = document.getElementById("city");
const country = document.getElementById("country");
const weatherImage = document.getElementById("weather");
const temp = document.getElementById("temp");
const feelLike = document.getElementById("feelLike");
const moreInfo1 = document.getElementById("moreInfo1");
const moreInfo2 = document.getElementById("moreInfo2");
const latLon = document.getElementById("latLon");
const tempSwitch = document.getElementById("togBtn");

function display(data, geocoding) {
	process.style.visibility = "hidden";
	console.log(data);
	if (geocoding.length > 0) {
		city.textContent = geocoding[0].name;
		country.textContent = geocoding[0].country;
	} else {
		city.textContent = data.name;
		country.textContent = data.sys.country;
	}
	weatherImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
	change();
	tempSwitch.onchange = change;
	moreInfo1.textContent = `${data.weather[0].main},${data.weather[0].description}`;
	moreInfo2.textContent = `Humidity: ${data.main.humidity}% | Pressure: ${data.main.pressure}mb`;
	latLon.textContent = `Lat: ${data.coord.lat} | Lon: ${data.coord.lon}`;
	function change() {
		if (tempSwitch.checked === false) {
			tempDisplay(data, "c");
		} else {
			tempDisplay(data, "f");
		}
	}
}

function tempDisplay(data, mode) {
	temp.textContent = temperature(data.main.temp, mode);
	feelLike.textContent = `Feel like: ${temperature(
		data.main.feels_like,
		mode
	)}`;
}

function temperature(temp, mode) {
	let result;
	if (mode === "c") {
		result = Math.round(temp * 10) / 10;
		return `${result}°C`;
	} else {
		result = Math.round((temp * 1.8 + 32) * 10) / 10;
		return `${result}°F`;
	}
}
