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
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
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

  handleSubmitForm(newFormData) {
    // console.log(newFormData);s
  }

  appendGradeToServer() {
    const fetchURL = '/api/grades';
    const initObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    };
    const fetchRequest = new Request(fetchURL, initObj);
    fetch(fetchRequest)
      .then(response => {
        return response.json();
      })
      // .then(response => {
      //   const newGrades = this.state.grades.concat(response);
      //   this.setState({
      //     grades: newGrades
      //   });
      // })
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
        <div className="row">
          <GradeTable grades={this.state.grades} />
          <GradeForm onSubmit={this.handleSubmitForm}/>
        </div>
      </div>
    );
  }
}

export default App;
