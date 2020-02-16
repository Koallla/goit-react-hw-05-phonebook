import React, { Component } from 'react';
import PNotify from 'pnotify/dist/es/PNotify';
import shortid from 'short-id';
import T from 'prop-types';
import styles from './contactForm.module.css';
import 'pnotify/dist/PNotifyBrightTheme.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: T.func.isRequired,
  };

  state = INITIAL_STATE;

  handleChange = e => {
    const { name, value } = e.target;
    if (name === 'number' && Number.isNaN(Number(value))) {
      PNotify.alert('Input only number');
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { number } = this.state;
    const { onAddContact } = this.props;

    if (number) {
      const contact = {
        id: shortid.generate(),
        name: this.state.name,
        number: this.state.number,
      };

      onAddContact(contact);

      this.setState({
        ...INITIAL_STATE,
      });
      return;
    }
    PNotify.alert('You have not entered a number');
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <p className={styles.text_form}>Name</p>
        <input
          className={styles.input_form}
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          placeholder="Enter contact"
        />
        <p className={styles.text_form}>Number</p>
        <input
          className={styles.input_form}
          type="tel"
          name="number"
          value={number}
          onChange={this.handleChange}
          placeholder="Enter number"
        />
        <button className={styles.btn_submit} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
