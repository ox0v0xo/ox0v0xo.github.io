document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector(".所得");
  const navContainer = document.querySelector(".container-right-nav");
  const cardList = document.createElement("div");
  cardList.className = "card-list";

  fetch("./所得.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("网络请求失败");
      }
      return response.json();
    })
    .then((projects) => {
      projects.forEach((project, index) => {
        const cardContainer = document.createElement("a");
        cardContainer.className = "card-container";
        cardContainer.href = project.url;
        cardContainer.rel = "noopener";
        cardContainer.target = "_blank";

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
});
