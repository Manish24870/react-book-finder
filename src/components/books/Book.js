import React from "react";

//individual book component
const Book = props => {
  return (
    <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 mb-4 py-2">
      <div className="card box-shadow h-100" style={{ maxWidth: "540px" }}>
        <div className="row no-gutters h-100">
          <div className="col-md-4">
            <img src={props.image} className="card-img" alt={props.name} />
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column h-100">
              <h5 className="card-title">{props.name}</h5>
              {props.author ? (<p className="card-text">By: {props.author.join(", ")}</p>) : null}
              {props.publisher ? (<p className="card-text">Published By: {props.publisher}</p>) : null}
              <a href={props.link} className="btn btn-info mt-auto align-bottom">See this Book</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Book;