/**
 * Car Detail page logic.
 * Fetches a single car's details based on the 'id' parameter in the URL.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Read the car ID from the URL ──
  const params = new URLSearchParams(window.location.search);
  const carId = params.get('id');

  const loadingEl = document.getElementById('loading');
  const errorEl   = document.getElementById('error');
  const contentEl = document.getElementById('car-content');

  // ── 2. If no ID in URL, show error immediately ──
  if (!carId) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display   = 'block';
    return;
  }

  // ── 3. Fetch the car from the API using a JOIN ──
  // We use a JOIN to get the BrandName even though the cars table only has brandID.
  const sql = `SELECT cars.*, brands.BrandName AS brand FROM cars JOIN brands ON cars.brandID = brands.BrandId WHERE cars.id = ${carId}`;
  const apiUrl = `api.php?sql=${encodeURIComponent(sql)}`;

  fetch(apiUrl)
      .then(res => res.json())
      .then(result => {
        // Check if the API call was successful and if it actually found a row
        if (result.success && result.data.length > 0) {
          // Grab the first (and only) car object from the returned array
          renderCar(result.data[0]);
        } else {
          throw new Error('Car not found in the database');
        }
      })
      .catch((err) => {
        console.error(err);
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) errorEl.style.display   = 'block';
      });

  /**
   * Renders the car details on the page.
   * This function updates the DOM elements with data from the car object.
   * 
   * @param {Object} car - The car data from the database.
   */
  function renderCar(car) {
    if (!car) return;
    const brandName = car.brand || 'Unknown';
    const fullTitle = `${car.year} ${brandName} ${car.model}`;
    
    // Set text content for various elements
    const titleEl = document.getElementById('car-title');
    if (titleEl) titleEl.textContent = fullTitle;

    const priceEl = document.getElementById('car-price');
    if (priceEl) {
        priceEl.textContent = car.status === 'Price Upon Request'
            ? 'Price Upon Request'
            : `$${Number(car.price).toLocaleString('en-US')}`;
    }

    // Specs Section
    const yearBrandEl = document.getElementById('car-year-brand');
    if (yearBrandEl) yearBrandEl.textContent = `${car.year} ${brandName}`;

    const modelNameEl = document.getElementById('car-model-name');
    if (modelNameEl) modelNameEl.textContent = car.model;

    const engineEl = document.getElementById('car-engine');
    if (engineEl) engineEl.textContent = car.engine;

    const transEl = document.getElementById('car-transmission');
    if (transEl) transEl.textContent = car.transmission;

    const powerEl = document.getElementById('car-power');
    if (powerEl) powerEl.textContent = car.power;

    const mileageEl = document.getElementById('car-mileage');
    if (mileageEl) mileageEl.textContent = `${Number(car.mileage).toLocaleString('en-US')} km`;

    const speedEl = document.getElementById('car-top-speed');
    if (speedEl) speedEl.textContent = car.top_speed || 'N/A';

    const descEl = document.getElementById('car-description');
    if (descEl) descEl.textContent = car.description || '';

    // Image — set src using the path from the database
    const carImage = document.getElementById('car-image');
    if (carImage) {
        carImage.src = car.image_path || 'assets/photos/amggt-placeholder.jpg';
        carImage.alt = fullTitle;
    }

    // Show content, hide loading
    if (loadingEl) loadingEl.style.display = 'none';
    if (contentEl) contentEl.style.display = 'block';

    document.title = `${fullTitle} | EuroSpec`;
  }
});
