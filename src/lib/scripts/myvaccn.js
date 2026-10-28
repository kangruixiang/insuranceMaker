/* eslint-disable no-console */
// eslint-disable-next-line no-undef

// eslint-disable-next-line no-unused-vars
const { website, dates, diagnosisCode, cpt } = BOOKMARK;
const filter99203 = cpt.filter((cpt) => cpt.label == 99203); // filters cpt code to only have 99203 for later use
const cptChecked = cpt.filter((item) => item.checked == true); // filters checked cpt only
let line = 0;

// defines shadow dom and selects it
const shadow = document.getElementById('pgba-web-app-xpress-claims')?.shadowRoot;

// function to select inside shadow dom
function getInput(selector) {
	return shadow?.querySelector(selector);
}

// function get all inputs
function getAllInput(selector) {
	return shadow?.querySelectorAll(selector);
}

// function to work with date picker
function setInput(selector, value) {
	const input = getInput(selector);

	if (!(input instanceof HTMLInputElement)) return;

	input.focus();

	const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;

	setter?.call(input, value);

	input.dispatchEvent(
		new Event('input', {
			bubbles: true,
			composed: true
		})
	);

	input.dispatchEvent(
		new Event('change', {
			bubbles: true,
			composed: true
		})
	);

	input.blur();
}

// function for sleep
const sleep = (time) =>
	new Promise((resolve) => {
		setTimeout(resolve, time);
	});

// function to run async sleep
const timeOut = async (time) => {
	await sleep(time);
	console.log('slept for: ', time);
};

//function to fill the page
const fillLine = async (month, day, year, cpt) => {
	const serviceDate = `${month}/${day}/${year}`;
	setInput('#startDate', serviceDate);
	setInput('#endDate', serviceDate);

	// const placeOfService = getInput('[name="placeOfService"]');

	// placeOfService?.click();
	// const options = getAllInput('#placeOfService_list [role="option"]');
	// console.log(options);

	// options[9]?.click();

	setInput('#procedureCode', cpt.label);
	setInput('#charge', cpt.cost);
	setInput('#units', cpt.unit);
	setInput('#procedureCodeModifier1', cpt.modifier);

	for (const [index, pointer] of cpt.pointers.entries()) {
		const currentInput = '#diagnosisPointer' + (index + 1);
		setInput(currentInput, pointer);
	}

	const addLineButton = getInput('[data-testid="modal-add-claim-line-btn"]');

	addLineButton?.click();
	await timeOut(500);
};

//function to iterate each cpt code
async function iterCpt(month, day, year, cpts) {
	for (const cpt of cpts) {
		let result = await fillLine(month, day, year, cpt);
		console.log(result);
	}
	return new Promise((resolve) => {
		resolve('Finished iterCpt');
	});
}

//Function to iterate each date
async function fillDate() {
	for (const date of dates) {
		const [year, month, day] = date.split('-');

		if (line == 0 && filter99203[0].checked) {
			const codes = cptChecked.filter((item) => item.label != 99213);
			await iterCpt(month, day, year, codes);
		} else {
			const codes = cptChecked.filter((item) => item.label != 99203);
			await iterCpt(month, day, year, codes);
		}
	}
	alert('Finished filling insurance.');
}

fillDate();
