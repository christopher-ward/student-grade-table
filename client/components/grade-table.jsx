import React from 'react';
import Grade from './grade';

class GradeTable extends React.Component {

  tableEmptyStatus() {
    if (this.props.grades.length === 0) return <tr><td colSpan="3" className="no-students">No grades recorded...</td></tr>;
    return this.gradeRowPopulate();
  }

  gradeRowPopulate() {
    return this.props.grades.map(obj =>
      <Grade key={obj.id} name={obj.name} course={obj.course} grade={obj.grade} />
    );
  }

  render() {
    const tableEmptyOrNot = this.tableEmptyStatus();
    return (
      <table className="col table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          {tableEmptyOrNot}
        </tbody>
      </table>
    );
  }
}

export default GradeTable;
