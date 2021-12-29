import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

import { nanoid } from "nanoid";

const filterAllContacts = (contacts, filter) => {
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export default function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      try {
        const contacts = JSON.parse(persistedContacts);

        setContacts(contacts);
      } catch {
        console.log("Error, please try again :(");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contactName) => {
    const contactToAdd = {
      ...contactName,
      id: nanoid(),
    };

    const theSameContact = contacts.some(
      (contact) => contact.name.toLowerCase() === contactName.name.toLowerCase()
    );

    if (theSameContact)
      return alert(`${contactName.name}  is already in contacts.`);
    else setContacts((prevContacts) => [...prevContacts, contactToAdd]);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const filterContact = (e) => {
    setFilter(e.target.value);
  };

  const filteredContact = filterAllContacts(contacts, filter);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={filterContact} />
      <ContactList items={filteredContact} onDeleteContact={deleteContact} />
    </div>
  );
}
