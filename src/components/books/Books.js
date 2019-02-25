import React, { Component } from "react";
import axios from "axios";

import Book from "./Book";
import Loading from "../common/Loading";

class Books extends Component {
  state = {
    books: [],
    text: "",
    error: "",
    loading: false
  };

  //when the form for book search is submitted
  onFormSubmit = e => {
    e.preventDefault();
    //if the text field is empty
    if (this.state.text.length < 1) {
      return this.setState({ error: "Please provide a book name" });
    }
    //split plain string to array of individual words
    const textArr = this.state.text.split(" ");
    //convert the array of individual words to a query string
    const text = textArr.join("+");
    this.setState({ loading: true });
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}&key=AIzaSyA_DS5vZGiQPG_FIeYFn2wXkCAPhMoYYy8`)
      .then(res => {
        //if no books are found
        if (res.data.totalItems === 0) {
          return this.setState({
            error: "No books found. Please search for a different book",
            loading: false,
            books: []
          });
        } else {
          //if the books are found
          this.setState({
            books: res.data.items,
            error: "",
            loading: false
          });
          console.log(res.data.items);
        }
      }
      ).catch(err => {
        //if the request is not successful
        this.setState({
          loading: false,
          error: "An error has occured"
        });
        console.log(err);
      });
    this.setState({ text: "" });
  };

  //when the value of input field changes
  onFormValueChange = e => {
    this.setState({ text: e.target.value });
  };
  render() {
    const { loading, books } = this.state;
    let data = null;
    //if there are any books, map them to data variable
    if (books.length !== 0) {
      data = books.map(book => (
        <Book key={book.id}
          name={book.volumeInfo.title}
          author={book.volumeInfo.authors}
          publisher={book.volumeInfo.publisher ? book.volumeInfo.publisher : null}
          image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null}
          link={book.volumeInfo.canonicalVolumeLink} />
      ))
    }
    return (
      <div className="container">
        <div>
          <h2 className="text-center" style={{ marginTop: "40px" }}>Book Finder</h2>
          <form className="text-center" style={{ marginTop: "40px" }} onSubmit={this.onFormSubmit}>
            <div className="form-group mb-0">
              <input type="text" className="form-control" value={this.state.text} onChange={this.onFormValueChange} placeholder="Search by book name" />
            </div>
            <button type="submit" className="btn btn-success mt-2">Search</button>
          </form>
          <div className="text-center mt-4">
            {this.state.error ? (<h5 className="text-danger">{this.state.error}</h5>) : null}
            {loading ? <Loading /> : null}
          </div>
        </div>
        <div className="row pt-4">
          {data}
        </div>
      </div>
    );
  }
}

export default Books;