// Citation for the following functions: add animal form Event Listener and addRowToTable
// Date: 11/08/2022
// Adapted from nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify from add animal form
let addAnimalForm = document.getElementById('add-animal-form-ajax');

// Modify the objects we need
addAnimalForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputSpecies = document.getElementById("input-species");
    let inputIsSick = document.getElementById("input-is-sick");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let speciesValue = inputSpecies.value;
    let issickValue = inputIsSick.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        species_id: speciesValue,
        is_sick: issickValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    // Using POST method
    xhttp.open("POST", "/add-animal-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputSpecies.value = '';
            inputIsSick.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("animals-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let animalIdCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let speciesCell = document.createElement("TD");
    let issickCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    animalIdCell.innerText = newRow.animal_id;
    nameCell.innerText = newRow.name;
    speciesCell.innerText = newRow.species_name;
    issickCell.innerText = newRow.is_sick;

    // Create delete button
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteAnimal(newRow.animal_id);
    };

    // Add the cells to the row 
    row.appendChild(animalIdCell);
    row.appendChild(nameCell);
    row.appendChild(speciesCell);
    row.appendChild(issickCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.animal_id)

    // Add the row to the table
    currentTable.appendChild(row);

    
    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.is_sick;
    selectMenu.add(option);

    // Reload window
    window.location.reload();

}