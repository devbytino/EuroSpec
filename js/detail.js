document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Read the car ID from the URL ──
  const params = new URLSearchParams(window.location.search);
  const carId = params.get('id');

  const loadingEl = document.getElementById('loading');
  const errorEl   = document.getElementById('error');
  const contentEl = document.getElementById('car-content');

  // ── 2. If no ID in URL, show error immediately ──
  if (!carId) {
    loadingEl.style.display = 'none';
    errorEl.style.display   = 'block';
    return;
  }

  // ── 3. Fetch the car from the API ──
  // ── 3. Fetch the car from the API ──
  const sql = `SELECT * FROM cars WHERE id = ${carId}`;
  const apiUrl = `http://localhost/EuroSpec/EuroSpec_Final/api.php?sql=${encodeURIComponent(sql)}`;

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
        loadingEl.style.display = 'none';
        errorEl.style.display   = 'block';
      });

  /**
   * Renders the car details on the page.
   * This function is called when the car data is successfully fetched from the API.
   * updates dom elements with car data
   * gets image path from database
   * @param car
   * @returns {void}
   */
  function renderCar(car) {
    const fullTitle = `${car.year} ${car.brand} ${car.model}`;
    document.getElementById('car-title').textContent = fullTitle;

    document.getElementById('car-price').textContent = car.status === 'Price Upon Request'
        ? 'Price Upon Request'
        : `$${Number(car.price).toLocaleString('en-US')}`;

    // Specs Section
    document.getElementById('car-year-brand').textContent = `${car.year} ${car.brand}`;
    document.getElementById('car-model-name').textContent = car.model;
    document.getElementById('car-engine').textContent     = car.engine;
    document.getElementById('car-transmission').textContent = car.transmission;
    document.getElementById('car-power').textContent        = car.power;
    document.getElementById('car-mileage').textContent      = `€{Number(car.mileage).toLocaleString('en-US')} km`;
    document.getElementById('car-top-speed').textContent    = car.top_speed || 'N/A';

    document.getElementById('car-description').textContent = car.description || '';

    // Image — use the path directly from DB
    const carImage = document.getElementById('car-image');
    carImage.src = car.image_path;
    carImage.alt = fullTitle;

    // Show content, hide loading
    loadingEl.style.display = 'none';
    contentEl.style.display = 'block';

    document.title = `${fullTitle} | EuroSpec`;
  }
});
