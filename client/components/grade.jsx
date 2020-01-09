import React from 'react';

function Grade(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <td className='d-flex justify-content-center'>
        <button type='button' className='btn btn-primary' onClick={() => props.update(props.id)}>Update</button>
        <button type='button' className='btn btn-danger ml-3' onClick={() => props.delete(props.id)}>DELETE</button></td>
    </tr>
  );
}

export default Grade;
