import display from "./display";
export default getData;

const apiKey = "071ccef383eb80fc1abfd8e75526cb0d";
const process = document.getElementById("process");
let geocoding = [];

function getData() {
	const form = document.querySelector("form");
	const input = document.querySelector("input");
	form.onsubmit = submit;
	function submit(e) {
		getLocation(input.value);
		input.value = "";
		e.preventDefault();
	}
	const gpsBtn = document.getElementById("gps");
	gpsBtn.addEventListener("click", getGPS);
	getLocation("ho chi minh");
}

async function getLocation(search) {
	geocoding = [];
	process.textContent = "--- LOADING ---";
	process.style.visibility = "visible";
	const requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;
	try {
		const response = await fetch(requestURL, { mode: "cors" });
		geocoding = await response.json();
		geocodingUsage(geocoding);
	} catch (error) {
		console.log("Geocoding Api Error" + error);
		process.textContent = "Geocoding Api Error";
	}
}

function geocodingUsage(geocoding) {
	if (geocoding.length === 0) {
		console.log("Location not found.");
		process.textContent = "Location not found.";
	} else {
		console.log(geocoding);
		console.log(`Places: ${geocoding[0].name},${geocoding[0].country}`);
		console.log(`Lat : ${geocoding[0].lat}. Lon: ${geocoding[0].lon} `);
		getCurrentWeather(geocoding[0].lat, geocoding[0].lon);
	}
}

async function getCurrentWeather(lat, lon) {
	const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	let currentWeather = undefined;
	try {
		const response = await fetch(requestURL, { mode: "cors" });
		currentWeather = await response.json();
		display(currentWeather, geocoding);
	} catch (error) {
		console.log("Current Weather Api Error" + error);
		process.textContent = "Current Weather Api Error";
	}
}

function getGPS() {
	navigator.geolocation.getCurrentPosition(gpsSuccess, gpsError, gpsOptions);
}
let gpsOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function gpsSuccess(pos) {
	geocoding = [];
	let coord = pos.coords;
	process.textContent = "--- LOADING ---";
	process.style.visibility = "visible";
	console.log("Your current position is:");
	console.log(`Latitude : ${coord.latitude}`);
	console.log(`Longitude: ${coord.longitude}`);
	console.log(`More or less ${coord.accuracy} meters.`);
	getCurrentWeather(coord.latitude, coord.longitude);
}

function gpsError(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

// async function reverseGeocoding(lat, lon) {
// 	const requestURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;
// 	try {
// 		const response = await fetch(requestURL, { mode: "cors" });
// 		const responseData = await response.json();
// 		console.log(responseData);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
