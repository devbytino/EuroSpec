/**
 * @file app.js
 * @description Main application logic for EuroSpec. Handles theme initialization, 
 * mobile navigation, and inventory display on the home and inventory pages.
 */

/**
 * API_URL: the address of the API to which we send our SQL queries.
 */
const API_URL = "api.php";

// Fallback data: populated to prevent crashes and show preview cars if the API is down
const FALLBACK_PRODUCTEN = [
  {
    id: 1,
    brandID: 1,
    brand: 'Audi',
    model: 'R8 V10',
    year: 2020,
    price: 150000,
    mileage: 15000,
    engine: '5.2L V10',
    transmission: '7-Speed Automatic',
    power: '602 hp',
    top_speed: '330 km/h',
    image_path: 'assets/CarImages/audi/2020-audi-r8v10.png',
    status: 'Available',
    description: 'A stunning combination of breathtaking performance and everyday usability. The Audi R8 V10 represents the pinnacle of Audi Sport.'
  },
  {
    id: 2,
    brandID: 2,
    brand: 'BMW',
    model: 'M3 GT',
    year: 1994,
    price: 125000,
    mileage: 65000,
    engine: '3.0L Inline-6',
    transmission: '5-Speed Manual',
    power: '295 hp',
    top_speed: '275 km/h',
    image_path: 'assets/CarImages/bmw/1994-m3gt.png',
    status: 'Available',
    description: 'An iconic piece of BMW M history. This E36 M3 GT is one of the rare homologation specials built in limited numbers.'
  },
  {
    id: 3,
    brandID: 3,
    brand: 'Mercedes-Benz',
    model: 'G63 AMG',
    year: 2022,
    price: 180000,
    mileage: 8000,
    engine: '4.0L V8 Biturbo',
    transmission: '9-Speed Automatic',
    power: '577 hp',
    top_speed: '220 km/h',
    image_path: 'assets/CarImages/mercedes/g63.png',
    status: 'Available',
    description: 'The ultimate luxury off-roader. The G63 AMG blends unmistakable design with formidable power and a handcrafted interior.'
  },
  {
    id: 4,
    brandID: 4,
    brand: 'Porsche',
    model: '911 GT2 RS',
    year: 2018,
    price: 350000,
    mileage: 4500,
    engine: '3.8L Twin-Turbo Flat-6',
    transmission: '7-Speed PDK',
    power: '700 hp',
    top_speed: '340 km/h',
    image_path: 'assets/CarImages/porsche/2018-gt2rs.png',
    status: 'Price Upon Request',
    description: 'The most powerful 911 ever built for the road. The GT2 RS is a track-focused monster pushing the boundaries of physics.'
  },
  {
    id: 5,
    brandID: 3,
    brand: 'Audi',
    model: 'Sport Quattro',
    year: 1984,
    price: 450000,
    mileage: 32000,
    engine: '2.1L Turbocharged 5-Cylinder',
    transmission: '5-Speed Manual',
    power: '302 hp',
    top_speed: '250 km/h',
    image_path: 'assets/CarImages/audi/audi-sport-quattro.png',
    status: 'Available',
    description: 'A Group B rally legend. The Sport Quattro is the ultimate expression of Audi\'s "Vorsprung durch Technik" from the 1980s.'
  },
  {
    id: 6,
    brandID: 2,
    brand: 'BMW',
    model: 'M5 (E39)',
    year: 1996,
    price: 85000,
    mileage: 72000,
    engine: '4.9L V8',
    transmission: '6-Speed Manual',
    power: '394 hp',
    top_speed: '250 km/h',
    image_path: 'assets/CarImages/bmw/1996-m5.png',
    status: 'Available',
    description: 'Widely regarded as the finest sports sedan ever made. The E39 M5 offers a perfect balance of luxury and raw performance.'
  },
  {
    id: 7,
    brandID: 1,
    brand: 'Mercedes-Benz',
    model: 'SLR McLaren',
    year: 2003,
    price: 420000,
    mileage: 12000,
    engine: '5.4L Supercharged V8',
    transmission: '5-Speed Automatic',
    power: '617 hp',
    top_speed: '334 km/h',
    image_path: 'assets/CarImages/mercedes/slr-mclaren.png',
    status: 'Price Upon Request',
    description: 'A collaboration between two giants of motorsport. The SLR McLaren is a long-distance grand tourer with supercar performance.'
  }
];

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
      return result.data;
    } else {
      console.error("SQL error in runQuery:", result.error);
      alert("An error occurred while executing the query: " + result.error);
      return FALLBACK_PRODUCTEN;
    }
  } catch (error) {
    console.error("API unreachable in runQuery:", error);
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
 * Initializes theme based on preference and sets up a toggle listener.
 * Will use 'light' if the user prefers light mode, otherwise 'dark'.
 * Will basically add the custom 'data-theme' attribute to the HTML element, which is used by CSS to change styles.
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
    // Using specific column names instead of SELECT *
    // Added ROUND(cars.price * 1.21, 2) to include 21% VAT
    const allCars = await runQuery("SELECT cars.id, cars.brandID, brands.BrandName AS brand, cars.model, cars.year, ROUND(cars.price * 1.21, 2) AS price, cars.image_path, cars.status, cars.description FROM cars JOIN brands ON cars.brandID = brands.BrandId");

    console.log("Featured Inventory - Cars fetched:", allCars);

    if (allCars.length === 0) {
      featuredGrid.innerHTML = '<p>No featured vehicles are available.</p>';
      return;
    }

    // Select 3 random cars
    const shuffled = [...allCars].sort(() => 0.5 - Math.random()); // first create a copy of the array (immutability) and shuffle it
    const featuredCars = shuffled.slice(0, 3); // take the first 3 elements for featured cars

    featuredGrid.innerHTML = featuredCars.map(car => { // take featured cars and render them
      const displayPrice = car.status === 'Price Upon Request'
        ? 'Price Upon Request'
        : `€${Number(car.price).toLocaleString('en-US')}`; // ternary operator for price display

      const brandName = car.brand || 'Unknown';
      const imagePath = car.image_path || 'assets/photos/fallback.png'; // fallback image
      // adjust based on year
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
    }).join(''); // join the array of HTML strings into a single string

  } catch (error) { // error handling
    console.error('Failed to load featured inventory:', error);
    featuredGrid.innerHTML = '<p>Check back soon for our latest arrivals.</p>';
  }
}

