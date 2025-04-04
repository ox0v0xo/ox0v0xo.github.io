document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".所见");

  try {
    const response = await fetch("./所见.json");
    if (!response.ok) {
      throw new Error(`网络请求失败: ${response.status}`);
    }

    const projects = await response.json();
    renderContent(projects);
  } catch (error) {
    console.error("加载数据失败:", error);
    container.innerHTML = `<p style="color:var(--color-main)">加载数据失败: ${error.message}</p>`;
  }

  function renderContent(projects) {
    const allData = Object.values(projects).flat();
    const table = createTable(allData);
    container.appendChild(table);
    setupSearch(allData, table.querySelector("tbody"));
  }

  function createTable(allData) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headers = ["NAME", "RATE", "TIME", "TYPE"];

    const headerRow = document.createElement("tr");
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      th.setAttribute("data-sort", "asc");
      th.style.cursor = "pointer";

      th.addEventListener("click", () => {
        headerRow.querySelectorAll("th").forEach((h) => {
          h.classList.remove("sort-asc", "sort-desc");
        });

        const sortOrder = th.getAttribute("data-sort");
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        th.setAttribute("data-sort", newOrder);
        th.classList.add(newOrder === "asc" ? "sort-asc" : "sort-desc");

        sortData(allData, headerText, newOrder);
        renderTableBody(allData, tbody);
      });

      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 初始按时间降序排序
    allData.sort((a, b) => new Date(b.TIME) - new Date(a.TIME));
    renderTableBody(allData, tbody);

    table.appendChild(tbody);
    return table;
  }

  function setupSearch(allData, tbody) {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    // 防抖优化
    const debounce = (fn, delay) => {
      let timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
      };
    };

    const handleSearch = debounce(() => {
      const searchTerm = searchInput.value.toLowerCase().trim();

      if (!searchTerm) {
        renderTableBody(allData, tbody);
        return;
      }

      const filteredData = allData.filter(
        (item) =>
          item.NAME.toLowerCase().includes(searchTerm) ||
          item.TYPE.toLowerCase().includes(searchTerm)
      );

      renderTableBody(filteredData, tbody);
    }, 100);

    searchInput.addEventListener("input", handleSearch);
  }

  function sortData(data, column, order) {
    data.sort((a, b) => {
      let valueA, valueB;

      switch (column) {
        case "NAME":
          valueA = a.NAME;
          valueB = b.NAME;
          break;
        case "RATE":
          valueA = a.RATE;
          valueB = b.RATE;
          break;
        case "TIME":
          valueA = new Date(a.TIME);
          valueB = new Date(b.TIME);
          break;
        case "TYPE":
          valueA = a.TYPE;
          valueB = b.TYPE;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  function renderTableBody(data, tbody) {
    tbody.innerHTML = "";

    if (data.length === 0) {
      const emptyRow = document.createElement("tr");
      const cell = document.createElement("td");
      cell.textContent = "没有找到匹配的结果";
      cell.colSpan = 4;
      cell.style.textAlign = "center";
      cell.style.padding = "20px";
      emptyRow.appendChild(cell);
      tbody.appendChild(emptyRow);
      return;
    }

    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.NAME;

      const rateCell = document.createElement("td");
      rateCell.textContent = item.RATE;

      const timeCell = document.createElement("td");
      const date = new Date(item.TIME);

      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const formattedTime = `${String(date.getHours()).padStart(
        2,
        "0"
      )}:${String(date.getMinutes()).padStart(2, "0")}`;

      timeCell.innerHTML = `<span class="date-display">${formattedDate}</span>
                           <span class="time-display">${formattedTime}</span>`;

      const typeCell = document.createElement("td");
      typeCell.textContent = item.TYPE;

      row.append(nameCell, rateCell, timeCell, typeCell);
      fragment.appendChild(row);
    });

    tbody.appendChild(fragment);
  }
});
