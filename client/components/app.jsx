import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          grades: response
        });
      })
      .catch(err => {
        console.error('caught at App.getAllTodos', err);
      });
  }

  getAverageGrade() {
    if (this.state.grades.length === 0) {
      return 0;
    }
    let sumOfGrades = null;
    let numberOfStudents = null;
    this.state.grades.map(obj => {
      sumOfGrades += obj.grade;
      numberOfStudents++;
    });
    return Math.ceil(sumOfGrades / numberOfStudents);
  }

  render() {
    const averageGrade = this.getAverageGrade();
    return (
      <div className="container">
        <Header averageGrade={averageGrade}/>
        <GradeTable grades={this.state.grades} />
      </div>
    );
  }
}

export default App;
