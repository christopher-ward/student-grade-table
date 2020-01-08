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
    const value = event.target.type === 'number' ? parseInt(event.target.value) : event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const gradeInfo = this.state;
    this.props.onSubmit(gradeInfo);
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
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
      <form className="col-md-3 justify-content-between" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="d-flex align-items-center">
            <div className='input-group-prepend'>
              <i className="fas fa-user input-group-text"></i>
            </div>
            <input type='text' name='name' placeholder='Name' className='form-control' value={this.state.name} onChange={this.handleFormChange}/>
          </label>
        </div>
        <div className="form-group">
          <label className="d-flex align-items-center">
            <div className='input-group-prepend'>
              <i className="fas fa-list-alt input-group-text"></i>
            </div>
            <input type='text' name='course' placeholder='Course' className='form-control' value={this.state.course} onChange={this.handleFormChange}/>
          </label>
        </div>
        <div className="form-group">
          <label className="d-flex align-items-center">
            <div className='input-group-prepend'>
              <i className="fas fa-graduation-cap input-group-text"></i>
            </div>
            <input type='number' name='grade' placeholder='Grade' className='form-control' value={this.state.grade} onChange={this.handleFormChange}/>
          </label>
        </div>
        <>
          <button className="btn btn-success" type='submit' onSubmit={this.handleSubmit}>Add</button>
          <button className="btn btn-secondary ml-2" type='cancel' onClick={this.handleCancel}>Cancel</button>
        </>
      </form>
    );
  }
}

export default GradeForm;
