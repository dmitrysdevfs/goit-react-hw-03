import { useEffect, useState } from 'react';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import ContactForm from '../ContactForm/ContactForm';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('saved-contacts');

    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }

    return initialContacts;
  });

  useEffect(() => {
    localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>

      <ContactForm onAdd={addContact} />

      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList items={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}
