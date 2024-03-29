import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-99fa1-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addBtn = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");

inputField.addEventListener("keypress", (event) => {
  // Check if the pressed key is Enter and the value is not empty
  if (event.key === "Enter" && inputField.value.trim() !== "") {
    let inputValue = inputField.value.trim(); // Trim leading/trailing spaces
    push(shoppingListInDB, inputValue);
    clearInputField();
  }
});

addBtn.addEventListener("click", () => {
  // Check if the input field value is not empty
  if (inputField.value.trim() !== "") {
    let inputValue = inputField.value.trim();
    push(shoppingListInDB, inputValue);
    clearInputField();
  }
});
function appendItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.classList.add(
    "bg-[#DCE1EB]",
    "shadow-md",
    "p-4",
    "rounded-lg",
    "text-[#131314]",
    "text-xl",
    "font-[Rubik]",
    "flex-grow",
    "text-center",
    "hover:bg-[#C2F7FF]",
    "hover:cursor-pointer"
  );
  newEl.textContent = itemValue;
  newEl.addEventListener("click", () => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
  shoppingList.append(newEl);
}

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearShoppingList();
    for (let i = 0; i < itemsArray.length; i++) {
      const currentItem = itemsArray[i];
      appendItemToShoppingList(currentItem);
    }
  } else {
    shoppingList.innerHTML = "No items here... yet";
  }
});
function clearShoppingList() {
  shoppingList.innerHTML = "";
}
function clearInputField() {
  inputField.value = "";
}
const toggleButton = document.getElementById("toggle");
const toggleLabel = document.getElementById("toggle-label");
const body = document.body;

// Initial theme check (optional):
// Initial theme check (optional):
const savedTheme = localStorage.getItem("theme");
let theme = savedTheme || "light"; // Set default theme to light if not saved

const fontColorLight = "#333"; // Light theme font color
const fontColorDark = "#ddd"; // Dark theme font color

// Toggle button event listener:
toggleButton.addEventListener("click", () => {
  if (theme === "light") {
    localStorage.setItem("theme", "dark");
    theme = "dark";
  } else {
    localStorage.setItem("theme", "light");
    theme = "light";
  }

  applyTheme(theme); // Apply the theme based on the updated value
});

// Function to apply theme based on stored preference:
function applyTheme(theme) {
  body.classList.remove("bg-white", "bg-[#131314]"); // Remove both body classes
  body.classList.add(theme === "light" ? "bg-white" : "bg-[#131314]");

  // Apply font color based on theme
  document.body.style.color =
    theme === "light" ? fontColorLight : fontColorDark;
}

// Apply theme on initial load:
applyTheme(theme);
