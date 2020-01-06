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

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header />
          <GradeTable grades={this.state.grades} />
        </div>
      </div>
    );
  }
}

export default App;
