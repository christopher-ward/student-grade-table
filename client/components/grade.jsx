import React from 'react';

function Grade(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <td className='d-flex justify-content-end'><button type='button' className='btn btn-danger' onClick={() => props.delete(props.id)}>DELETE</button></td>
    </tr>
  );
}

export default Grade;
