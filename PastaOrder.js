const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  TYPE: Symbol("type"),
  SAUCE: Symbol("sauce"),
  SALAD: Symbol("salad"),
  DRINKS: Symbol("drinks"),
  DESSERT: Symbol("dessert"),
  PAYMENT: Symbol("payment"),
});

module.exports = class PastaOrder extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sType = "";
    this.sSauce = "";
    this.sDrinks = "";
    this.sDessert = "";
    this.sItem = "Pasta";
    this.sItem2 = "Salad";
    this.sSalad = "";
    this.sSizeAmount = 0;
    this.sTypeAmount = 0;
    this.sSauceAmount = 0;
    this.sItem2Amount = 0;
    this.sDrinksAmount = 0;
    this.sDessertAmount = 0;
    this.sTotal = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE;
        aReturn.push("Welcome to Conestoga's Pasta Shop.");
        aReturn.push("What size would you like(Small / Medium / Large)?");
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TYPE;
        //Check the size input
        let size = sInput.toLowerCase();
        if (size !== "small" && size !== "medium" && size !== "large") {
          this.stateCur = OrderState.SIZE;
          aReturn.push("Please enter a correct size (Small / Medium / Large)");
          break;
        }
        //calculate the size money
        if (size === "small") this.sSizeAmount = 2;
        if (size === "medium") this.sSizeAmount = 3;
        if (size === "large") this.sSizeAmount = 4;
        console.log(`size: $${this.sSizeAmount}`);
        this.sSize = sInput;
        aReturn.push("What type would you like(Rotini / Spaghetti / Penne)?");
        break;
      case OrderState.TYPE:
        this.stateCur = OrderState.SAUCE;
        //Check the type input
        let type = sInput.toLowerCase();
        if (type !== "rotini" && type !== "spaghetti" && type !== "penne") {
          this.stateCur = OrderState.TYPE;
          aReturn.push(
            "We don't have that type, please choose a right one (Rotini / Spaghetti / Penne)"
          );
          break;
        }
        //calculate the type money
        if (type === "rotini") this.sTypeAmount = 2;
        if (type === "spaghetti") this.sTypeAmount = 1;
        if (type === "penne") this.sTypeAmount = 2;
        console.log(`type: $${this.sTypeAmount}`);
        this.sType = sInput;
        aReturn.push("What sauce would you like (ketchup / BBQ)");
        break;

      case OrderState.SAUCE:
        this.stateCur = OrderState.SALAD;
        //Check the sauce input
        let sauce = sInput.toLowerCase();
        if (sauce !== "ketchup" && sauce !== "bbq") {
          this.stateCur = OrderState.SAUCE;
          aReturn.push(
            "We don't have that sauce, please choose a right one (ketchup / BBQ)"
          );
          break;
        }
        //calculate the sauce money
        if (sauce === "ketchup") this.sSauceAmount = 2;
        if (sauce === "bbq") this.sSauceAmount = 3;
        console.log(`sauce: $${this.sSauceAmount}`);
        this.sSauce = sInput;
        aReturn.push(
          "Would you like a salad? We offer Italian Salad and Caesar Salad"
        );
        break;
      case OrderState.SALAD:
        this.stateCur = OrderState.DESSERT;
        let salad = sInput.toLowerCase();
        if (salad === "no") {
          aReturn.push("Would you like a dessert (cake / yogurt)");
          break;
        }
        //Check the salad input
        if (
          salad !== "italian salad" &&
          salad !== "caesar salad" &&
          salad !== "italian" &&
          salad !== "caesar"
        ) {
          this.stateCur = OrderState.SALAD;
          aReturn.push(
            "We don't have that Salad, please choose a right one (Italian Salad / Caesar Salad)"
          );
          break;
        }
        //calculate the salad money
        if (salad === "italian salad" || salad === "italian")
          this.sItem2Amount = 10;
        if (salad === "caesar salad" || salad === "caesar")
          this.sItem2Amount = 12;
        console.log(`salad: $${this.sItem2Amount}`);
        this.sSalad = sInput;
        aReturn.push("Would you like a dessert (cake / yogurt)");
        break;
      case OrderState.DESSERT:
        this.stateCur = OrderState.DRINKS;
        if (sInput.toLowerCase() === "no") {
          aReturn.push("Would you like drinks with that?");
          break;
        }
        //check the dessert input
        let dessert = sInput.toLowerCase();
        if (dessert !== "cake" && dessert !== "yogurt") {
          this.stateCur = OrderState.DESSERT;
          aReturn.push(
            "We don't have that dessert, please choose a right one(cake / yogurt)"
          );
          break;
        }
        //calculate the dessert money
        if (dessert === "cake") this.sDessertAmount += 5;
        if (dessert === "yogurt") this.sDessertAmount += 3;
        console.log(`dessert: $${this.sDessertAmount}`);
        this.sDessert = sInput;
        aReturn.push("Would you like drinks with that?");
        break;

      case OrderState.DRINKS:
        this.stateCur = OrderState.PAYMENT;
        //this.sDrinksAmount = 0;
        //this.nOrder = 15;
        let drink = sInput.toLowerCase();
        if (drink !== "coke" && drink !== "sprite" && drink !== "no") {
          this.stateCur = OrderState.DRINKS;
          aReturn.push(
            "We don't have that drink, please choose a right one(coke / sprite)"
          );
          break;
        }
        if (drink === "coke") this.sDrinksAmount = 5;
        if (drink === "sprite") this.sDrinksAmount = 4;
        this.sDrinks = sInput;

        console.log(`drink: $${this.sDrinksAmount}`);
        this.sTotal =
          this.sSizeAmount +
          this.sTypeAmount +
          this.sSauceAmount +
          this.sItem2Amount +
          this.sDessertAmount +
          this.sDrinksAmount;
        this.nOrder = this.sTotal;
        //console.log(`nOrder:$${this.nOrder}`);
        // aReturn.push("Thank-you for your order of");
        // aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
        // if (this.sDrinks) {
        //   aReturn.push(this.sDrinks);
        // }
        aReturn.push("Thank-you for your order of");
        aReturn.push(
          `${this.sSize} ${this.sType} ${this.sItem} with ${this.sSauce} sauce`
        );
        if (this.sSalad) {
          aReturn.push(` ${this.sSalad} ${this.sItem2}`);
        }
        if (this.sDessert) {
          aReturn.push(`with dessert ${this.sDessert}`);
        }
        if (this.sDrinks.toLowerCase() !== "no") {
          aReturn.push(`plus ${this.sDrinks}`);
        }
        aReturn.push(
          `Total is $${this.nOrder}. Please pay for your order here`
        );
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        break;
      case OrderState.PAYMENT:
        //console.log(sInput);
        this.isDone(true);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        let address =
          sInput.purchase_units[0].shipping.address.address_line_1 +
          "," +
          sInput.purchase_units[0].shipping.address.admin_area_2 +
          "," +
          sInput.purchase_units[0].shipping.address.admin_area_1 +
          "," +
          sInput.purchase_units[0].shipping.address.postal_code;
        aReturn.push(
          `Your order will be delivered at ${address} at ${d.toTimeString()}`
        );
        break;
    }
    return aReturn;
  }
  renderForm(sTitle = "-1", sAmount = "-1") {
    // your client id should be kept private
    if (sTitle != "-1") {
      this.sItem = sTitle;
    }
    if (sAmount != "-1") {
      this.nOrder = sAmount;
    }
    const sClientID =
      process.env.SB_CLIENT_ID ||
      "put your client id here for testing ... Make sure that you delete it before committing";
    return `
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your ${this.sItem} order of $${
      this.nOrder
    }.
        <div id="paypal-button-container"></div>
        <script src="/js/store.js" type="module"></script>
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.nOrder}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    details.item=${JSON.stringify(this)};
                    window.StoreData(details);
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `;
  }
};
