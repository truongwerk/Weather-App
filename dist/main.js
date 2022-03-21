(() => {
	console.log("test web pak");
	let o = [];
	const t = document.querySelector("form"),
		e = document.querySelector("input");
	t.onsubmit = function (t) {
		(async function (t) {
			o = [];
			const e = `http://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=5&appid=071ccef383eb80fc1abfd8e75526cb0d`;
			try {
				const t = await fetch(e, { mode: "cors" });
				(o = await t.json()),
					(function (o) {
						0 === o.length
							? console.log("Location not found.")
							: (console.log(`Places: ${o[0].name},${o[0].country}`),
							  console.log(`Lat : ${o[0].lat}. Lon: ${o[0].lon} `),
							  (async function (o, t) {
									const e = `https://api.openweathermap.org/data/2.5/weather?lat=${o}&lon=${t}&appid=071ccef383eb80fc1abfd8e75526cb0d&units=metric`;
									try {
										const o = await fetch(e, { mode: "cors" }),
											t = await o.json();
										console.log(t);
									} catch (o) {
										console.log("Get Current Data Error" + o);
									}
							  })(o[0].lat, o[0].lon));
					})(o);
			} catch (o) {
				console.log("getLocation error" + o);
			}
		})(e.value),
			t.preventDefault();
	};
})();
