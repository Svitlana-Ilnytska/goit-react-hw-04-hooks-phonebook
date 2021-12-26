import React from "react";
import PropTypes from "prop-types";

import css from "./ContactItem.module.css";

const ContactItem = ({ name, number, onDeleteContact }) => (
  <>
    <p>
      <span>{name}:</span> <a href={`tel:${number}`}> {number}</a>
    </p>

    <button type="button" onClick={onDeleteContact} className={css.button}>
      Delete
    </button>
  </>
);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
