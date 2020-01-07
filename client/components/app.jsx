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
        console.error('caught at App.componentDidMount', err);
      });
  }

  appendGradeToServer() {
    const bodyContent = {
      name: 'Joan',
      course: 'Math',
      grade: 95
    };
    const fetchURL = '/api/grades';
    const initObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyContent)
    };
    const fetchRequest = new Request(fetchURL, initObj);
    fetch(fetchRequest)
      .then(response => {
        return response.json();
      })
      .then(response => {
        const newGrades = this.state.grades.concat(response);
        this.setState({
          grades: newGrades
        });
      })
      .catch(err => {
        console.error('Caught in App.appendGradeToServer:', err);
      });
  }

  getAverageGrade() {
    if (this.state.grades.length === 0) {
      return 'N/A';
    }
    let sumOfGrades = null;
    let numberOfStudents = null;
    this.state.grades.forEach(obj => {
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
