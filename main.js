function sendreq(url, request) {
	return fetch(url, {method: request})
};

console.log(document.getElementById("button"));
document.getElementById("button").onclick = function() {
	response = sendreq('http://127.0.0.1:7779', "GET");
	response.then(response => response).then(data => {
	console.log(data);
	if (data.status == 200) {
		document.getElementById("change").innerHTML = "OK!";
	} else if (data.status == 205) {
		document.getElementById("change").innerHTML = "Plugin Disabled! No connection to server!";
	} else if (data.status == 500) {
		document.getElementById("change").innerHTML = "500 Internal Server Error";
	};
	});
};