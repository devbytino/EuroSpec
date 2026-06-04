// crud.js
// De CRUD-operaties voor producten: Create, Read, Update, Delete.
// Heeft app.js nodig (voor runQuery).
//
// LET OP: we plakken hier waarden rechtstreeks in de SQL-string.
// Dat is simpel om te leren, maar onveilig (SQL injection).
// In de echte cursus gebruik je hiervoor prepared statements.

// --- READ: alle producten tonen in de lijst ---
async function toonBeheerLijst() {
    const producten = await runQuery("SELECT id, brand, brandId, model, year FROM cars");

    const lijst = document.getElementById("productenLijst");
    lijst.innerHTML = "";   // Eerst leegmaken

    for (const product of producten) {
        const item = document.createElement("li");

        // Tekst van het product
        const tekst = document.createTextNode(
            product.naam + " - \u20ac" + product.prijs + " "
        );
        item.appendChild(tekst);

        // Knop: bewerken -> zet het product in het formulier
        const bewerkKnop = document.createElement("button");
        bewerkKnop.textContent = "Bewerken";
        bewerkKnop.addEventListener("click", function () {
            formulierVullen(product);
        });
        item.appendChild(bewerkKnop);

        // Knop: verwijderen
        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "Verwijderen";
        verwijderKnop.addEventListener("click", function () {
            productVerwijderen(product.id);
        });
        item.appendChild(verwijderKnop);

        lijst.appendChild(item);
    }
}

// --- Formulier vullen met een bestaand product (voor bewerken) ---
function formulierVullen(product) {
    document.getElementById("productId").value = product.productid;
    document.getElementById("naam").value = product.naam;
    document.getElementById("prijs").value = product.prijs;
    document.getElementById("categorieId").value = product.categorie_id;
}

// --- Formulier leegmaken (na opslaan of bij annuleren) ---
function formulierLeegmaken() {
    document.getElementById("productId").value = "";
    document.getElementById("naam").value = "";
    document.getElementById("prijs").value = "";
    document.getElementById("categorieId").value = "";
}

// --- CREATE of UPDATE: opslaan ---
// Is het verborgen id leeg -> nieuw product (INSERT).
// Staat er een id -> bestaand product (UPDATE).
async function productOpslaan() {
    const id = document.getElementById("productId").value;
    const naam = document.getElementById("naam").value;
    const prijs = document.getElementById("prijs").value;
    const categorieId = document.getElementById("categorieId").value;

    let sql;

    if (id === "") {
        // CREATE: nieuw product toevoegen
        sql = "INSERT INTO producten (naam, prijs, categorie_id) " +
              "VALUES ('" + naam + "', " + prijs + ", " + categorieId + ")";
    } else {
        // UPDATE: bestaand product wijzigen
        sql = "UPDATE producten SET " +
              "naam = '" + naam + "', " +
              "prijs = " + prijs + ", " +
              "categorie_id = " + categorieId + " " +
              "WHERE productid = " + id;
    }

    await runQuery(sql);

    // Formulier leegmaken en lijst opnieuw laden
    formulierLeegmaken();
    toonBeheerLijst();
}

// --- DELETE: verwijderen ---
async function productVerwijderen(id) {
    // Vraag eerst om bevestiging
    const zeker = confirm("Weet je zeker dat je dit product wilt verwijderen?");
    if (!zeker) {
        return;
    }

    await runQuery("DELETE FROM producten WHERE productid = " + id);

    // Lijst opnieuw laden
    toonBeheerLijst();
}
