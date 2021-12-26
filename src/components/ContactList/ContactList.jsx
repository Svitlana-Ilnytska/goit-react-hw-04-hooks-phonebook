import React from "react";
import PropTypes from "prop-types";
import ContactItem from "../ContactItem/ContactItem";

import css from "./ContactList.module.css";

const ContactList = ({ items, onDeleteContact }) => (
  <ul className={css.wrapList}>
    {items.map((item) => (
      <li key={item.id} className={css.wrapItem}>
        <ContactItem
          {...item}
          onDeleteContact={() => onDeleteContact(item.id)}
        />
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
