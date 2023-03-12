import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    let isAdded = false;
    contacts.forEach(el => {
      if (el.name.toLowerCase() === normalizedName) {
        alert(`${name} is already in contacts`);
        isAdded = true;
      }
    });

    if (isAdded) {
      return;
    }
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value.trim());
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = todoId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== todoId)
    );
  };
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <h3>All contacts: {contacts.length}</h3>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
