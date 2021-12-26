import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

import { nanoid } from "nanoid";

const filterAllContacts = (contacts, filter) => {
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      try {
        const contacts = JSON.parse(persistedContacts);

        this.setState({ contacts });
      } catch {
        console.log("Error, please try again :(");
      }
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contactName) => {
    const contactToAdd = {
      ...contactName,
      id: nanoid(),
    };
    const theSameContact = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === contactName.name.toLowerCase()
    );

    if (theSameContact)
      return alert(`${contactName.name}  is already in contacts.`);
    else
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contactToAdd],
      }));
  };

  deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };

  filterContact = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContact = filterAllContacts(contacts, filter);
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.filterContact} />
        <ContactList
          items={filteredContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}


// import React, { Component } from "react";
// import ContactForm from "./components/ContactForm/ContactForm";
// import ContactList from "./components/ContactList/ContactList";
// import Filter from "./components/Filter/Filter";

// import { nanoid } from "nanoid";

// const filterAllContacts = (contacts, filter) => {
//   return contacts.filter((contact) =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );
// };

// export default class App extends Component {
//   state = {
//     contacts: [
//       { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

//   componentDidMount() {
//     const persistedContacts = localStorage.getItem("contacts");

//     if (persistedContacts) {
//       try {
//         const contacts = JSON.parse(persistedContacts);

//         this.setState({ contacts });
//       } catch {
//         console.log("Error, please try again :(");
//       }
//     }
//   }

//   componentDidUpdate(prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = (contactName) => {
//     const contactToAdd = {
//       ...contactName,
//       id: nanoid(),
//     };
//     const theSameContact = this.state.contacts.some(
//       (contact) => contact.name.toLowerCase() === contactName.name.toLowerCase()
//     );

//     if (theSameContact)
//       return alert(`${contactName.name}  is already in contacts.`);
//     else
//       this.setState(({ contacts }) => ({
//         contacts: [...contacts, contactToAdd],
//       }));
//   };

//   deleteContact = (id) => {
//     this.setState((state) => ({
//       contacts: state.contacts.filter((contact) => contact.id !== id),
//     }));
//   };

//   filterContact = (e) => {
//     this.setState({ filter: e.target.value });
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContact = filterAllContacts(contacts, filter);
//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onAddContact={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter value={filter} onChangeFilter={this.filterContact} />
//         <ContactList
//           items={filteredContact}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }