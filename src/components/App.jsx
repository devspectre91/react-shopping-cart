import React from "react";
import SizeFilter from "./SizeFilter";
import Card from "./Card";

import data from "../data.json";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedSize: [],
      sort:"l2h",
      cart: [],
    };

    this.handleClick= this.handleClick.bind(this);
    this.handleChange= this.handleChange.bind(this)
  }

get getProducts(){
let filteredProducts=[];

  if(this.state.selectedSize.length===0){
    filteredProducts=data.products;
  }
  else{
    filteredProducts=data.products.filter(product=>{
      return this.state.selectedSize.some((val) => product.availableSizes.indexOf(val) !== -1);
    });
  }


if(this.state.sort==='l2h'){
  filteredProducts.sort((a, b)=>{return a.price - b.price});
}
if(this.state.sort==='h2l'){
  filteredProducts.sort((a, b)=>{return b.price - a.price});
}

  return filteredProducts;
}


handleClick(e){
    if(this.state.selectedSize.includes(e.target.innerText)){
      let index= this.state.selectedSize.indexOf(e.target.innerText);
      let newArray= [...this.state.selectedSize];
      newArray.splice(index,1);
      this.setState({
          selectedSize:newArray
      })
    }
    else{
      let newArray= [...this.state.selectedSize];
      newArray.push(e.target.innerText);
      this.setState({
        selectedSize:newArray
    });
    }


}

handleChange(e){
     this.setState({
       sort: e.target.value
     })
}

  render() {
  
    return (
      <>
        <h1 className="title has-background-info-light has-text-centered py-3 has-text-dark has-text-weight-bold">
          Shopping Cart
        </h1>
        <div className="columns is-centered mx-4 mt-6">
          <div className="column is-2">
            <SizeFilter handleClick={this.handleClick} selected={this.state.selectedSize}/>
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
                      <select onChange={this.handleChange} value={this.state.sort}>
                        <option value='l2h'>Lowest to Highest</option>
                        <option value='h2l'>Highest to Lowest</option>
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
                    price= {product.price}
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
