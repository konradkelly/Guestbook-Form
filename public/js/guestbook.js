// helper function to catch required fields that are empty
function validateRequired(input) {
	if (input === "") {
		return "This field cannot be blank";
	}
	return "";
}

function formatFirstName() {
	const fname = document.getElementById("fname");
	const errorSpan = document.getElementById("err-fname");

	fname.addEventListener("change", function () {
		const input = fname.value.trim();
		const error = validateRequired(input);
		errorSpan.textContent = error;
	});
}

function formatLastName() {
	const lname = document.getElementById("lname");
	const errorSpan = document.getElementById("err-lname");

	lname.addEventListener("change", function () {
		const input = lname.value.trim();
		const error = validateRequired(input);
		errorSpan.textContent = error;
	});
}

function formatEmail() {
	const email = document.getElementById("email");
	const errorSpan = document.getElementById("err-email");
	const mailingListCheckbox = document.getElementById("mailingList");

	email.addEventListener("change", function () {
		const emailInput = email.value.trim();
		const error = validateEmail(emailInput, mailingListCheckbox.checked);
		errorSpan.textContent = error;
	});
}

function validateEmail(emailInput, mailingListChecked) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (mailingListChecked || emailInput !== "") {
		if (emailRegex.test(emailInput)) {
			return "";
		} else {
			return "Please enter a valid email address";
		}
	}
	return "";
}

function formatLinkedIn() {
	const linkedIn = document.getElementById("linkedin");
	const errorSpan = document.getElementById("err-linkedin");

	linkedIn.addEventListener("change", function () {
		const urlInput = linkedIn.value.trim();
		const error = validateLinkedIn(urlInput);
		errorSpan.textContent = error;
	});
}

function validateLinkedIn(urlInput) {
	const LinkedInURLStart = "https://linkedin.com/in/";

	if (urlInput !== "" && urlInput.startsWith(LinkedInURLStart)) {
		return "";
	} else if (urlInput !== "") {
		return "LinkedIn URL must start with 'https://linkedin.com/in/'";
	}
	return "";
}

function formatMeet() {
	const meet = document.getElementById("meet");
	const errorSpan = document.getElementById("err-meet");

	meet.addEventListener("change", function () {
		const input = meet.value;
		const error = validateRequired(input);
		errorSpan.textContent = error;
	});
}

function handleVisibilityOfEmailFormatButtons() {
	const mailingListCheckbox = document.getElementById("mailingList");
	const radioGroupButtons = document.getElementById("radio-group");

	mailingListCheckbox.addEventListener("change", function () {
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

	meet.addEventListener("change", function () {
		if (meet.value === "other") {
			otherField.style.display = "block";
		} else {
			otherField.style.display = "none";
		}
	});
}

function handleFormSubmit() {
	const form = document.querySelector("form");

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		let isValid = true;

		// Validate first name
		const fname = document.getElementById("fname");
		const fnameError = document.getElementById("err-fname");
		const fnameErrorMessage = validateRequired(fname.value.trim());
		fnameError.textContent = fnameErrorMessage;
		if (fnameErrorMessage) isValid = false;

		// Validate last name
		const lname = document.getElementById("lname");
		const lnameError = document.getElementById("err-lname");
		const lnameErrorMessage = validateRequired(lname.value.trim());
		lnameError.textContent = lnameErrorMessage;
		if (lnameErrorMessage) isValid = false;

		// Validate email
		const email = document.getElementById("email");
		const emailError = document.getElementById("err-email");
		const mailingListCheckbox = document.getElementById("mailingList");
		const emailErrorMessage = validateEmail(
			email.value.trim(),
			mailingListCheckbox.checked
		);
		emailError.textContent = emailErrorMessage;
		if (emailErrorMessage) isValid = false;

		// Validate LinkedIn
		const linkedIn = document.getElementById("linkedin");
		const linkedInError = document.getElementById("err-linkedin");
		const linkedInErrorMessage = validateLinkedIn(linkedIn.value.trim());
		linkedInError.textContent = linkedInErrorMessage;
		if (linkedInErrorMessage) isValid = false;

		// Validate "How did we meet?"
		const meet = document.getElementById("meet");
		const meetError = document.getElementById("err-meet");
		const meetErrorMessage = validateRequired(meet.value);
		meetError.textContent = meetErrorMessage;
		if (meetErrorMessage) isValid = false;

		// Submit form if valid. Will resolve if variable is valid is equal to the boolean 'true'.
		if (isValid) {
			console.log("The form is valid! Now submitting.");
			//form.submit(); // will uncomment after building backend
		} else {
			console.log("Error: the form contains errors to be resolved.");
		}
	});
}

window.addEventListener("DOMContentLoaded", function () {
	handleVisibilityOfEmailFormatButtons();
	handleVisibilityOfOtherField();
	formatFirstName();
	formatLastName();
	formatEmail();
	formatLinkedIn();
	formatMeet();
	handleFormSubmit();
});
