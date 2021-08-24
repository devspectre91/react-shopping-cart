import React from "react";

class SizeFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="py-4">
        <span className="subtitle mx-2 px-1 has-text-weight-bold has-text-dark">
          Sizes:
        </span>
        <div className="columns pt-4 pb-6 sizes-container mx-2 mt-2 is-multiline">
          <span
            onClick={(e) => {
              this.props.handleClick(e);
            }}
            className={
              this.props.selected.includes("XS")
                ? "column selected columns size-filter is-1 button is-rounded"
                : "column columns size-filter is-1 button is-rounded"
            }
          >
            XS
          </span>
          <span
            onClick={(e) => {
              this.props.handleClick(e);
            }}
            className={
              this.props.selected.includes("S")
                ? "column selected columns size-filter is-1 button is-rounded"
                : "column columns size-filter is-1 button is-rounded"
            }
          >
            S
          </span>
          <span
            onClick={(e) => {
              this.props.handleClick(e);
            }}
            className={
              this.props.selected.includes("M")
                ? "column selected columns size-filter is-1 button is-rounded"
                : "column columns size-filter is-1 button is-rounded"
            }
          >
            M
          </span>
          <span
            onClick={(e) => {
              this.props.handleClick(e);
            }}
            className={
              this.props.selected.includes("ML")
                ? "column selected columns size-filter is-1 button is-rounded"
                : "column columns size-filter is-1 button is-rounded"
            }
          >
            ML
          </span>
          <span
            onClick={(e) => {
              this.props.handleClick(e);
            }}
            className={
              this.props.selected.includes("L")
                ? "column selected columns size-filter is-1 button is-rounded"
                : "column columns size-filter is-1 button is-rounded"
            }
          >
            L
          </span>
          <span
            onClick={(e) => {
              this.props.handleClick(e);
            }}
            className={
              this.props.selected.includes("XL")
                ? "column selected columns size-filter is-1 button is-rounded"
                : "column columns size-filter is-1 button is-rounded"
            }
          >
            XL
          </span>
          <span
            onClick={(e) => {
              this.props.handleClick(e);
            }}
            className={
              this.props.selected.includes("XXL")
                ? "column selected columns size-filter is-1 button is-rounded"
                : "column columns size-filter is-1 button is-rounded"
            }
          >
            XXL
          </span>
        </div>
      </div>
    );
  }
}

export default SizeFilter;
