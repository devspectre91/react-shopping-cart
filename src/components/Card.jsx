import React from "react";

class Card extends React.Component {
 

  render() {
    return (
      <>
       <div className="column is-3  card ">
            <div className="card-image">
              <img
                src={`/static/products/${this.props.sku}_1.jpg`}
                alt="Placeholder "
              />
            </div>

            <div className="card-content m-0 px-0 py-0 ">
              <p className='has-text-weight-bold card-title has-text-centered m-0 py-1'>{this.props.title}</p>
              <p className='has-text-weight-bold price has-text-success-dark has-text-centered py-1 is-size-6'>Price: ${this.props.price}</p>
            </div>
            <a
          
              className="button add-cart is-fullwidth"
              data-id='add'
              onClick={(e)=>{this.props.addItem(e, {image:this.props.sku, title:this.props.title, price: this.props.price})}}
            >
              Add to Cart
            </a>
           {this.props.isFreeShipping?  <p className="tag free has-background-black has-text-white">
              Free Shipping
            </p> :null}
          </div>
        
      </>
    );
  }
}

export default Card;
