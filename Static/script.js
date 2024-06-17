// Function to calculate driver's cash and display seat information
async function calculateDriverCash() {
    const passengerNumber = parseFloat(document.getElementById('passengerNumber').value);
    const taxiFare = parseFloat(document.getElementById('taxiFare').value);

    if (isNaN(passengerNumber) || isNaN(taxiFare)) {
        alert('Please enter valid numbers for both fields.');
        return;
    }

    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ passengerNumber, taxiFare })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('driverCash').innerText = data.driverCash.toFixed(2);

        // Define sections dynamically
        const sections = ['Back Seat', 'Middle Back Seat', 'Middle Front Seat', 'Front Seat'];
        let sectionsHtml = '';

        // Create HTML for each section dynamically
        sections.forEach(section => {
            sectionsHtml += `
                <div class="section">
                    <h3>${section} Info</h3>
                    <label>Seats Occupied:</label>
                    <input type="number" class="seatSize" min="0">
                    <br>
                    <label>Amount Paid:</label>
                    <input type="number" class="seatAmount" min="0" step="0.01">
                    <br>
                    <button onclick="calculateChange('${section}', ${taxiFare})">Calculate Change</button>
                    <p>${section} Change: <span class="change">0</span></p>
                </div>
            `;
        });

        // Insert generated HTML into the sections container
        document.getElementById('sections').innerHTML = sectionsHtml;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Function to calculate change for a specific section
function calculateChange(section, taxiFare) {
    const sectionDiv = Array.from(document.querySelectorAll('.section')).find(div => div.querySelector('h3').innerText === `${section} Info`);
    const seatSize = parseFloat(sectionDiv.querySelector('.seatSize').value);
    const seatAmount = parseFloat(sectionDiv.querySelector('.seatAmount').value);

    if (isNaN(seatSize) || isNaN(seatAmount)) {
        alert('Please enter valid numbers for both fields.');
        return;
    }

    // Calculate the product and change
    const product = seatSize * taxiFare;
    const change = product - seatAmount;

    // Display the change in the respective section
    sectionDiv.querySelector('.change').innerText = change.toFixed(2);
}
