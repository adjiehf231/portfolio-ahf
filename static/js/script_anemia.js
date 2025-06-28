const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.navigation');
        
hamburger.addEventListener('click', () => {
    // Toggle the active class on the hamburger button and navigation
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// --- Function to fetch and parse CSV ---
async function loadCSVData(filePath, tableId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const data = parseCSV(csvText);
        renderTable(data, tableId);
    } catch (error) {
        console.error("Error loading or parsing CSV:", error);
        const tableBody = document.querySelector(`${tableId} tbody`);
        tableBody.innerHTML = '<tr><td colspan="10">Gagal memuat data. Pastikan file CSV tersedia.</td></tr>';
    }
}

// --- Function to parse CSV ---
function parseCSV(csvString) {
    const lines = csvString.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim()); // Trim headers
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(value => value.trim()); // Trim values
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            data.push(row);
        } else {
            console.warn(`Skipping malformed row ${i + 1}: ${lines[i]}`);
        }
    }
    return data;
}

// --- Function to render table ---
function renderTable(data, tableId) {
    const tableBody = document.querySelector(`${tableId} tbody`);
    tableBody.innerHTML = '';

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="10">Tidak ada data.</td></tr>';
        return;
    }

    data.forEach((row) => {
        const tr = document.createElement('tr');
        let rowHtml = '';
        
        Object.values(row).forEach(value => {
            rowHtml += `<td>${value || ''}</td>`;
        });

        tr.innerHTML = rowHtml;
        tableBody.appendChild(tr);
    });
}

// Load CSV for kfold Anemia
loadCSVData('../../static/data/hasil_kfold_anemia.csv', '#kfold');
