import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PNotify from 'pnotify/dist/es/PNotify';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { filterContacts, findToMatch } from '../FilterContact/filterContact';
import slide from '../Transitions/slide.module.css';
import pop from '../Transitions/pop.module.css';
import styles from './app.module.css';

console.log(slide);

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addContact = contact => {
    const findContact = findToMatch(this.state.contacts, contact);
    if (contact.name) {
      // eslint-disable-next-line no-unused-expressions
      findContact
        ? PNotify.alert(`${findContact.name} is already in contacts`)
        : this.setState(prevState => ({
            contacts: [...prevState.contacts, contact],
          }));
    } else {
      PNotify.error({
        text: "'Input name!'",
      });
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContacts(contacts, filter);

    return (
      <div className={styles.container}>
        <CSSTransition in classNames={slide} timeout={250}>
          <h1>Phonebook</h1>
        </CSSTransition>

        <ContactForm
          onChange={this.handleChange}
          onAddContact={this.addContact}
        />
        <h2>Contacts</h2>
        <TransitionGroup>
          {contacts.length > 1 && (
            <CSSTransition timeout={250} classNames={pop}>
              <Filter value={filter} onChange={this.handleChange} />
            </CSSTransition>
          )}
        </TransitionGroup>

        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
