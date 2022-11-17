
// Get the objects we need to modify
console.log("it arrived at update_feeding.js");
let updateFeedingForm = document.getElementById('updateFeedingDate');

// Modify the objects we need
updateFeedingForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFeedingId = document.getElementById("mySelect");
    let inputUpdateDate = document.getElementById("input-update-date");

    // Get the values from the form fields
    let feeding_id = inputFeedingId.value;
    let feeding_date = inputUpdateDate.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // if (isNaN(sicknessValue)) 
    // {
    //     return;
    // }


    // Put our data we want to send in a javascript object
    let data = {
        feeding_id: feeding_id,
        feeding_date: feeding_date,
    }
 
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-feeding-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, feeding_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, feeding_id){
    let parsedData = JSON.parse(data);
    console.log("parsedData is", parsedData);
    let table = document.getElementById("feedings-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == feeding_id) {

            // Get the location of the row where we found the matching animal name
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of sickness value
            let td = updateRowIndex.getElementsByTagName("td")[4];
            
            // Reassign sick status to our value we updated to
            td.innerHTML = parsedData[0].feeding_date; 
       }
    }
}