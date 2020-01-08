import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleFormChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const gradeInfo = this.state;
    this.props.onSubmit(gradeInfo);
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  render() {
    return (
      <form className="col-3" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>
          Name:
            <input type='text' name='name' placeholder='name' value={this.state.name} onChange={this.handleFormChange}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Course:
            <input type='text' name='course' placeholder='course' value={this.state.course} onChange={this.handleFormChange}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Grade:
            <input type='number' name='grade' placeholder='grade' value={this.state.grade} onChange={this.handleFormChange}/>
          </label>
        </div>
        <>
          <button className="btn btn-primary" type='submit' onSubmit={this.handleSubmit}>Add</button>
          <button className="btn btn-secondary" type='cancel' onClick={this.handleCancel}>Cancel</button>
        </>

      </form>
      /**
       * Favicon User - Name Form
       * - form is type text
       * Favicon Course/Schedule - Course Form
       * - form is type text
       * Favicon Scholar/Grad - Grade Form
       * - form is type number
       *
       * Submit Button with face value Add
       * Submit/Cancel Button with face value Cancel
       * Both next to each other
       *
       */
    );
  }
}

export default GradeForm;
