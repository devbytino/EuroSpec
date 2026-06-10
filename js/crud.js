/**
 * CRUD functions for managing cars (Create, Read, Update, Delete).
 * This script interacts with the 'cars' and 'brands' tables in the database.
 */

/**
 * READ: Fetches all cars from the database with their brand names and displays them in a list.
 * Uses a SQL JOIN to combine 'cars' and 'brands' tables.
 * This was generated with AI but heavily modified by me to fit the needs of the project and to add extra fields.
 * @async
 * @returns {Promise<void>}
 */
async function toonBeheerLijst() {
    // SELECT: we ask for columns from 'cars' and the 'BrandName' from 'brands'.
    // JOIN: we link the tables where brandID (in cars) matches BrandId (in brands).
    const producten = await runQuery("SELECT cars.id, cars.brandID, brands.BrandName AS brand, cars.model, cars.year, cars.price, cars.image_path, cars.transmission, cars.power, cars.description, cars.engine, cars.top_speed, cars.mileage FROM cars JOIN brands ON cars.brandID = brands.BrandId");

    const lijst = document.getElementById("carList");
    lijst.innerHTML = "";   // Clear the list before adding items

    for (const product of producten) {
        const item = document.createElement("li");
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.marginBottom = "10px";
        item.style.gap = "15px";

        // Create thumbnail
        const img = document.createElement("img");
        img.src = product.image_path || "assets/photos/amggt-placeholder.jpg"; // Fallback placeholder
        img.style.width = "60px";
        img.style.height = "40px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "4px";
        img.style.border = "1px solid var(--border-color)";
        item.appendChild(img);

        // Container for text content
        const info = document.createElement("div");
        info.style.flex = "1";
        const tekst = document.createTextNode(
            product.year + " " + product.brand + " " + product.model + " - \u20ac" + Number(product.price).toLocaleString('en-US')
        );
        info.appendChild(tekst);
        item.appendChild(info);

        // Button group
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";
        buttonGroup.style.margin = "0";

        // Edit Button
        const bewerkKnop = document.createElement("button");
        bewerkKnop.textContent = "Bewerken";
        bewerkKnop.className = "btn-secondary";
        bewerkKnop.style.padding = "4px 8px";
        bewerkKnop.style.fontSize = "0.8rem";
        bewerkKnop.addEventListener("click", function () {
            formulierVullen(product);
        });
        buttonGroup.appendChild(bewerkKnop);

        // Delete Button
        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "Verwijderen";
        verwijderKnop.className = "btn-secondary";
        verwijderKnop.style.padding = "4px 8px";
        verwijderKnop.style.fontSize = "0.8rem";
        verwijderKnop.style.color = "#ff4444";
        verwijderKnop.addEventListener("click", function () {
            productVerwijderen(product.id);
        });
        buttonGroup.appendChild(verwijderKnop);

        item.appendChild(buttonGroup);
        lijst.appendChild(item);
    }
}

/**
 * Populates the HTML form fields with data from a specific car object.
 * Used when the user clicks the "Bewerken" (Edit) button.
 * 
 * @param {Object} product - The car object containing data to fill.
 */
function formulierVullen(product) {
    document.getElementById("productId").value = product.id;
    document.getElementById("brandID").value = product.brandID;
    document.getElementById("model").value = product.model;
    document.getElementById("year").value = product.year;
    document.getElementById("price").value = product.price;
    document.getElementById("image_path").value = product.image_path || "";

    document.getElementById("mileage").value = product.mileage || "";
    document.getElementById("transmission").value = product.transmission || "";
    document.getElementById("power").value = product.power || "";
    document.getElementById("description").value = product.description || "";
    document.getElementById("engine").value = product.engine || "";
    document.getElementById("top_speed").value = product.top_speed || "";
}

/**
 * Clears all input fields in the management form.
 * Used after saving a product or when the user cancels editing.
 */
function formulierLeegmaken() {
    document.getElementById("productId").value = "";
    document.getElementById("brandID").value = "";
    document.getElementById("model").value = "";
    document.getElementById("year").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image_path").value = "";
    document.getElementById("mileage").value = "";
    document.getElementById("transmission").value = "";
    document.getElementById("power").value = "";
    document.getElementById("description").value = "";
    document.getElementById("engine").value = "";
    document.getElementById("top_speed").value = "";
}

/**
 * CREATE or UPDATE: Saves the form data to the database.
 * If productId is empty, it performs an INSERT (Create).
 * If productId has a value, it performs an UPDATE (Update).
 * 
 * @async
 * @returns {Promise<void>}
 */
async function productOpslaan() {
    // Get values from the form inputs
    const id = document.getElementById("productId").value;
    const brandID = document.getElementById("brandID").value;
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;
    const price = document.getElementById("price").value;
    const image_path = document.getElementById("image_path").value;
    const mileage = document.getElementById("mileage").value;
    const transmission = document.getElementById("transmission").value;
    const power = document.getElementById("power").value;
    const description = document.getElementById("description").value;
    const engine = document.getElementById("engine").value;
    const top_speed = document.getElementById("top_speed").value;
    const mileageValue = mileage === "" ? "NULL" : mileage;

    // Basic validation
    if (!brandID || !model || !year || !price) {
        alert("Vul a.u.b. alle verplichte velden in (Merk, Model, Jaar, Prijs).");
        return;
    }

    let sql;

    if (id === "") {
        // CREATE: Insert a new row into the 'cars' table
        sql = "INSERT INTO cars (brandID, model, year, price, image_path, mileage, transmission, power, description, engine, top_speed) " +
              "VALUES (" + brandID + ", '" + model + "', " + year + ", " + price + ", '" + image_path + "', " + mileageValue + ", '" + transmission + "', '" + power + "', '" + description + "', '" + engine + "', '" + top_speed + "')";
    } else {
        // UPDATE: Modify an existing row in the 'cars' table
        sql = "UPDATE cars SET " +
              "brandID = " + brandID + ", " +
              "model = '" + model + "', " +
              "year = " + year + ", " +
              "price = " + price + ", " +
              "image_path = '" + image_path + "', " +
              "mileage = " + mileageValue + ", " +
              "transmission = '" + transmission + "', " +
              "power = '" + power + "', " +
              "description = '" + description + "', " +
              "engine = '" + engine + "', " +
              "top_speed = '" + top_speed + "' " +
              "WHERE id = " + id;
    }

    const result = await runQuery(sql);

    // Check if runQuery returned the fallback data (empty array) which usually indicates failure for non-SELECTs 
    // unless we change runQuery to be more specific. But for now, we'll assume it worked if no alert from runQuery itself.

    // Refresh UI: clear form and reload the list
    formulierLeegmaken();
    toonBeheerLijst();
}


/**
 * DELETE: Removes a car from the database after user confirmation.
 * 
 * @async
 * @param {number|string} id - The unique ID of the car to delete.
 * @returns {Promise<void>}
 */
async function productVerwijderen(id) {
    // Ask for confirmation to prevent accidental deletions
    const zeker = confirm("Weet je zeker dat je dit product wilt verwijderen?");
    if (!zeker) {
        return;
    }

    // DELETE: Remove the row from the 'cars' table
    await runQuery("DELETE FROM cars WHERE id = " + id);

    // Refresh the list to show the item is gone
    toonBeheerLijst();
}
