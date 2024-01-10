
      const addItemBtn = document.getElementById('add-item-btn');
addItemBtn.addEventListener('click', addItem);
const currentYear = new Date().getFullYear();
  const lastTwoDigitsOfYear = currentYear.toString().slice(-2);

function addItem() {
  // Create a new item row with description and price inputs
  const itemContainer = document.getElementById('item-container');
  const newItemRow = document.createElement('div');
  newItemRow.classList.add('item-row');
  newItemRow.innerHTML = `
    <input type="text" class="description-input" placeholder="Description">
    <input type="text" class="date-input" placeholder="Date">
    <input type="text" class="qty-input" placeholder="Qty">
    <input type="number" class="price-input" placeholder="Price">
    <button class="delete-button" onclick="deleteItem(this)">X</button>
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
    const qtys = document.getElementsByClassName('qty-input');
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
  <title>ACI/${lastTwoDigitsOfYear}/${invoiceNumber} </title>
  <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css'><link rel="stylesheet" href="invoice.css">


  <link rel="icon" type="image/x-icon" href="favicon.png">
</head>
<body>
<!-- partial:index.partial.html -->
<div class="container">
  <div class="invoice">
    <div class="row">
      <div class="col-7">
        <img src="https://lh3.googleusercontent.com/pw/ABLVV86xDWTsOaA5xTjORdI7WKku1ejrgJgvQY-zvOnrk6QhGyTXLmzTGZXL9tF3aIJhDS3jJnkhk2YYA9h65PkicosWvGohYAygqerZvk9G6ee6TBkynZY=w2400" style="width:250px">
      </div><div class="col-5">
        <p class="text-right">
          <strong>ALFA Creation</strong><br>
          No.527/15 <br> Suhada Mawatha<br>
          Liyanagemulla,Seeduwa<br>
          Srilanka
        </p>
      </div>
      
    </div><br><br><br>
    <div class="row">
      
      <div class="col-10">
        <p class="text-left" style="font-size:20px;"><strong>INVOICE </strong><span style="color: rgb(0, 98, 255);">ACI/${lastTwoDigitsOfYear}/${invoiceNumber}</span></p>
        <div style="padding-left:8px;">
        <p style="font-size:13px;">
        <strong>Invoice Date </strong> : ${currentDate} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Name :</strong> ${billTo}
         
        </p></div>
      </div>
    </div>
    <br>
    <table class="table table-striped">
      <thead>
        <tr style="font-size:15px;">
          <th>Description</th>
          <th></th>
          <th></th>
          <th class="text-right">Date</th>
          <th class="text-right">Qty</th>
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
    const qty = qtys[i].value;
    const price = prices[i].value;
    if (description !== ''&& date !== '' && price !== '') {
      invoiceHTML += `
      <tr>
      <td>${description}</td>
      <td></td>
      <td></td>
      <td class="text-right">${date}</td>
      <td class="text-right">${qty}</td>
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
  </div><br><br><br><p align="center">Thank You !</p>
  <hr>
  <p align="center" class="conditions">
    Email - alfacreation019@gmail.com | Facebook - <a href='https://www.facebook.com/AlfACreationLK/'>https://www.facebook.com/AlfACreationLK/</a>
         
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

    
