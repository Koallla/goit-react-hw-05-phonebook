import React from 'react';
import T from 'prop-types';
import styles from './filter.module.css';

const Filter = ({ value, onChange }) => (
  <div>
    <p>Find contacts by name</p>
    <input
      className={styles.input_filter}
      type="text"
      value={value}
      name="filter"
      placeholder="To find contact ..."
      onChange={onChange}
    />
  </div>
);

Filter.propTypes = {
  value: T.string.isRequired,
  onChange: T.func.isRequired,
};

export default Filter;
