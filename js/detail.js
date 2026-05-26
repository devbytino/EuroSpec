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
  fetch(`http://localhost:3000/api/cars/${carId}`)
    .then(res => {
      if (!res.ok) throw new Error('Car not found');
      return res.json();
    })
    .then(car => {
      renderCar(car);
    })
    .catch(() => {
      loadingEl.style.display = 'none';
      errorEl.style.display   = 'block';
    });

  // ── 4. Fill the page with car data ──
  function renderCar(car) {
    const fullTitle = `${car.year} ${car.brand} ${car.model}`;
    document.getElementById('car-title').textContent = fullTitle;

    // Price or status
    const displayPrice = car.status === 'Price Upon Request'
      ? 'Price Upon Request'
      : `$${Number(car.price).toLocaleString('en-US')}`;
    document.getElementById('car-price').textContent = displayPrice;

    // Specs Section
    document.getElementById('car-year-brand').textContent = `${car.year} ${car.brand}`;
    document.getElementById('car-model-name').textContent = car.model;
    document.getElementById('car-engine').textContent     = car.engine;
    document.getElementById('car-transmission').textContent = car.transmission;
    document.getElementById('car-power').textContent        = car.power;
    document.getElementById('car-mileage').textContent      = `${Number(car.mileage).toLocaleString('en-US')} km`;
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
