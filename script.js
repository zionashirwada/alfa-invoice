
      const addItemBtn = document.getElementById('add-item-btn');
addItemBtn.addEventListener('click', addItem);


function addItem() {
  // Create a new item row with description and price inputs
  const itemContainer = document.getElementById('item-container');
  const newItemRow = document.createElement('div');
  newItemRow.classList.add('item-row');
  newItemRow.innerHTML = `
    <input type="text" class="description-input" placeholder="Description">
    <input type="text" class="date-input" placeholder="Date">
    <input type="number" class="price-input" placeholder="Price">
  `;
  itemContainer.appendChild(newItemRow);
}

const generateInvoiceBtn = document.getElementById('generate-invoice-btn');
generateInvoiceBtn.addEventListener('click', generateInvoice);

function generateInvoice() {
  // Get input field values
  const currentDate = new Date().toLocaleDateString();
  const invoiceNumber = document.getElementById('invoice-number').value;
  const billTo = document.getElementById('bill-to').value;
  const descriptions = document.getElementsByClassName('description-input');
    const dates = document.getElementsByClassName('date-input');
  const prices = document.getElementsByClassName('price-input');
  const discount = document.getElementById('discount').value;
  const advance = document.getElementById('advance').value;

  // Calculate subtotal
  let subtotal = 0;
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i].value;
    if (price !== '') {
      subtotal += Number(price);
    }
  }

  // Create the invoice HTML
  let invoiceHTML = `
  <meta charset="UTF-8">
  <title>Alpa Creation - Invoice ${invoiceNumber}</title>
  <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css'><link rel="stylesheet" href="invoice.css">


  <link rel="icon" type="image/x-icon" href="favicon.png">
</head>
<body>
<!-- partial:index.partial.html -->
<div class="container">
  <div class="invoice">
    <div class="row">
      <div class="col-7">
        <img src="https://lh3.googleusercontent.com/XBnXCs9WNnoKpiYsmi5ftdz0eXvIe802h_i2XQujNN84n95HlvIUF4kwEyzDYuVNPIPxGwITontgmlXcTGtyaZdGaH4wfskviJJzy76WOVdM-rFLGoiahUJ8tlAR99hvT522gZnL=w2400" style="width:250px">
      </div><div class="col-5">
        <p class="text-right">
          <strong>ALFA Creation</strong><br>
          No.527/15 Suhada Mavatha<br>
          liyanage mulla,seeduwa<br>
          Srilanka
        </p>
      </div>
      
    </div>
    <div class="row">
      
      <div class="col-7"><div class="col-7"><br><br>
        <p class="text-left"><strong>INVOICE </strong><span style="color: rgb(76, 0, 255);">${invoiceNumber}</span></p>
      </div>
        <br>
        <p>
          <strong>Name : ${billTo}</strong>
          <br>
         
          Invoice Date : ${currentDate}
        </p>
      </div>
    </div>
    <br>
      <br>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Description</th>
          <th></th>
          <th></th>
          <th class="text-right">Date</th>
          <th></th>
          <th class="text-right">Price</th>
        </tr>
      </thead>
      <tbody>

  `;

  // Loop through each item and add it to the invoice HTML
  for (let i = 0; i < descriptions.length; i++) {
    const description = descriptions[i].value;
    const date = dates[i].value;
    const price = prices[i].value;
    if (description !== ''&& date !== '' && price !== '') {
      invoiceHTML += `
      <tr>
      <td>${description}</td>
      <td></td>
      <td></td>
      <td class="text-right">${date}</td>
      <td></td>
      <td class="text-right">${price} LKR</td>
    </tr>
      `;
    }
  }

  invoiceHTML += `
  </tbody>
  </table>
  <div class="row">
    <div class="col-8">
    </div>
    <div class="col-4">
      <table class="table table-sm text-right">
        <tr>
          <td><strong>Subtotal</strong></td>
          <td class="text-right">${subtotal}</td>
        </tr>
        <tr>
          <td><strong>Discount</strong></td>
          <td class="text-right">${discount}</td>
        </tr>
        <tr>
          <td><strong>Advance</strong></td>
          <td class="text-right">${advance}</td>
        </tr>
        <tr>
          <td><strong>Total</strong></td>
          <td class="text-right">${subtotal - discount - advance}</td>
        </tr>
      </table>
    </div>
  </div><br><br><br><br><br><br><br><br><br><p align="center">Thank You !</p>
  <hr>
  <p align="center" class="conditions">
    Email - alfacreation019@gmail.com | Facebook - https://www.facebook.com/AlfACreation/ 
         
  </p>
  

</div>
</div>
<!-- partial -->

</body>
</html>

  `;

  // Open a new window to display the invoice
  const newWindow = window.open();
  newWindow.document.body.innerHTML = invoiceHTML;

  // Remove the print button from the invoice window before printing
  newWindow.onbeforeprint = function() {
    const printBtn = newWindow.document.querySelector('.print-button');
    if (printBtn) {
      printBtn.remove();
    }
  };

  // Add a print button to the invoice window
  const printBtnHTML = `<center><button class="print-button" style="padding: 12.5px 30px;
  border: 0;
  border-radius: 100px;
  background-color: #2ba8fb;
  color: #ffffff;
  font-weight: Bold;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  align-items: center;" onclick="window.print()">Print</button></center><br>`;
  newWindow.document.body.insertAdjacentHTML('beforeend', printBtnHTML);
}

    
