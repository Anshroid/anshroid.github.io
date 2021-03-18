console.log(document.getElementById("button"));
document.getElementById("button").onclick = function() {
	document.getElementById("change").innerHTML = ""
	response = fetch('https://anshroid.tk:7778', {method: "GET"}).catch(error => {
		document.getElementById("change").innerHTML = "Server offline or no connection!";
		throw "Forcing Return!";
	})
	response.then(response => response).then(data => {
	//console.log(data);
	if (data.status == 200) {
		sendtext = document.getElementById("input").value;
		enter = document.getElementById("checkbox").checked;
		if (enter == true) {
			enter = "Yes";
		} else {
			enter = "No";
		}
		response2 = fetch('https://anshroid.tk:7778?Action=send&Text=' + sendtext + "&Enter=" + enter, {method: "POST"});
		response2.then(response => response).then(data => {
			console.log(data.status.toString())
			if (data.status == 202) {
				document.getElementById("change").innerHTML = "Send OK!";
				document.getElementById("input").value = "";
			} else if (data.status == 500) {
				reason = data.statusText;
				if (reason == "noinput") {
					document.getElementById("change").innerHTML = "No Input Provided: Please enter something into the below box.";
				} else {
					document.getElementById("change").innerHTML = "Error: " + reason;
				}
			}
		});
	} else if (data.status == 205) {
		document.getElementById("change").innerHTML = "Plugin Disabled!";
	} else if (data.status == 500) {
		document.getElementById("change").innerHTML = "500 Internal Server Error";
	};
	});
};