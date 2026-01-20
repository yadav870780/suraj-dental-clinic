import React, { useState, useRef, useEffect } from "react";
import "./DentalClinic.css"; // create a CSS file for styling
import logo from "../assets/logo.png";
import dentalCareImg from "../assets/dental-care.png";

export default function DentalClinic() {
  const appointmentRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    branch: "Banjara Hills",
    treatment: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const branches = ["Banjara Hills", "Kondapur", "Beeramguda"];
  const treatments = [
    "Myofunctional Therapy",
    "Root Canal + Same-day Crown",
    "Braces",
    "Invisalign",
    "Dental Implants",
    "Gum Treatment",
    "Teeth Cleaning",
    "Teeth Whitening",
  ];

  // Validate form
  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.phone.match(/^[6-9]\d{9}$/))
      errs.phone = "Invalid phone number";
    if (!formData.treatment) errs.treatment = "Select a treatment";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Appointment Data:", formData);
      setSubmitted(true);
      setFormData({
        fullName: "",
        phone: "",
        branch: "Banjara Hills",
        treatment: "",
        message: "",
      });
      setErrors({});
    }
  };

  // Auto-clear success message after 5 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // Scroll to appointment form
  const scrollToAppointment = () => {
    appointmentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dental-root">
      {/* HEADER */}
      <header className="dental-header">
        <img src={logo} alt="Dental Logo" className="dental-logo" />
        <h1>Tooth Fairy Dental Care</h1>
        <p>Expert Dental Care Near You | Hyderabad</p>
      </header>

      {/* HERO / Call to Action */}
      <section className="dental-hero">
        <img src={dentalCareImg} alt="Dental Care" className="hero-image" />
        <h2>Painless, Affordable & Trusted by 1,00,000+ Happy Smiles</h2>
        <button onClick={scrollToAppointment}>Book an Appointment</button>
      </section>

      {/* CURRENT OFFERS */}
      <section className="dental-offers">
        <h3>Current Dental Offers</h3>
        <ul>
          <li>20% Off on Myofunctional Therapy</li>
          <li>20% Off on Root Canal + Same-day Crown</li>
          <li>Braces from Rs. 34,999/- only</li>
          <li>Up to 50% off on Invisalign</li>
          <li>Dental Implants from Rs.19,999/-</li>
          <li>50% off on Gum Treatment</li>
          <li>Teeth Cleaning From Rs.2499/-</li>
          <li>Teeth Whitening from Rs. 4599/-</li>
          <li>Free X-ray , No Cost EMI</li>
        </ul>
      </section>

      {/* APPOINTMENT FORM */}
      <section id="appointment-form" ref={appointmentRef} className="dental-form">
        <h3>Book an Appointment</h3>
        {submitted && <p className="success-msg">Appointment submitted successfully!</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}

          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <select
            value={formData.branch}
            onChange={(e) =>
              setFormData({ ...formData, branch: e.target.value })
            }
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={formData.treatment}
            onChange={(e) =>
              setFormData({ ...formData, treatment: e.target.value })
            }
          >
            <option value="">Select Treatment</option>
            {treatments.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.treatment && <span className="error">{errors.treatment}</span>}

          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <button type="submit" disabled={Object.keys(errors).length > 0}>
            Submit
          </button>
        </form>
      </section>

      {/* BRANCHES */}
      <section className="dental-branches">
        <h3>Find a ToothFairy Clinic Near You</h3>
        {branches.map((b) => (
          <div key={b} className="branch-card">
            <h4>{b} | Tooth Fairy Dental Care | Hyderabad</h4>
            <button onClick={scrollToAppointment}>Book an Appointment</button>
          </div>
        ))}
      </section>

      {/* WHY CHOOSE US */}
      <section className="dental-why">
        <h3>Why Choose Tooth Fairy?</h3>
        <p>
          Tooth Fairy dental hospitals near you in Hyderabad are your trusted
          destination for complete, compassionate, and advanced dental care.
        </p>
        <ul>
          <li>20 Experienced Doctors</li>
          <li>3 Branches in Hyderabad</li>
          <li>1L+ Happy Smiles</li>
          <li>25K+ Successful Implants</li>
          <li>50K+ Successful RCT’s</li>
          <li>Rated 4.9/5 on Google</li>
        </ul>
      </section>

      <section className="dental-footer">
        <h3>Your dream smile is now just one visit away.</h3>
      </section>
    </div>
  );
}
