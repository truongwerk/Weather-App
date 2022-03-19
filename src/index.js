console.log("test web pak");
let geocoding = [];
const form = document.querySelector("form");
const input = document.querySelector("input");
form.onsubmit = submit;
function submit(e) {
	getLocation(input.value);
	e.preventDefault();
}

async function getLocation(search) {
	geocoding = [];
	const requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=071ccef383eb80fc1abfd8e75526cb0d`;
	try {
		const response = await fetch(requestURL, { mode: "cors" });
		geocoding = await response.json();
		geocodingUsage(geocoding);
	} catch (error) {
		console.log("getLocation error" + error);
	}
}

function geocodingUsage(geocoding) {
	if (geocoding.length === 0) {
		console.log("Location not found.");
	} else {
		console.log(`Places: ${geocoding[0].name},${geocoding[0].country}`);
		console.log(`Lat : ${geocoding[0].lat}. Lon: ${geocoding[0].lon} `);
		getCurrentWeather(geocoding[0].lat, geocoding[0].lon);
	}
}

async function getCurrentWeather(lat, lon) {
	const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=071ccef383eb80fc1abfd8e75526cb0d&units=metric`;
	try {
		const response = await fetch(requestURL, { mode: "cors" });
		const responseData = await response.json();
		console.log(responseData);
	} catch (error) {
		console.log("Get Current Data Error" + error);
	}
}
