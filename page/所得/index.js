document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector(".所得");
  const navContainer = document.querySelector(".container-right-nav");
  const cardList = document.createElement("div");
  cardList.className = "card-list";

  // 清空现有导航内容，避免与main.js冲突
  if (navContainer) {
    navContainer.innerHTML = "";

    // 添加标题
    const navTitle = document.createElement("h3");
    navContainer.appendChild(navTitle);
  }

  fetch("./所得.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("网络请求失败");
      }
      return response.json();
    })
    .then((projects) => {
      // 创建一个统一的导航列表
      const navList = document.createElement("ul");

      projects.forEach((project, index) => {
        const cardContainer = document.createElement("a");
        cardContainer.className = "card-container";
        cardContainer.href = project.url;
        cardContainer.rel = "noopener";
        cardContainer.target = "_blank";

        // 为卡片添加ID以便导航定位
        cardContainer.id = `card-${index}`;

        const cardName = document.createElement("h1");
        cardName.className = "card-name";
        cardName.textContent = project.name;

        const cardVice = document.createElement("p");
        cardVice.className = "card-vice";
        cardVice.textContent = project.description;

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

        // 导航栏项目
        const navItem = document.createElement("li");
        const navItemLink = document.createElement("a");
        navItemLink.href = `#card-${index}`;
        navItemLink.textContent = project.name;

        navItemLink.addEventListener("click", (e) => {
          e.preventDefault();
          cardContainer.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });

        navItem.appendChild(navItemLink);
        navList.appendChild(navItem);
      });

      // 所有项目处理完毕后，将导航列表添加到导航容器
      if (navContainer) {
        navContainer.appendChild(navList);
      }

      mainContainer.appendChild(cardList);
    })
    .catch((error) => {
      console.error("加载项目数据失败：", error);
    });
});
