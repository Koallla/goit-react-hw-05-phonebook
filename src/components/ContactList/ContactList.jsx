import React from 'react';
import T from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './contactList.module.css';
import slide from '../Transitions/slide.module.css';

const ContactList = ({ contacts, onDelete }) =>
  contacts && (
    <TransitionGroup component="ul" className={styles.list}>
      {contacts.map(el => (
        <CSSTransition
          in
          classNames={slide}
          timeout={250}
          className={styles.item}
          key={el.id}
        >
          <li className={styles.item} key={el.id}>
            <div className={styles.text}>
              {el.name}: <span className={styles.number}>{el.number}</span>
            </div>
            <button
              className={styles.btn}
              type="submit"
              onClick={() => onDelete(el.id)}
            >
              Delete
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );

ContactList.propTypes = {
  contacts: T.arrayOf(T.shape({})).isRequired,
  onDelete: T.func.isRequired,
};

export default ContactList;
