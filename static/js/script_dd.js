document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });
});

// Path to your CSV file
 const csvFilePath = '../../static/data/hasil_kfold_dd.csv'; // Adjust this path if your CSV is elsewhere
let predictionData = []; // To store the parsed CSV data

// --- Function to fetch and parse CSV ---
async function loadCSVData() {
    try {
        const response = await fetch(csvFilePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        predictionData = parseCSV(csvText);
        renderTable(predictionData);
    } catch (error) {
        console.error("Error loading or parsing CSV:", error);
        tableBody.innerHTML = '<tr><td colspan="10">Gagal memuat data. Pastikan file CSV tersedia.</td></tr>';
    }
}

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

function renderTable(data) {
    const tableBody = document.querySelector('#kfold tbody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="10">Tidak ada data prediksi.</td></tr>';
        return;
    }

    data.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row["Iterasi"] || ''}</td>
            <td>${row["TP"] || ''}</td>
            <td>${row["FP"] || ''}</td>
            <td>${row["FN"] || ''}</td>
            <td>${row["TN"] || ''}</td>
            <td>${row["Accuracy"] || ''}</td>
            <td>${row["Precision"] || ''}</td>
            <td>${row["Recall"] || ''}</td>
            <td>${row["F1-Score"] || ''}</td>
            <td>${row["MCC"] || ''}</td>
        `;
        tableBody.appendChild(tr);
    });
}

loadCSVData();