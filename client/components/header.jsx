import React from 'react';

function Header(props) {
  const average = props.averageGrade;
  return (
    <div className="row justify-content-between align-items-center border-bottom">
      <h1>Student Grade Table</h1>
      <h2>Average Grade: <span className="badge badge-secondary">{average}</span></h2>
    </div>
  );
}

export default Header;
