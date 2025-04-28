import { useState, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '../../useRecaptcha';
import styles from './Contact_form.module.css'

const ContactForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const validationErrors: { [key: string]: string } = {};

    if (!name.trim()) validationErrors.name = "Name is required";
    if (!surname.trim()) validationErrors.surname = "Surname is required";
    if (!email.includes('@')) validationErrors.email = "Invalid email";
    if (!message.trim()) validationErrors.message = "The message is mandatory";
    if (!capchaToken) validationErrors.captcha = "Please validate the reCAPTCHA";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, message, capchaToken })
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        setErrors({ global: msg || 'An error has occurred' });
      } else {
        setName('');
        setSurName('');
        setEmail('');
        setMessage('');
        recaptchaRef.current?.reset();
        setSuccessMessage('Your message has been sent successfully!');
      }
    } catch (err) {
      console.error(err);
      setErrors({ global: 'A network error has occurred.' });
    }
  };

  return (    
    <form onSubmit={handleSubmit} className= {styles.contactContainer}>
      <section className={styles.form}>
        <h2>Contact</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
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
        {errors.surname && <p style={{ color: 'red' }}>{errors.surname}</p>}
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
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </section>

      <section className={styles.form}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          placeholder="Message"
          onChange={e => setMessage(e.target.value)}
        />
        {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
      </section>

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LfQkCErAAAAADNf4XaMqDIgJtyyBPYy5KIhPJs3"
        onChange={handleRecaptcha}
      />
      {errors.captcha && <p style={{ color: 'red' }}>{errors.captcha}</p>}

      {errors.global && <p style={{ color: 'red', marginTop: '10px' }}>{errors.global}</p>}
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}

      <button className={styles.form} type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
