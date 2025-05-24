// 主题界面
function themeCheck() {
  const storedTheme = localStorage.getItem("theme") || "night";
  if (storedTheme === "light") {
    document.body.classList.add("light-mode");
    themeUpdate("light");
  } else {
    document.body.classList.remove("light-mode");
    themeUpdate("night");
  }
}

function themeUpdate(theme) {
  const themeButton = document.getElementById("themeCirclet");
  if (!themeButton) return;
  if (theme === "light") {
    themeButton.innerHTML = '<i class="fas fa-moon"></i>';
    themeButton.title = "切换到暗色模式";
  } else {
    themeButton.innerHTML = '<i class="fas fa-sun"></i>';
    themeButton.title = "切换到亮色模式";
  }
}

function themeToggle() {
  if (document.body.classList.contains("light-mode")) {
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "night");
    themeUpdate("night");
  } else {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    themeUpdate("light");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  themeCheck();

  const themeButton = document.getElementById("themeCirclet");
  if (themeButton) {
    themeButton.addEventListener("click", themeToggle);
  }
});

// 生成右栏导航
document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector(".container-main");
  const navContainer = document.querySelector(".container-right-nav");

  // 如果没有找到必要的元素，则不生成导航
  if (!mainContainer || !navContainer) return;

  // 获取所有标题
  const headings = mainContainer.querySelectorAll("h1, h2, h3, h4, h5, h6");

  // 如果没有标题，且导航容器内没有其他内容，则隐藏导航容器
  if (headings.length === 0) {
    // 检查导航容器是否为空或只包含空白字符
    const hasContent = navContainer.innerHTML.trim() !== "";
    if (!hasContent) {
      navContainer.style.display = "none";
      return;
    }
    return;
  }

  // 创建导航列表
  const navList = document.createElement("ul");

  // 为每个标题创建导航项
  headings.forEach((heading, index) => {
    // 创建导航项
    const navItem = document.createElement("li");
    const navItemLink = document.createElement("a");
    navItemLink.href = "#" + (heading.id || `heading-${index}`);
    navItemLink.textContent = heading.textContent;

    // 确保标题有id
    if (!heading.id) {
      heading.id = "heading-" + index;
    }

    // 点击导航项滚动到对应标题
    navItemLink.addEventListener("click", function (e) {
      e.preventDefault();
      heading.scrollIntoView({ behavior: "smooth" });
    });

    navItem.appendChild(navItemLink);

    // 根据标题级别设置缩进
    const level = parseInt(heading.tagName.substring(1));
    const indent = (level - 1) * 20;
    navItem.style.paddingLeft = `${indent}px`;

    navList.appendChild(navItem);
  });

  navContainer.appendChild(navList);
});
