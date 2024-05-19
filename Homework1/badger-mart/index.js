// !!! STOP !!!
// You should not need to modify anything below.
// See Step 9 for using your Badger ID to get today's feature,
// there is no code for you to do beyond here!

fetch("https://cs571.org/api/s24/hw1/featured-sale-item", {
	headers: {
		"X-CS571-ID": "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
	}
})
.then(res => {
	if (res.status === 200 || res.status === 304) {
		return res.json()
	} else {
		throw new Error();
	}
})
.then(data => {
	document.getElementById("feature").innerText = `Today's sale is ${data.name} for \$${data.price}, which can only be asked for at the service desk!`
})
.catch(err => {
	console.error("Could not get the featured item.")
})