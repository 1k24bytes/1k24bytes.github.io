const helloText = document.getElementById("hello-text");
const languages = [
  "Hello",
  "ٱلسَّلَامُ عَلَيْكُمْ",
  "Bonjour",
  "Hallo",
  "नमस्ते",
];
let index = 0;

function changeLanguage() {
  helloText.style.opacity = 0;
  setTimeout(() => {
    helloText.textContent = languages[index];
    helloText.style.opacity = 1;
    index++;
    if (index < languages.length) {
      setTimeout(changeLanguage, 150);
    } else {
      setTimeout(() => {
        document.getElementById("loaderContainer").style.display = "none";
        document.querySelector(".content").style.display = "block";
      }, 1000);
    }
  }, 300);
}

window.addEventListener("load", function () {
  changeLanguage();
});
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav li");

// Set the threshold based on the device width
let thresholdValue = window.innerWidth < 475 ? 0.2 : 0.4;

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: thresholdValue,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.className;
      updateActiveNavItem(sectionId);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

function updateActiveNavItem(sectionId) {
  navItems.forEach((item) => {
    if (item.getAttribute("data-section") === sectionId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Optional: Add event listener to handle window resizing
window.addEventListener("resize", () => {
  const newThreshold = window.innerWidth < 475 ? 0.2 : 0.5;

  // Re-create the observer with the new threshold value
  observer.disconnect(); // Disconnect the old observer
  const updatedObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: newThreshold,
  };

  const newObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.className;
        updateActiveNavItem(sectionId);
      }
    });
  }, updatedObserverOptions);

  sections.forEach((section) => {
    newObserver.observe(section);
  });
});

// Smooth scrolling when clicking nav items
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const sectionId = item.getAttribute("data-section");
    document.querySelector(`.${sectionId}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const $card = document.querySelector(".card");
let bounds;

function rotateToMouse(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2,
  };
  const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

  $card.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2.5}deg
    )
  `;

  $card.querySelector(".glow").style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      #ffffff55,
      #0000000f
    )
  `;
}

$card.addEventListener("mouseenter", () => {
  bounds = $card.getBoundingClientRect();
  document.addEventListener("mousemove", rotateToMouse);
});

$card.addEventListener("mouseleave", () => {
  document.removeEventListener("mousemove", rotateToMouse);
  $card.style.transform = "";
  $card.style.background = "";
});

const titles = [
  "Web Developer",
  "UI/UX Designer",
  "WordPress Dev",
  "Programmer",
  "Freelancer",
];

let currentIndex = 0;
const titleElement = document.querySelector(".dynamic-title");

function updateTitle() {
  titleElement.style.opacity = 0; // Fade out

  setTimeout(() => {
    titleElement.textContent = titles[currentIndex]; // Change title
    titleElement.style.opacity = 1; // Fade in

    currentIndex = (currentIndex + 1) % titles.length; // Loop through titles
  }, 500); // Wait for fade out transition
}

setInterval(updateTitle, 2000); // Change title every 2 seconds
