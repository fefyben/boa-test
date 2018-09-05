// Call the getJson function after the html document was loaded and parsed
document.addEventListener('DOMContentLoaded', getJson);

// Get groceries json file data
function getJson() {
  // Fetch data from json file
  fetch('groceries.json')
    // Response from promisse
    .then(res => res.json())
    // Promisse returns data from json
    .then(data => {
      // Create variable to insert data html
      let output = '';

      // Loop through the array to create the html
      data.forEach(function(item) {
        output += `
        <li class="grid-item">
          <article class="card">
            <div class="card-header">
              <span class="card-qty">Qty: ${item.qty}</span>
            </div>
            <div class="card-body">
              <h2 class="card-title">${item.item}</h2>
              <span class="card-brand">${item.brand}</span>
              <span class="card-type">${item.type}</span>
            </div>
            <div class="card-footer">
              <span class="card-category">${item.category}</span>
            </div>
          </article>
        </li>
        `;
      });

      // Output data
      document.getElementById('output').innerHTML = output;
    })
    .catch(() => {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = 'error';
      // Add text
      div.appendChild(document.createTextNode('Data Not Found'));
      // Get parent and before element
      const container = document.querySelector('.container');
      const beforeGrid = document.querySelector('.grid');
      // Insert alert
      container.insertBefore(div, beforeGrid);
    });
}