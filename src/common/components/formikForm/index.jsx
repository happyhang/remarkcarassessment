import * as React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

// Why the need to wrap Formik?
// The most obvious advantage is that you can enforce some form standard and behaviour
// for most (if not all) forms in the App.
function FormikForm({ children, ...props }) {
  return (
    <Formik
      // Framework code
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(f) => children(f)}
    </Formik>
  );
}

FormikForm.propTypes = {
  children: PropTypes.func.isRequired,
};

export default FormikForm;
