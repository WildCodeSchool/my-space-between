import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '../../useRecaptcha';
import Express from 'express';

const ContactForm = () => {
  const [name, setName]       = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const onSubmit = (e: FormEvent)  => {
    e.preventDefault();

    try {
      const res = await fetch('/useRecaptcha'), {
       method: 'POST',
       body: JSON.stringify({
        name,
        surname,
        email,
        message,
        capchaToken,
    })}

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text" required
          id="name"
          name="name"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="surname">Surname</label>
        <input
        type="text" required
        id="surname"
        name="surname"
        value={surname}
        placeholder="Surname"
        onChange={e => setSurName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email" required
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={e=> setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={message}
          placeholder="Message"
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <ReCAPTCHA
      ref={recaptchaRef}
      sitekey="6LfQkCErAAAAADNf4XaMqDIgJtyyBPYy5KIhPJs3" 
      onChange={handleRecaptcha}
      />
      <button disabled={!capchaToken} type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
