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
    })
    .catch((error) => {
      console.error("加载项目数据失败：", error);
    });

  async function loadBlog(path, title) {
    try {
      const mainContainer = document.querySelector(".container-main"); // 根据HTML结构调整
      const navContainer = document.querySelector(".container-right-nav");

      const response = await fetch(path);
      if (!response.ok) throw new Error(`HTTP错误! 状态码: ${response.status}`);
      const markdownText = await response.text();

      const content = markdown.parse(markdownText);

      // 更新主内容
      mainContainer.innerHTML = `<div class="markdown">${content}</div>`;

      // 生成目录
      navContainer.innerHTML = "";
      const headings = mainContainer.querySelectorAll("h1, h2, h3");
      const navList = document.createElement("ul");

      headings.forEach((heading, index) => {
        heading.id = heading.id || `heading-${Date.now()}-${index}`;
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.onclick = (e) => {
          e.preventDefault();
          heading.scrollIntoView({ behavior: "smooth" });
        };
        li.appendChild(a);
        navList.appendChild(li);
      });

      navContainer.appendChild(navList);
    } catch (error) {
      console.error("加载失败:", error);
      document.querySelector(".container-main").innerHTML = `
          <div class="error" style="color: red; padding: 20px;">
            Failed to load: ${error.message}
          </div>
        `;
    }
  }
});
