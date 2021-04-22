import React from "react";

function ResultList(props) {
  return (
    <table className="list-group t1">
      <tr>
        <th>Picture</th>
        <th><button onClick={props.handleSortFirst} className='btn btn-outline-primary'>First Name</button></th>
        <th><button onClick={props.handleSortLast} className='btn btn-outline-success'>Last Name</button></th>
        <th>Phone Number</th>
        <th>Email address</th>
        <th>Location</th>
      </tr>
      {props.results.map(result => (
        <tr>
          {/* <td className="list-group-item" key={result.id.value}> */}
          <td>
            <img alt={result.name} className="img-fluid" src={result.picture.large} />
          </td>
          <td>{result.name.first}</td>
          <td>{result.name.last}</td>
          <td>{result.phone}</td>
          <td>{result.email}</td>
          <td>{result.location.state}</td>
        </tr>
      ))}
    </table>
  );
}

export default ResultList;
