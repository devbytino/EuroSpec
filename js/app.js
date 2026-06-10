/**
 * API_URL: the address of the API to which we send our SQL queries.
 * We use a relative path so it works regardless of your local folder name.
 */
const API_URL = "api.php";

// Fallback data: empty array to prevent crashes if the API is down
const FALLBACK_PRODUCTEN = [];

/**
 * Sends an SQL string to the API and returns the result.
 * 
 * @async
 * @param {string} sql - The SQL query to execute.
 * @returns {Promise<Array>} - Returns an array of rows if successful.
 */
async function runQuery(sql) {
  try {
    const response = await fetch(API_URL + "?sql=" + encodeURIComponent(sql));
    const result = await response.json();

    if (result.success) {
      return result.data;          // Array met rijen
    } else {
      console.error("SQL fout in runQuery:", result.error);
      alert("Er is een fout opgetreden bij het uitvoeren van de query: " + result.error);
      return FALLBACK_PRODUCTEN;   // Bij een fout: fallback data
    }
  } catch (fout) {
    console.error("API niet bereikbaar in runQuery:", fout);
    return FALLBACK_PRODUCTEN;
  }
}

/**
 * Updates all theme-managed logos based on the current theme.
 * @param {'light'|'dark'} theme - The current active theme.
 */
function updateLogos(theme) {
  const logos = document.querySelectorAll('.theme-managed-logo');
  logos.forEach(logo => {
    const newSrc = theme === 'light' ? logo.getAttribute('data-light-src') : logo.getAttribute('data-dark-src');
    if (newSrc) {
      logo.src = newSrc;
    }
  });
}

/**
 * Initialises theme based on preference and sets up toggle listener.
 */
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  updateLogos(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateLogos(targetTheme);
    });
  }
}

/**
 * Initializes mobile navigation toggle.
 */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Featured Inventory: Randomly selects 3 cars and displays them.
 * 
 * @async
 */
async function initFeaturedInventory() {
  const featuredGrid = document.getElementById('featured-grid');
  if (!featuredGrid) return;

  try {
    // Using specific column names for better compatibility
    const allCars = await runQuery("SELECT cars.id, cars.brandID, brands.BrandName AS brand, cars.model, cars.year, cars.price, cars.image_path, cars.status, cars.description FROM cars JOIN brands ON cars.brandID = brands.BrandId");

    console.log("Featured Inventory - Cars fetched:", allCars);

    if (allCars.length === 0) {
      featuredGrid.innerHTML = '<p>No featured vehicles are available.</p>';
      return;
    }

    // Select 3 random cars
    const shuffled = [...allCars].sort(() => 0.5 - Math.random());
    const featuredCars = shuffled.slice(0, 3);

    featuredGrid.innerHTML = featuredCars.map(car => {
      const displayPrice = car.status === 'Price Upon Request'
        ? 'Price Upon Request'
        : `$${Number(car.price).toLocaleString('en-US')}`;

      const brandName = car.brand || 'Unknown';
      const imagePath = car.image_path || 'assets/photos/amggt-placeholder.jpg';

      const badges = ['New Arrival', 'Rare Find', 'Top Spec', 'Exquisite'];
      if (car.year < 2005) {
          badges.length = 1;
          badges[0] = 'Classic';
      } else if (car.year >= 2020) {
          badges.length = 2;
          badges[0] = 'New Arrival';
      }
      const badgeText = Math.random() < 0.5 ? badges[Math.floor(Math.random() * badges.length)] : '';
      
      return `
        <div class="inventory-card">
          <div class="card-image">
            <img src="${imagePath}" alt="${brandName} ${car.model}" />
            ${badgeText ? `<div class="card-badge">${badgeText}</div>` : ''}
          </div>
          <div class="card-content">
            <div class="card-meta">${car.year} • ${brandName.toUpperCase()}</div>
            <h3>${car.model}</h3>
            <p>${car.description || 'Experience the pinnacle of European engineering and performance.'}</p>
            <div class="card-footer">
              <span class="price">${displayPrice}</span>
              <a href="car-detail.html?id=${car.id}" class="btn-outline">Details</a>
            </div>
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error('Failed to load featured inventory:', error);
    featuredGrid.innerHTML = '<p>Check back soon for our latest arrivals.</p>';
  }
}

/**
 * Main initialization on DOM content loaded.
 */
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initFeaturedInventory();
  
  // Handle Inventory Page if we are on it
  const carGrid = document.getElementById('car-grid');
  if (carGrid) {
    initInventoryPage(carGrid);
  }

  // Smooth appearance on scroll (Intersection Observer)
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });
});

/**
 * Logic for the Inventory page (filtering and list rendering).
 * @param {HTMLElement} carGrid - The container element for the car list.
 */
async function initInventoryPage(carGrid) {
  const brandMap = {
    'mercedes': 'Mercedes-Benz',
    'bmw':      'BMW',
    'audi':     'Audi',
    'porsche':  'Porsche'
  };

  let allCars = [];

  function createCarCard(car) {
    const displayPrice = car.status === 'Price Upon Request'
      ? 'Price Upon Request'
      : `$${Number(car.price).toLocaleString('en-US')}`;

    const brandName = car.brand || 'Unknown';
    const imagePath = car.image_path || 'assets/photos/amggt-placeholder.jpg';

    return `
    <article class="vehicle-card" data-brand="${brandName.toLowerCase().replace('-', '')}">
      <a href="car-detail.html?id=${car.id}">
        <img src="${imagePath}" alt="${car.year} ${brandName} ${car.model}" />
        <div class="vehicle-info">
          <div>
            <h2>${car.year} ${car.model}</h2>
            <p>${brandName}</p>
          </div>
          <div class="vehicle-meta">
            <strong>${displayPrice}</strong>
            <span>${Number(car.mileage).toLocaleString()} km</span>
          </div>
        </div>
      </a>
    </article>
  `;
  }

  function renderCars(cars) {
    if (cars.length === 0) {
      carGrid.innerHTML = '<p class="no-results">No vehicles were found.</p>';
      return;
    }
    carGrid.innerHTML = cars.map(createCarCard).join('');
  }

  async function loadCars() {
    carGrid.innerHTML = '<p class="no-results">Loading vehicles...</p>';

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const filterParam = urlParams.get('filter')?.toLowerCase();

      // Use the same query as CRUD
      allCars = await runQuery("SELECT cars.id, cars.brandID, brands.BrandName AS brand, cars.model, cars.year, ROUND(cars.price * 1.21, 2) AS price, cars.mileage, cars.image_path, cars.status FROM cars JOIN brands ON cars.brandID = brands.BrandId");
      
      console.log("Inventory Page - Cars fetched:", allCars);

      if (filterParam && brandMap[filterParam]) {
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.filter === filterParam);
        });

        const filtered = allCars.filter(car => car.brand === brandMap[filterParam]);
        renderCars(filtered);
      } else {
        renderCars(allCars);
      }
    } catch (error) {
      carGrid.innerHTML = '<p class="no-results">Failed to load vehicles.</p>';
      console.error('Inventory API error:', error);
    }
  }

  // Filter buttons logic
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      const url = new URL(window.location);

      if (filter === 'all') {
        renderCars(allCars);
        url.searchParams.delete('filter');
      } else {
        const filtered = allCars.filter(car => car.brand === brandMap[filter]);
        renderCars(filtered);
        url.searchParams.set('filter', filter);
      }
      window.history.pushState({}, '', url);
    });
  });

  loadCars();
}
