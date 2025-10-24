function handleVisibilityOfEmailFormatButtons() {
	const mailingListCheckbox = document.getElementById("mailingList");
	const radioGroupButtons = document.getElementById("radio-group");

	addEventListener("change", function () {
		if (mailingListCheckbox.checked) {
			radioGroupButtons.style.display = "block";
		} else {
			radioGroupButtons.style.display = "none";
		}
	});
}

window.addEventListener(
	"DOMContentLoaded",
	handleVisibilityOfEmailFormatButtons
);
