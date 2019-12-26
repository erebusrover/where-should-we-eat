import React from 'react';

const Students = ({ students }) => (
    <div>
      <ul>
        {students.map(student => (
          <h1>{`${student.studentName}, ${student.house}`}</h1>
        ))}
      </ul>
    </div>
  );

  export default Students;