import React from 'react';
import Grade from './grade';

class GradeTable extends React.Component {

  tableEmptyStatus() {
    if (this.props.grades.length === 0) return <tr><td colSpan="4" className="no-students">No grades recorded...</td></tr>;
    return this.gradeRowPopulate();
  }

  gradeRowPopulate() {
    return this.props.grades.map(obj =>
      <Grade
        key={obj.id}
        id={obj.id}
        name={obj.name}
        course={obj.course}
        grade={obj.grade}
        delete={this.props.delete}
        getGradeInfo={this.props.getGradeInfo}/>
    );
  }

  render() {
    const tableEmptyOrNot = this.tableEmptyStatus();
    return (
      <table className="col table table-striped mt-2">
        <thead>
          <tr>
            <th className="border-top-0" scope="col">Student Name</th>
            <th className="border-top-0" scope="col">Course</th>
            <th className="border-top-0" scope="col">Grade</th>
            <th className="border-top-0 text-center" scope="col" >Operations</th>
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
