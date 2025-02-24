document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector(".所感");
  const navContainer = document.querySelector(".container-right-nav");
  const cardList = document.createElement("div");
  cardList.className = "card-list";

  fetch("./所感.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("网络请求失败");
      }
      return response.json();
    })
    .then((projects) => {
      window.projects = projects;

      projects.forEach((project, index) => {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";

        const cardName = document.createElement("h1");
        cardName.className = "card-name";
        cardName.textContent = project.name;

        const cardVice = document.createElement("p");
        cardVice.className = "card-vice";
        cardVice.textContent = project.date;

        const cardTags = document.createElement("div");
        cardTags.className = "card-tags";

        project.tags.forEach((tag) => {
          const tagElement = document.createElement("span");
          tagElement.className = "card-tag";
          tagElement.textContent = tag;
          cardTags.appendChild(tagElement);
        });

        cardContainer.appendChild(cardName);
        cardContainer.appendChild(cardVice);
        cardContainer.appendChild(cardTags);

        cardList.appendChild(cardContainer);

        // blog
        cardContainer.addEventListener("click", () => {
          loadBlog(project.path, project.name);
        });

        // 导航栏
        const navList = document.createElement("ul");
        const navItem = document.createElement("li");
        const navItemLink = document.createElement("a");
        navItemLink.href = "javascript:void(0);";
        navItemLink.textContent = project.name;

        if (!cardContainer.id) {
          cardContainer.id = `card-${index}`;
        }

        navItemLink.addEventListener("click", (e) => {
          e.preventDefault();
          const targetElement = document.getElementById(`card-${index}`);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        });
        navItem.appendChild(navItemLink);
        navList.appendChild(navItem);
        navContainer.appendChild(navList);
      });

      mainContainer.appendChild(cardList);

      // 检查 URL
      checkURL();
    })
    .catch((error) => {
      console.error("加载项目数据失败：", error);
    });

  // 监听 URL 的变化
  window.addEventListener("hashchange", checkURL);
  window.addEventListener("popstate", checkURL);

  function checkURL() {
    const hash = window.location.hash.substring(1);
    const path = window.location.pathname;

    // 如果 URL 是卡片目录
    if (path === "/page/所感/index.html" && (!hash || hash === "")) {
      mainContainer.innerHTML = "";
      mainContainer.appendChild(cardList);
      navContainer.innerHTML = "";
      return;
    }

    // 如果 URL 包含文章标题
    if (hash) {
      const decodedHash = decodeURIComponent(hash);
      const project = window.projects.find((p) => p.name === decodedHash);

      if (project) {
        loadBlog(project.path, project.name);
      } else {
        history.replaceState({}, "", "/page/所感/index.html");
        mainContainer.innerHTML = "";
        mainContainer.appendChild(cardList);
        navContainer.innerHTML = "";
      }
    }
  }

  async function loadBlog(path, title) {
    const response = await fetch(path);
    const markdown = await response.text();
    const content = marked.parse(markdown); // 将 Markdown 转换为 HTML

    history.pushState({}, "", `#${encodeURIComponent(title)}`);

    // 将文章内容加载到 .container-main 中
    const mainContainer = document.querySelector(".container-main");
    mainContainer.innerHTML = content;

    // 动态生成目录
    const navContainer = document.querySelector(".container-right-nav");
    navContainer.innerHTML = ""; // 清空旧的目录
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
        const targetElement = document.getElementById(heading.id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
      navItem.appendChild(navItemLink);

      const level = parseInt(heading.tagName.substring(1));
      const indent = (level - 1) * 20;
      navItem.style.paddingLeft = `${indent}px`;

      navList.appendChild(navItem);
    });

    navContainer.appendChild(navList);
  }
});
