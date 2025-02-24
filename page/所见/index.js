document.addEventListener("DOMContentLoaded", function () {
  fetch("./所见.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("网络请求失败");
      }
      return response.json();
    })
    .then((projects) => {
      const container = document.querySelector(".所见");
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      const headers = ["NAME", "RANK", "TIME", "TYPE"];

      headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        th.setAttribute("data-sort", "asc");
        th.style.cursor = "pointer";
        th.addEventListener("click", () => sortTable(th, headerText));
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");

      let allData = [];
      Object.keys(projects).forEach((category) => {
        projects[category].forEach((item) => {
          allData.push(item);
        });
      });
      allData.sort((a, b) => new Date(b.TIME) - new Date(a.TIME));

      renderTable(allData, tbody);
      table.appendChild(tbody);
      container.appendChild(table);

      function sortTable(th, headerText) {
        const sortOrder = th.getAttribute("data-sort");
        const columnIndex = headers.indexOf(headerText);

        allData.sort((a, b) => {
          const keyA = getValueByColumn(a, columnIndex);
          const keyB = getValueByColumn(b, columnIndex);

          if (keyA < keyB) return sortOrder === "asc" ? -1 : 1;
          if (keyA > keyB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });

        th.setAttribute("data-sort", sortOrder === "asc" ? "desc" : "asc");

        renderTable(allData, tbody);
      }

      function getValueByColumn(item, columnIndex) {
        switch (columnIndex) {
          case 0:
            return item.NAME;
          case 1:
            return item.RATE;
          case 2:
            return new Date(item.TIME);
          case 3:
            return item.TYPE;
          default:
            return "";
        }
      }

      function renderTable(projects, tbody) {
        tbody.innerHTML = "";
        projects.forEach((item) => {
          const row = document.createElement("tr");
          const nameCell = document.createElement("td");
          const rateCell = document.createElement("td");
          const timeCell = document.createElement("td");
          const typeCell = document.createElement("td");

          nameCell.textContent = item.NAME;
          rateCell.textContent = item.RATE;
          timeCell.textContent = item.TIME;
          typeCell.textContent = item.TYPE;

          row.appendChild(nameCell);
          row.appendChild(rateCell);
          row.appendChild(timeCell);
          row.appendChild(typeCell);

          tbody.appendChild(row);
        });
      }
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
