import { useState } from "react";
import axios from "axios";
import "./ContactForm.css"; // Import the CSS file

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/send-email",formData);
      setStatus(response.data.message);
      setFormData({ name: "", email: "", message: "" }); // Clear form after submission
    } catch (error) {
      setStatus("Error sending email.");
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required/>
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required/>
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  ); 
};

export default ContactForm;
