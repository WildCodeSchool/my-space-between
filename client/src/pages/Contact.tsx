import { useState } from 'react';
import styles from './Contact.module.css'

export const Contact = () => {
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    setErrors({});
    setSuccessMessage('');

    const validationErrors: { [key: string]: string } = {};

    if (!name.trim()) validationErrors.name = "Name is required";
    if (!surname.trim()) validationErrors.surname = "Surname is required";

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
    validationErrors.email = "Invalid email";
    }
    else {
    setSuccessMessage(" Adresse email valide !");
    }

    if (!message.trim()) validationErrors.message = "The message is mandatory";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
};

  return (    
    <form action={handleSubmit} className= {styles.contactContainer}>
      <h2>CONTACT</h2>
       <div className={styles.underline}></div>


          <p className={styles.paragraph}>
        "Une question ? Un projet ? Envoyez-nous un message !"
      </p>

      <section className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
      </section>

      <section className={styles.form}>
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          id="surname"
          value={surname}
          placeholder="Surname"
          onChange={e => setSurName(e.target.value)}
        />
        {errors.surname && <p className={styles.errorMessage}>{errors.surname}</p>}
      </section>

      <section className={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
      </section>

      <section className={styles.form}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          placeholder="Message"
          onChange={e => setMessage(e.target.value)}
        />
        {errors.message && <p className={styles.errorMessage}>{errors.message}</p>}
      </section>

      {errors.global && <p className={styles.errorMessage}>{errors.global}</p>}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

      <button className={styles.buttonContact} type="submit">Send</button>
    </form>
  );

}



