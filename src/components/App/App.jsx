import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyAnimate';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { filterContacts, findToMatch } from '../FilterContact/filterContact';
import pop from '../../Transitions/pop.module.css';
import styles from './app.module.css';
import '../../Transitions/title.css';

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
        ? PNotify.error({
            title: 'Recording prohibited!',
            text: `${findContact.name} is already in contacts`,
            modules: {
              Animate: {
                animate: true,
                inClass: 'lightSpeedIn',
                outClass: 'lightSpeedOut',
              },
            },
            addClass: 'notify',
            animateSpeed: 1000,
            delay: 5000,
          })
        : this.setState(prevState => ({
            contacts: [contact, ...prevState.contacts],
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
        <CSSTransition in classNames="slide" timeout={500} appear>
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
