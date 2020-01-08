import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.appendGradeToServer = this.appendGradeToServer.bind(this);
    this.removeGradeFromServer = this.removeGradeFromServer.bind(this);
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

  appendGradeToServer(newFormData) {
    const fetchURL = '/api/grades';
    const initObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFormData)
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

  removeGradeFromServer(idOfGrade) {
    const fetchURL = `/api/grades/${idOfGrade}`;
    const fetchRequest = new Request(fetchURL, { method: 'DELETE' });
    fetch(fetchRequest)
      .then(() => {
        const clonedGradesArray = [...this.state.grades];
        const indexOfObjToRemove = clonedGradesArray.findIndex(obj => obj.id === idOfGrade);
        if (indexOfObjToRemove !== -1) {
          clonedGradesArray.splice(indexOfObjToRemove, 1);
          this.setState({
            grades: clonedGradesArray
          });
        }
      })
      .catch(err => {
        console.error('Caught in App.removeGradeFromServer', err);
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
        <div className="row">
          <GradeTable grades={this.state.grades} delete={this.removeGradeFromServer}/>
          <GradeForm onSubmit={this.appendGradeToServer}/>
        </div>
      </div>
    );
  }
}

export default App;
