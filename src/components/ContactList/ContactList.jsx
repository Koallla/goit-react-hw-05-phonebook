import React from 'react';
import T from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './contactList.module.css';
import slide from '../../Transitions/slide.module.css';

const ContactList = ({ contacts, onDelete }) =>
  contacts && (
    <TransitionGroup component="ul" className={styles.list}>
      {contacts.map(contact => (
        <CSSTransition
          in
          classNames={slide}
          timeout={250}
          unmountOnExit
          className={styles.item}
          key={contact.id}
        >
          <li className={styles.item} key={contact.id}>
            <div className={styles.text}>{contact.name}</div>
            <span className={styles.number}>{contact.number}</span>
            <button
              className={styles.btn}
              type="submit"
              onClick={() => onDelete(contact.id)}
            ></button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );

ContactList.propTypes = {
  contacts: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      name: T.string.isRequired,
      number: T.string.isRequired,
    }),
  ).isRequired,
  onDelete: T.func.isRequired,
};

export default ContactList;
