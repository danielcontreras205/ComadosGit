// Variables para controlar la página actual y la cantidad de filas por página
let currentPage = 1;
let rowsPerPage = 15;

// Obtener todas las filas de la tabla
let tableRows = Array.from(document.querySelectorAll('#data-table tbody tr'));
let filteredRows = tableRows;

// Función para cambiar la cantidad de filas por página
function changeRowsPerPage() {
    rowsPerPage = parseInt(document.getElementById('recordsSelect').value, 10);
    setCurrentPage(1);
}

// Función para actualizar los botones de paginación
function updatePagination(rows) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    const pageCount = Math.ceil(rows.length / rowsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('pagination-button');
        if (currentPage === i) button.classList.add('active');
        button.addEventListener('click', () => setCurrentPage(i));
        paginationElement.appendChild(button);
    }
}

// Función para mostrar las filas de la página actual
function displayCurrentPage() {
    // Ocultar todas las filas
    tableRows.forEach(row => {
        row.style.display = 'none';
    });

    // Mostrar las filas para la página actual
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    filteredRows.slice(start, end).forEach(row => {
        row.style.display = '';
    });
}

// Función para establecer la página actual y actualizar la visualización
function setCurrentPage(page) {
    currentPage = page;
    displayCurrentPage();
    updatePagination(filteredRows);
}

// Función para aplicar un filtro a las filas de la tabla
function applyFilter() {
    const filterInput = document.getElementById('filterInput');
    const filterValue = filterInput.value.toUpperCase();
    filteredRows = tableRows.filter(row => {
        return Array.from(row.cells).some(cell => cell.textContent.toUpperCase().includes(filterValue));
    });
    setCurrentPage(1);
}

// Establecer la página actual en 1 al cargar la página
setCurrentPage(1);

