var currency = [
  { name: "£50", val: 50.0 },
  { name: "£20", val: 20.0 },
  { name: "£10", val: 10.0 },
  { name: "£5", val: 5.0 },
  { name: "£2", val: 2.0 },
  { name: "£1", val: 1.0 },
  { name: "50p", val: 0.50 },
  { name: "20p", val: 0.20 },
  { name: "10p", val: 0.10 },
  { name: "5p", val: 0.05 },
  { name: "2p", val: 0.02 },
  { name: "1p", val: 0.01 },
];

var changeArr = [
  { name: "£50", val: 0 },    // 0
  { name: "£20", val: 0 },
  { name: "£10", val: 0 },
  { name: "£5", val: 0 },
  { name: "£2", val: 0 },
  { name: "£1", val: 0 },
  { name: "50p", val: 0 },
  { name: "20p", val: 0 },
  { name: "10p", val: 0 },
  { name: "5p", val: 0 },
  { name: "2p", val: 0 },
  { name: "1p", val: 0 },    // 11
];

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function checkCashRegister(price, cash, cid) {

  var change = roundToTwo(cash - price);              // changeerence in changeArr
  var currentCustChange = 0;                     // current money given to customer
  var changeForCustomer = roundToTwo(change - currentCustChange);  // money left to give to customer

  // for loop that moves through each currency type in 'currency' array
  for (let i in Object.values(currency)) {

    var currencyName = Object.values(currency[i])[0]  // finds currency name
    var currencyValue = parseFloat(Object.values(currency[i])[1]) // finds currency value
    var cidValue = parseFloat(cid[i][1])             // finds cash-in-drawer value
    var totalValuePerCurrency = 0          // total value of each currency

   console.log(currencyName + ` (${currencyValue})`)
   console.log("Remaining Change for Customer = " + changeForCustomer)
   console.log("Change in Till Per Currency = " + cidValue)


    // while loop to incrementally add money to the 'changeArr' object
    while (changeForCustomer >= currencyValue && cidValue > 0) {

            cidValue = roundToTwo(cidValue - currencyValue)                   // removes one currency from drawer
            currentCustChange = roundToTwo(currentCustChange + currencyValue) // adds one currency to sum

            changeForCustomer = roundToTwo(change - currentCustChange)                // finds new remaining change to give
            totalValuePerCurrency = roundToTwo(totalValuePerCurrency + currencyValue) // adds one currency currency total

            console.log("Change Given = " + totalValuePerCurrency)
            console.log("Change in Till Per Currency = " + cidValue)
            console.log("Remaining Change for Customer = " + changeForCustomer)
          }

     // add 'totalValuePerCurrency' to 'changeArr' array
     console.log("Total Change Given Per Currency = " + totalValuePerCurrency)
     changeArr[i].val = totalValuePerCurrency
     console.log(changeArr)
  }

  return outputCashRegister(currentCustChange, change, cid);
}

// function to indicate till status and change given
function outputCashRegister(currentCustChange, change, cid) {

  // finds total change in drawer (before customer)
  var cidTotal = roundToTwo(cid.map(cidValues => cidValues[1])
                               .reduce((a,b) => a + b, 0))

  console.log("Change For Customer = " + change)
  console.log("Current Customer Change = " + currentCustChange)
  console.log("Starting Change in Drawer = " + cidTotal)

  // if change given to customer is less than expected...unsufficient funds
  if (currentCustChange < change) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
  // if the total cash in the drawer (at the start) is same as the cash given... closed
  else if (currentCustChange == change && currentCustChange == cidTotal) {
    return {status: "CLOSED", change: cid}
  }
  // if the total cash in the drawer (at the start) is greater than the cash given... open
  else if (currentCustChange == change && currentCustChange < cidTotal) {
    return {status: "OPEN", change: changeArr}
  }
}

// console.log(checkCashRegister(56.90, 70, [
//   ["£50", 150.00],
//   ["£20", 100.00],
//   ["£10", 30.00],
//   ["£5", 55.00],
//   ["£2", 2.00],
//   ["£1", 0.0],
//   ["50p", 0.5],
//   ["20p", 1.40],
//   ["10p", 0.90],
//   ["5p", 0.30],
//   ["2p", 0.40],
//   ["1p", 0.50]
// ]))
