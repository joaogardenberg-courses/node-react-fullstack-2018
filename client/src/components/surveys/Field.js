import React from 'react';

const Field = ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="survey-field input-field">
      <input
        { ...input }
        id={ input.name }
      />
      <label
        htmlFor={ input.name }
        className="active"
        style={{ marginBottom: '5px' }}
      >
        { label }
      </label>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        { touched && error }
      </div>
    </div>
  );
};

export default Field;