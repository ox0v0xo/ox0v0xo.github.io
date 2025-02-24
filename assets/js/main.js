document.addEventListener("DOMContentLoaded", function () {
  const mottoContainer = document.querySelector(".container-left-motto span");
  const strings = ["像好色一样好学", "愉悦", "忘却所有悲伤, 所见皆是奇迹"];
  let index = 0;

  if (localStorage.getItem("mottoIndex") !== null) {
    index = parseInt(localStorage.getItem("mottoIndex"), 10);
  }

  function typeString() {
    const string = strings[index];
    mottoContainer.textContent = "";

    const typeInterval = setInterval(() => {
      if (mottoContainer.textContent.length < string.length) {
        mottoContainer.textContent += string[mottoContainer.textContent.length];
      } else {
        clearInterval(typeInterval);
        setTimeout(eraseString, 2000);
      }
    }, 100);
  }

  function eraseString() {
    const eraseInterval = setInterval(() => {
      if (mottoContainer.textContent.length > 0) {
        mottoContainer.textContent = mottoContainer.textContent.slice(0, -1);
      } else {
        clearInterval(eraseInterval);
        index = (index + 1) % strings.length;
        localStorage.setItem("mottoIndex", index);
        typeString();
      }
    }, 100);
  }

  typeString();
});

// 导航栏
document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector(".container-main");
  const navContainer = document.querySelector(".container-right-nav");
  const headings = mainContainer.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const navList = document.createElement("ul");

  headings.forEach((heading, index) => {
    const navItem = document.createElement("li");
    const navItemLink = document.createElement("a");
    navItemLink.href = "javascript:void(0);";
    navItemLink.textContent = heading.textContent;

    if (!heading.id) {
      heading.id = "heading-" + index;
    }

    navItemLink.addEventListener("click", function () {
      heading.scrollIntoView({ behavior: "smooth" });
    });
    navItem.appendChild(navItemLink);

    const level = parseInt(heading.tagName.substring(1));
    const indent = (level - 1) * 20;
    navItem.style.paddingLeft = `${indent}px`;

    navList.appendChild(navItem);
  });

  navContainer.appendChild(navList);
});
