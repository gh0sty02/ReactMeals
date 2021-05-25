import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const isEmpty = (value) => {
    return value.trim() === "";
  };
  const isFiveDigit = (value) => {
    console.log(value.trim().length === 5);
    return value.trim().length === 6;
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveDigit(enteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
      street: enteredStreetIsValid,
    });

    const fromIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!fromIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postal: enteredPostal,
      street: enteredStreet,
    });

    console.log(enteredName, enteredStreet, enteredPostal, enteredCity);
  };

  const nameControlClass = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClass = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClass = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClass = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Name Field should not be empty</p>}
      </div>
      <div className={streetControlClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Street Field should not be empty</p>}
      </div>
      <div className={postalControlClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postal && <p>Enter a valid postal code</p>}
      </div>
      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>City Field should not be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
