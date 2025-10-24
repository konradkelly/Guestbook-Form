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

function handleVisibilityOfOtherField() {
	const otherField = document.getElementById("other-group");
	const meet = document.getElementById("meet");

	addEventListener("change", function () {
		if (meet.value === "other") {
			otherField.style.display = "block";
		} else {
			otherField.style.display = "none";
		}
	});
}

window.addEventListener("DOMContentLoaded", function () {
	handleVisibilityOfEmailFormatButtons();
	handleVisibilityOfOtherField();
});
