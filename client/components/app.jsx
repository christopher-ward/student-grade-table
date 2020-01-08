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
    const initObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const fetchRequest = new Request(fetchURL, initObj);
    fetch(fetchRequest)
      .then(response => {
        return response.json();
      })
      .then(response => {
        const clonedGradesArray = [...this.state.grades];
        // console.log(clonedGradesArray);
        const indexOfObjToRemove = clonedGradesArray.findIndex(obj => obj.id === idOfGrade);
        // console.log(indexOfObjToRemove);
        if (indexOfObjToRemove !== -1) {
          clonedGradesArray.splice(indexOfObjToRemove, 1);
          // console.log(clonedGradesArray);
          this.setState({
            grades: clonedGradesArray
          });
        } else {
          // console.log('sorry');
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
          <GradeTable grades={this.state.grades} />
          <GradeForm onSubmit={this.appendGradeToServer}/>
        </div>
      </div>
    );
  }
}

export default App;
