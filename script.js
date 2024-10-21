// ###################################
// Navigation Menu Toggle and Behavior
// ###################################

const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
// const btnToggleNav = document.querySelector(".menu-btn");
const mainEl = document.querySelector("main");

document.querySelector('.menu-btn').addEventListener('click', function () {
  document.querySelector('.menu-btn-container').classList.toggle('active');
});


// JavaScript to toggle the visibility of menu items
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-btn[data-menu="toggle"]');
  const navButtons = document.querySelector('.nav-buttons');

  menuButton.addEventListener('click', () => {
    // Toggle the 'active' class on the container to show/hide menu items
    navButtons.classList.toggle('active');
    menuButton.textContent = navButtons.classList.contains('active') ? 'close' : 'menu';
  });
});



// $$$$$$$$$$$$$$$

// Toggle the visibility of the navigation menu
const toggleNav = () => {
  nav.classList.toggle("hidden");

  // Prevent screen from scrolling when menu is opened
  document.body.classList.toggle("lock-screen");

  // if (nav.classList.contains("hidden")) {
  //   btnToggleNav.textContent = "menu";
  // } else {
  //   // When menu is opened after transition change text respectively
  //   setTimeout(() => {
  //     btnToggleNav.textContent = "close";
  //   }, 475);
  // }
};

// Add event listeners for menu toggle
// btnToggleNav.addEventListener("click", toggleNav);
// navMenu.addEventListener("click", (e) => {
//   if (e.target.localName === "a") {
//     toggleNav();
//   }
// });

// // Close the menu when pressing the 'Escape' key
// document.body.addEventListener("keydown", (e) => {
//   if (e.key === "Escape" && !nav.classList.contains("hidden")) {
//     toggleNav();
//   }
// });

// ###################################
// Animating Work Instances on Scroll
// ###################################

const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");

// Add transform class for animation
workImgs.forEach((workImg) => workImg.classList.add("transform"));

// Intersection Observer to animate elements when they come into view
let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// ###################################
// Theme Toggle and User Preferences
// ###################################

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

// Set the theme based on the stored preference
switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// ###################################
// Trap Tab Key when Menu is Opened
// ###################################

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

// Ensure focus stays within the menu when it's opened
// document.body.addEventListener("keydown", (e) => {
//   if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
//     e.preventDefault();
//     btnToggleNav.focus();
//   }
// });

// ###################################
// Rotating Logos Animation
// ###################################

const logosWrappers = document.querySelectorAll(".logo-group");

// Helper function to pause execution for a specified time
const sleep = (number) => new Promise((res) => setTimeout(res, number));

// Rotate logos at intervals
logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

// Update the year in the footer
const yearEl = document.querySelector(".footer-text span");
yearEl.textContent = new Date().getFullYear();

// ###################################
// Matrix Effect Animation
// ###################################

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

const nameText = "NANA AMOAKO";
let isMorphing = false;
let animationFrameId;
const speedFactor = 0.55; // Value between 0 and 1; lower is slower

// Draw the Matrix effect
function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, i) => {
    let text;
    if (isMorphing) {
      text = nameText[i % nameText.length];
    } else {
      text = String.fromCharCode(65 + Math.random() * 33);
    }

    ctx.fillText(text, i * fontSize, y * fontSize);

    // Apply the speed factor to slow down the drops
    if (Math.random() < speedFactor) {
      drops[i]++;
    }

    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
  });

  animationFrameId = requestAnimationFrame(drawMatrix);
}

// Start the Matrix effect
animationFrameId = requestAnimationFrame(drawMatrix);

// Trigger the morphing effect after 5 seconds
setTimeout(() => {
  isMorphing = true;
}, 5000);

// Debounce resizing to maintain the drops' state
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const oldColumns = columns;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);

    // Preserve existing values when adjusting the drops array
    if (columns > oldColumns) {
      drops = [...drops, ...Array(columns - oldColumns).fill(1)];
    } else {
      drops = drops.slice(0, columns);
    }
  }, 100);
});

// Pause animation when window is not in focus (optimize performance)
window.addEventListener('blur', () => {
  cancelAnimationFrame(animationFrameId);
});

window.addEventListener('focus', () => {
  animationFrameId = requestAnimationFrame(drawMatrix);
});



// ###################################
// Fetch and Display Featured Repositories
// ###################################


const repoContainer = document.getElementById('repo-container');
const featuredRepos = [
  'DSA-File-Explorers', 'apms', 'kumi_fcln', 'Recifree',
  'volume-gesture-control', 'Cocoa-Price-Prediction',
  'text-clock-by-nanaamoako', 'personal-pomodoro-timer'
];

// List of gradient images to use as backgrounds
const gradientImages = [
  'https://images.unsplash.com/photo-1614854262409-bc319cba5802?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1614850715973-58c3167b30a0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1614850523527-08bd62441994?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1614851099507-f1a93001d984?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

async function fetchRepos() {
  try {
    const response = await fetch('/.netlify/functions/fetchRepos');
    const repos = await response.json();

    repos.forEach((repo, index) => {
      if (featuredRepos.includes(repo.name)) {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        projectCard.addEventListener('click', () => {
          window.open(repo.html_url, '_blank');
        });

        // Get a gradient image from the list
        const gradientImage = gradientImages[index % gradientImages.length];
        const projectImage = document.createElement('div');
        projectImage.classList.add('project-image');
        projectImage.style.backgroundImage = `url('${gradientImage}')`;

        // Choose the logo based on the theme
        const isDarkTheme = document.body.classList.contains('dark');
        let logoSrc;

        if (isDarkTheme) {
          logoSrc = 'assets/images/github-logo/GitHub_Invertocat_Light.svg';
        } else {
          logoSrc = 'assets/images/github-logo/GitHub_Invertocat_Dark.svg';
        }

        // Update the logo image source
        const logoImage = document.querySelector('#logo-image');
        if (logoImage) {
          logoImage.src = logoSrc;
        }

        // Create the details section with the logo before the repository name
        const projectDetails = document.createElement('div');
        projectDetails.classList.add('project-details');
        projectDetails.innerHTML = `
          <h3>
            <img src="${logoSrc}" alt="GitHub Logo" class="github-logo">
            ${repo.name}
          </h3>
          <p>${repo.description || 'No description provided'}</p>
        `;

        // Append sections to the card
        projectCard.appendChild(projectImage);
        projectCard.appendChild(projectDetails);
        repoContainer.appendChild(projectCard);
      }
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}

fetchRepos();