// initialize on page load
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
 * @async
 * @param {HTMLElement} carGrid - The container element for the car list.
 */
async function initInventoryPage(carGrid) {
  const brandMap = {
    'mercedes': 'Mercedes-Benz', // Corrected key name so that SQL does not clash with the API
    'bmw':      'BMW',
    'audi':     'Audi',
    'porsche':  'Porsche'
  };

  let allCars = []; // once the data is fetched, it will be stored here, no need to fetch it again like if I used a const

  /**
   * Creates an HTML card for a single car.
   * @param {Object} car - The car object from the database.
   * @returns {string} - The HTML string for the car card.
   */
  function createCarCard(car) {
    const displayPrice = car.status === 'Price Upon Request'
      ? 'Price Upon Request'
      : `€${Number(car.price).toLocaleString('en-US')}`;

    const brandName = car.brand || 'Unknown';
    const imagePath = car.image_path || 'assets/photos/fallback.png';

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

  /**
   * Renders a list of cars into the car grid.
   * @param {Array<Object>} cars - Array of car objects to render.
   */
  function renderCars(cars) {
    if (cars.length === 0) { // if there are no cars, show a message instead of causing an error
      carGrid.innerHTML = '<p class="no-results">No vehicles were found.</p>';
      return;
    }
    carGrid.innerHTML = cars.map(createCarCard).join(''); // loop through cars and create HTML for each and combine them into a single string and put in the carGrid
  }

  /**
   * Loads car data from the API and initializes the page content.
   * @async
   */
  async function loadCars() {
    carGrid.innerHTML = '<p class="no-results">Loading vehicles...</p>'; // show loading message for ux

    try {
      const urlParams = new URLSearchParams(window.location.search); // get the filter from the URL
      const filterParam = urlParams.get('filter')?.toLowerCase(); // check if the user has selected a filter

      // Use the same query as CRUD, but with a JOIN to get the brand name. Price inclusive of 21% VAT.
      allCars = await runQuery("SELECT cars.id, cars.brandID, brands.BrandName AS brand, cars.model, cars.year, ROUND(cars.price * 1.21, 2) AS price, cars.mileage, cars.image_path, cars.status FROM cars JOIN brands ON cars.brandID = brands.BrandId");
      
      console.log("Inventory Page - Cars fetched:", allCars); // log the fetched cars

      if (filterParam && brandMap[filterParam]) {
        const filterButtons = document.querySelectorAll('.filter-button'); // select all filter buttons
        filterButtons.forEach(btn => { // loop through each button and toggle the active class based on the filter
          btn.classList.toggle('active', btn.dataset.filter === filterParam);
        });

        const filtered = allCars.filter(car => car.brand === brandMap[filterParam]); // filter cars based on the selected filter
        renderCars(filtered);
      } else {
        renderCars(allCars);
      }
    } catch (error) { // error handling
      carGrid.innerHTML = '<p class="no-results">Failed to load vehicles.</p>';
      console.error('Inventory API error:', error);
    }
  }

  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-button'); // filter buttons
  filterButtons.forEach(button => { // loop through each button and add a click event listener
    button.addEventListener('click', () => { // when the button is clicked, toggle the remove active class from all buttons and add it to the clicked button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      const url = new URL(window.location);

      if (filter === 'all') { // if the filter is 'all', show all cars
        renderCars(allCars);
        url.searchParams.delete('filter'); //  remove the filter from the URL
      } else {
        const filtered = allCars.filter(car => car.brand === brandMap[filter]);
        renderCars(filtered);
        url.searchParams.set('filter', filter);
      }
      window.history.pushState({}, '', url); // update the URL with the new filter without reloading the page good 4 speed
    });
  });

  loadCars();
}