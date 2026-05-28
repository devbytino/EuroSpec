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
 * Checks if user had visited the site before using localStorage
 * Sets up the theme toggle click listener
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
 * Filter the vehicle cards based on the selected brand.
 * @param {string} filter - The brand to filter by, or 'all' to show everything.
 */
function applyFilter(filter) {
  const vehicles = document.querySelectorAll('.vehicle-card');
  const buttons = document.querySelectorAll('.filter-button');

  if (buttons.length === 0) return;

  buttons.forEach(btn => {
    if (btn.getAttribute('data-filter') === filter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  vehicles.forEach(card => {
    const brand = card.getAttribute('data-brand');
    if (filter === 'all' || brand === filter) {
      card.style.display = 'block'; // Show card
    } else {
      card.style.display = 'none';  // Hide card
    }
  });
}

/**
 * Initializes mobile navigation toggle and link click handlers.
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
 * Main initialization on DOM content loaded.
 */
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initFeaturedInventory();

  // Smooth appearance on scroll
  const observerOptions = {
    threshold: 0.1
  };

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
 * Featured Inventory Logic (Homepage)
 */
async function initFeaturedInventory() {
  const featuredGrid = document.getElementById('featured-grid');
  if (!featuredGrid) return;

  try {
    const response = await fetch('http://localhost:3000/api/cars');
    const allCars = await response.json();

    if (allCars.length === 0) {
      featuredGrid.innerHTML = '<p>No featured vehicles are available.</p>';
      return;
    }

    // Select 3 random cars
    const shuffled = allCars.sort(() => 0.5 - Math.random());
    const featuredCars = shuffled.slice(0, 3);

    featuredGrid.innerHTML = featuredCars.map(car => {
      const displayPrice = car.status === 'Price Upon Request'
        ? 'Price Upon Request'
        : `$${Number(car.price).toLocaleString('en-US')}`;

      // Randomly add a badge to some cars for visual interest
      const badges = ['New Arrival', 'Rare Find', 'Top Spec', 'Exquisite'];
      const showBadge = Math.random() > 0.7;
      const badgeText = showBadge ? badges[Math.floor(Math.random() * badges.length)] : (car.status === 'Reserved' ? 'Reserved' : '');

      return `
        <div class="inventory-card">
          <div class="card-image">
            <img src="${car.image_path}" alt="${car.brand} ${car.model}" />
            ${badgeText ? `<div class="card-badge">${badgeText}</div>` : ''}
          </div>
          <div class="card-content">
            <div class="card-meta">${car.year} • ${car.brand.toUpperCase()}</div>
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

// ─── Inventory Page Logic ─────────────────────────────────────────

// Only run this code if we're on the inventory page
const carGrid = document.getElementById('car-grid');

if (carGrid) {

  // Maps the filter button values to what's stored in the database
  const brandMap = {
    'mercedes': 'Mercedes-Benz',
    'bmw':      'BMW',
    'audi':     'Audi',
    'porsche':  'Porsche'
  };

  let allCars = []; // We'll store all fetched cars here for filtering

  // ── 1. The cookie cutter — turns one car object into an HTML card ──
  function createCarCard(car) {
    const displayPrice = car.status === 'Price Upon Request'
      ? 'Price Upon Request'
      : `$${Number(car.price).toLocaleString('en-US')}`;

    return `
    <article class="vehicle-card" data-brand="${car.brand.toLowerCase().replace('-', '')}">
      <a href="car-detail.html?id=${car.id}">
        <img src="${car.image_path}" alt="${car.year} ${car.brand} ${car.model}" />
        <div class="vehicle-info">
          <div>
            <h2>${car.year} ${car.model}</h2>
            <p>${car.brand}</p>
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

  // ── 2. Renders a list of cars into the grid ──
  function renderCars(cars) {
    if (cars.length === 0) {
      carGrid.innerHTML = '<p class="no-results">No vehicles were found.</p>';
      return;
    }
    carGrid.innerHTML = cars.map(createCarCard).join('');
  }

  // ── 3. Fetch all cars from the API when the page loads ──
  async function loadCars() {
    carGrid.innerHTML = '<p class="no-results">Loading vehicles...</p>';

    try {
      // Check for filter in URL
      const urlParams = new URLSearchParams(window.location.search);
      const filterParam = urlParams.get('filter')?.toLowerCase();

      let fetchUrl = 'http://localhost:3000/api/cars';

      // If we have a filter in the URL, let's fetch everything anyway
      // so that if the user clicks 'All' later, we don't have to re-fetch.
      // But we can also use the backend filter if we want to be efficient.
      // For this small app, fetching all and filtering in JS is fine and makes 'All' transition instant.

      const response = await fetch(fetchUrl);
      allCars = await response.json();

      if (filterParam && brandMap[filterParam]) {
        // Set active button
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(btn => {
          if (btn.dataset.filter === filterParam) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        // Render filtered cars
        const filtered = allCars.filter(car => car.brand === brandMap[filterParam]);
        renderCars(filtered);
      } else {
        renderCars(allCars);
      }
    } catch (error) {
      carGrid.innerHTML = '<p class="no-results">Failed to load vehicles. Is the server running?</p>';
      console.error('API error:', error);
    }
  }

  // ── 4. Filter buttons ──
  const filterButtons = document.querySelectorAll('.filter-button');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      if (filter === 'all') {
        renderCars(allCars);
        // Update URL without reloading
        const url = new URL(window.location);
        url.searchParams.delete('filter');
        window.history.pushState({}, '', url);
      } else {
        const filtered = allCars.filter(car => car.brand === brandMap[filter]);
        renderCars(filtered);
        // Update URL without reloading
        const url = new URL(window.location);
        url.searchParams.set('filter', filter);
        window.history.pushState({}, '', url);
      }
    });
  });


  loadCars();
}

const metaTheme = document.querySelector('meta[name="theme-color"]');

window.addEventListener('scroll', () => {
  if (window.scrollY < 600) {
    metaTheme.setAttribute('content', '#d0d0d0'); // hero section grey
  } else {
    metaTheme.setAttribute('content', '#ffffff'); // rest of site
  }
});
