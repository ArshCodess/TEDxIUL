"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import './RegistrationForm.css';
import { PASSES_DATA } from '../data/passesData';

const PASS_KEYS = Object.keys(PASSES_DATA);

export default function RegistrationForm() {
  const searchParams = useSearchParams();
  const passParam = searchParams.get('pass');
  const selectedPass = PASS_KEYS.includes(passParam) ? PASSES_DATA[passParam] : null;
  const selectedPassKey = selectedPass ? passParam : '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: '',
    organization: '',
    industry: '',
    specialRequirements: '',
    referral: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setErrors((previous) => ({ ...previous, pass: selectedPass ? undefined : 'Please return to the Register page and choose a valid pass.' }));
  }, [selectedPass]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleCategory = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setErrors((previous) => ({ ...previous, category: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim().replace(/[\s()-]/g, '');
    const organization = formData.organization.trim();

    if (!selectedPass) newErrors.pass = 'Please return to the Register page and choose a valid pass.';
    if (fullName.length < 2 || fullName.length > 100) newErrors.fullName = 'Enter a name between 2 and 100 characters.';
    if (!email) newErrors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email address.';
    if (!phone) newErrors.phone = 'Phone number is required.';
    else if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(phone)) newErrors.phone = 'Enter a valid Indian mobile number.';
    if (!formData.category) newErrors.category = 'Please select an attendee category.';
    if (organization.length < 2 || organization.length > 150) newErrors.organization = 'Enter an organization between 2 and 150 characters.';
    if (!formData.consent) newErrors.consent = 'Please confirm that your information is accurate.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Mock-only until a payment initialization endpoint is available. Submit only the pass key.
      const registrationPayload = {
        passKey: selectedPassKey,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim().replace(/[\s()-]/g, ''),
        category: formData.category,
        organization: formData.organization.trim(),
        industry: formData.industry,
        specialRequirements: formData.specialRequirements.trim(),
        referral: formData.referral,
      };
      void registrationPayload;
      await new Promise((resolve) => setTimeout(resolve, 400));
      toast.success('Details received. Payment integration is coming next.');
      setSuccess(true);
    } catch {
      setErrors((previous) => ({ ...previous, submit: 'We could not prepare your registration. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="form-shell">
      <div className="form-header">
        <p className="form-subtitle">Secure Your Seat</p>
        <h2>Registration Form</h2>
        <p className="form-description">Complete the details below to continue with your TEDxIntegralUniversity pass.</p>
      </div>

      <Toaster position="top-right" toastOptions={{ style: { background: '#121212', color: '#fff', border: '1px solid #E62B1E' } }} />

      {selectedPass ? (
        <section className={`selected-pass selected-pass--${selectedPassKey}`} aria-labelledby="selected-pass-title">
          <div>
            <span className="selected-pass-label" id="selected-pass-title">Selected Pass</span>
            <strong>{selectedPass.name}</strong>
          </div>
          <span className="selected-pass-price">₹{selectedPass.price.toLocaleString('en-IN')}</span>
        </section>
      ) : (
        <section className="form-error form-error-pass" role="alert">
          <strong>No valid pass selected.</strong>
          <span>Please return to the Register page to choose your pass before continuing.</span>
          <a href="/register">Back to Register</a>
        </section>
      )}

      {success && <div className="success-message" role="status">Details received. We will connect payment verification here.</div>}
      {errors.submit && <div className="form-error" role="alert">{errors.submit}</div>}

      <form className="registration-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label>
                <span className="field-label">Full Name <span className="required" aria-hidden="true">*</span></span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : 'fullName-helper'}
                />
                <span className="field-helper" id="fullName-helper">Use the name you would like to appear on your booking and certificate, if applicable.</span>
              </label>
              {errors.fullName && <span className="field-error" id="fullName-error">{errors.fullName}</span>}
            </div>

            <div className="form-row">
              <label>
                <span className="field-label">Email Address <span className="required" aria-hidden="true">*</span></span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email)}
                />
              </label>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-row">
              <label>
                <span className="field-label">Phone Number <span className="required" aria-hidden="true">*</span></span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your 10-digit mobile number"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
              </label>
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="form-row">
              <fieldset className="category-fieldset">
                <legend className="field-label">Attendee Category <span className="required" aria-hidden="true">*</span></legend>
                <span className="field-helper">This helps us understand attendee background and verify eligibility where applicable.</span>
              <div className="category-pills">
                {['Student', 'Teacher/Faculty', 'Professional'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`pill ${formData.category === option ? 'active' : ''}`}
                    onClick={() => handleCategory(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              </fieldset>
              {errors.category && <span className="field-error">{errors.category}</span>}
            </div>

            <div className="form-row">
              <label>
                <span className="field-label">School / University / Company <span className="required" aria-hidden="true">*</span></span>
                <input
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Enter your organization"
                  autoComplete="organization"
                />
              </label>
              {errors.organization && <span className="field-error">{errors.organization}</span>}
            </div>
            {/*
            <div className="form-row">
              <label>
                <span className="field-label">Industry / Domain <span className="optional">(optional)</span></span>
                <select name="industry" value={formData.industry} onChange={handleChange}>
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Research">Research</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              {errors.industry && <span className="field-error">{errors.industry}</span>}
            </div>

            <div className="form-row">
              <label>
                <span className="field-label">Accessibility or Special Requirements <span className="optional">(optional)</span></span>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Let us know about any accessibility, dietary, or other event-related requirements."
                />
              </label>
            </div>
            */}
            <div className="form-row">
              <label>
                <span className="field-label">How did you hear about TEDx? <span className="optional">(optional)</span></span>
                <select name="referral" value={formData.referral} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Friend or colleague">Friend or colleague</option>
                  <option value="University">University</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <label className="consent-row">
              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} aria-invalid={Boolean(errors.consent)} />
              <span>I confirm that the information provided is accurate and may be used for TEDxIntegralUniversity registration, payment-related processing, event communication, and ticket delivery. <span className="required" aria-hidden="true">*</span></span>
            </label>
            {errors.consent && <span className="field-error">{errors.consent}</span>}

            <button type="submit" className="register-btn" disabled={isSubmitting || !selectedPass}>
              {isSubmitting ? 'Preparing payment...' : 'Continue to Payment'}
            </button>
            <p className="payment-note">Your pass will be confirmed only after successful payment verification.</p>
          </form>

          <p className="privacy-note">
            Your information will be used for TEDxIntegralUniversity registration, payment-related processing, event communication, and ticket delivery.
          </p>
    </main>
  );
}
