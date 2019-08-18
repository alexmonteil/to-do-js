const button = document.getElementById("enter");
const input = document.getElementById("userinput");
const ul = document.querySelector("ul");
const li = document.querySelectorAll("li");
const deletebuttons = document.getElementsByClassName("deletebutton");


// Check for input value

const inputLength = () => {
	return input.value.length;
}

// Create a new list item with delete button

const createListElement = () => {
	const createli = document.createElement("li");
	const createDelete = document.createElement("button");
	createDelete.classList.add("deletebutton");
	createDelete.classList.add("hidedelete");
	createDelete.appendChild(document.createTextNode("Delete"));
	createli.appendChild(document.createTextNode(input.value));
	ul.appendChild(createli);
	ul.lastElementChild.appendChild(createDelete);
	input.value = "";
}


// Delete a list item 

const deleteListElement = (event) => {
	const deleteLiTarget = event.target.parentElement
	deleteLiTarget.remove();
}


// Add the new list item after click

const addListAfterClick = () => {
	if (inputLength() > 0) {
		createListElement();
		ul.lastElementChild.addEventListener("click", addOrToggleClassDoneAfterClick);
		ul.lastElementChild.lastElementChild.addEventListener("click", deleteListElement);
	}
}

// Add the new list item after keypress 'Enter'

const addListAfterKeypress = (event) => {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
		ul.lastElementChild.addEventListener("click", addOrToggleClassDoneAfterClick);
		ul.lastElementChild.lastElementChild.addEventListener("click", deleteListElement);
	}
}

// Add Class .done to classList

const addClassDone = (element) => {
	element.classList.add("done");
	element.lastElementChild.classList.toggle("hidedelete");
}

// Toggle Class .done on or off

const toggleClassDone = (element) => {
	element.classList.toggle("done");
	element.lastElementChild.classList.toggle("hidedelete");
}

// Decide to add or toggle class .done 

const addOrToggleClassDoneAfterClick = (event) => {
	const liToggle = event.target;
	if (liToggle.classList.contains("done") === false) {
		addClassDone(liToggle);
	} else {
		toggleClassDone(liToggle);
	}
}

// Add an event and consequence to multiple selected elements

const AddingEventToQueryAll = (element, eventtype, consequence) => {
	for (i = 0; i < element.length; i++) {
		element[i].addEventListener(eventtype, consequence);
	}
}


AddingEventToQueryAll(li, "click", addOrToggleClassDoneAfterClick);

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

AddingEventToQueryAll(deletebuttons, "click", deleteListElement);
