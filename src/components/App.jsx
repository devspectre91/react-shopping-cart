import React from "react";
import SizeFilter from "./SizeFilter";
import Card from "./Card";

import data from "../data.json";

// 1. Convert the existing UI to use Redux Api for state management.
// 2. Add a modal for checkout
// 3. Add functionality to checkout.

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedSize: [],
      sort: "l2h",
      cart: [],
      count: 0,
      isActive: false,
      totalAmount: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  get getProducts() {
    let filteredProducts = [];

    if (this.state.selectedSize.length === 0) {
      filteredProducts = data.products;
    } else {
      filteredProducts = data.products.filter((product) => {
        //logic to implement size filtering, if available size is ['M'], and selected Size is ['S','M']
        //Array.some() will check for atleast one value in selected size array to be in available size
        //and return true if it is available in atleast one of the selected Size
        return this.state.selectedSize.some(
          (val) => product.availableSizes.indexOf(val) !== -1
        );
      });
    }

    if (this.state.sort === "l2h") {
      filteredProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (this.state.sort === "h2l") {
      filteredProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }

    return filteredProducts;
  }

  handleClick(e, item) {
    //to remove a size filter
    if (e.target.dataset.id === "cart") {
      this.setState({
        isActive: true,
      });
    } else if (
      e.target.dataset.id === "modal" ||
      e.target.dataset.id === "close"
    ) {
      this.setState({
        isActive: false,
      });
    } else if (e.target.dataset.id === "add") {
      item.quantity = 1;
      let index = this.state.cart.findIndex((cartItem) => {
        return item.title === cartItem.title;
      });
      if (index === -1) {
        let count = this.state.count;
        count++;
        this.setState({
          cart: this.state.cart.concat(item),
          count: count,
          totalAmount: this.state.totalAmount+ item.price
        });
      } else {
        let count = this.state.count;
        count++;
        this.state.cart[index].quantity++;
        this.setState({
          cart: [...this.state.cart],
          count: count,
          totalAmount: this.state.totalAmount+item.price
        });
      }
    } else if (e.target.dataset.id === "total") {
     alert(`Your total amount is : $${this.state.totalAmount}`)
    } else {
      if (this.state.selectedSize.includes(e.target.innerText)) {
        let index = this.state.selectedSize.indexOf(e.target.innerText);
        let newArray = [...this.state.selectedSize];
        newArray.splice(index, 1);
        this.setState({
          selectedSize: newArray,
        });
      } else {
        //to add a size filter
        let newArray = [...this.state.selectedSize];
        newArray.push(e.target.innerText);
        this.setState({
          selectedSize: newArray,
        });
      }
    }
  }

  handleChange(e) {
    this.setState({
      sort: e.target.value,
    });
  }

  render() {
    return (
      <>
        <div className={this.state.isActive ? "modal is-active" : "modal"}>
          <div
            class="modal-background"
            data-id="modal"
            onClick={this.handleClick}
          ></div>
          <div class="modal-card">
            <header class="modal-card-head has-background-warning">
              <p class="modal-card-title">Shopping Summary</p>
              <button
                class="delete"
                onClick={this.handleClick}
                data-id="close"
                aria-label="close"
              ></button>
            </header>
            <section class="modal-card-body">
              {this.state.cart.map((item) => {
                return (
                  <div className="columns mt-1 mb-4 box has-background-light">
                    <div className="column is-3">
                      <div className="card-image">
                        <img
                          src={`/static/products/${item.image}_2.jpg`}
                          alt="Placeholder "
                        />
                      </div>
                    </div>
                    <div className="column is-8">
                      <div className="is-size-4 has-text-weight-bold">
                        {item.title}
                      </div>
                      <div className="subtitle has-text-weight-bold ">
                        <span className="has-text-success-dark">
                          {" "}
                          ${item.price}
                        </span>
                      </div>
                      <div className="button">{item.quantity}</div>
                      <div className="subtitle has-text-weight-bold  mt-4">
                        {`$${item.price} x ${item.quantity} = `}{" "}
                        <span className="has-text-success-dark">
                          {" "}
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            <div className="level has-background-warning box modal-footer p-4">
              <div className="level-left is-size-5">
                Your Total amount is: {this.state.totalAmount}
              </div>
              <div className="level-right">
                <button class="button is-success" data-id='total' onClick={this.handleClick} >Checkout</button>
              </div>
            </div>
          </div>
        </div>
        <h1 className="title has-background-info-light has-text-centered py-5 has-text-dark has-text-weight-bold">
          Shopping Cart
        </h1>
        <div className="cart">
          <i
            class="fas fa-shopping-cart fa-2x"
            data-id="cart"
            onClick={this.handleClick}
          ></i>
          <span className="no-of-items">{this.state.count}</span>
        </div>
        <div className="columns is-centered mx-4 mt-6">
          <div className="column is-2">
            <SizeFilter
              handleClick={this.handleClick}
              selected={this.state.selectedSize}
            />
          </div>
          <div className="column is-10 ">
            <div className="py-1 level mx-6">
              <div className="level-left">
                <span className="tag is-info ">
                  {this.getProducts.length} Product(s) found
                </span>
              </div>
              <div className="level-right">
                <div className="level-item field has-addons">
                  <div className="control">
                    <a className="button is-static">Order By</a>
                  </div>
                  <div className="control">
                    <span className="select">
                      <select
                        onChange={this.handleChange}
                        value={this.state.sort}
                      >
                        <option value="l2h">Lowest to Highest</option>
                        <option value="h2l">Highest to Lowest</option>
                      </select>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* UI code for Cards */}
            <div className="columns is-multiline pl-6 pt-6 ">
              {this.getProducts.map((product) => {
                // {
                //   "availableSizes": ["L", "XL"],
                //   "currencyFormat": "$",
                //   "currencyId": "USD",
                //   "description": "",
                //   "id": 10,
                //   "installments": 9,
                //   "isFreeShipping": true,
                //   "price": 49,
                //   "sku": 27250082398145996,
                //   "style": "",
                //   "title": "On The Streets Black T-Shirt"
                // }
                return (
                  <Card
                    key={product.id}
                    isFreeShipping={product.isFreeShipping}
                    sku={product.sku}
                    title={product.title}
                    price={product.price}
                    addItem={this.handleClick}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
