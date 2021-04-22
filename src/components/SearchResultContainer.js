import React, { Component } from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    search: "",
    results: []
  };

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchEmp();
  }

  checkLocation = (location) => {
    const myTable=this.state.results;
    let resultTable=[];
    console.log('myTable',myTable)
    for (var i=0;i<myTable.length;i++){
      if(location.toLowerCase() === myTable[i].location.state.toLowerCase()) {
        resultTable.push(myTable[i]);
      };
    }
    this.setState({
      results: resultTable
    })
  };

  searchEmp = () => {
    API.search()
      .then(res => {
        console.log('data',res.data.results)
        this.setState({ results: res.data.results })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    console.log('btn clicked',this.state.search)
    this.checkLocation(this.state.search);
  };

  dynamicSort = (property) => {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b.name[property].localeCompare(a.name[property]);
        }else{
            return a.name[property].localeCompare(b.name[property]);
        }        
    }
  }

  handleSortFirst = event => {
    event.preventDefault();
    console.log('first Sort clicked')
    this.state.results.sort(this.dynamicSort("first"));
    this.setState({
      results: this.state.results
    })
  }

  handleSortLast = event => {
    event.preventDefault();
    console.log('last Sort clicked')
    this.state.results.sort(this.dynamicSort("last"));
    this.setState({
      results: this.state.results
    })
  }

  render() {
    return (
      <div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ResultList 
          handleSortFirst={this.handleSortFirst}
          handleSortLast={this.handleSortLast}
          results={this.state.results} 
        />
      </div>
    );
  }
}

export default SearchResultContainer;
