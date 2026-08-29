"use client";

import React, { useState, useEffect, useRef } from 'react';

const OTP_LENGTH = 6;
const CATEGORIES = ['Student', 'Teacher/Faculty', 'Professional'];
const heardAboutTedx_OPTIONS = [
    'Instagram',
    'LinkedIn',
    'Google Search',
    'Friend or colleague',
    'University',
    'Other',
];

export default function VerificationModal({
    isOpen,
    onClose,
    onVerifySuccess,
    onError,
    passName = 'Pass Registration',
    initialData = {},
}) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);

    const [formData, setFormData] = useState({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        category: initialData.category || '',
        organization: initialData.organization || '',
        heardAboutTedx: initialData.heardAboutTedx || '',
        consent: initialData.consent || false,
    });

    const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''));
    const otpRefs = useRef([]);

    useEffect(() => {
        if (isOpen && initialData) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
            }));
        }
    }, [isOpen, initialData]);

    useEffect(() => {
        let timer;
        if (isOpen && step === 2 && resendTimer > 0) {
            timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isOpen, step, resendTimer]);

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                category: '',
                organization: '',
                heardAboutTedx: '',
                consent: false,
            });
            setOtpDigits(Array(OTP_LENGTH).fill(''));
            setResendTimer(30);
            setLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const normalizePhoneNumber = (value) => value.replace(/\D/g, '').slice(-10);
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    const isValidPhone = (value) => normalizePhoneNumber(value).length === 10;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const focusOtpIndex = (index) => {
        const input = otpRefs.current[index];
        if (input) input.focus();
    };

    const handleOtpDigitChange = (index, value) => {
        const sanitizedValue = value.replace(/\D/g, '').slice(-1);
        const nextDigits = [...otpDigits];
        nextDigits[index] = sanitizedValue;
        setOtpDigits(nextDigits);

        if (sanitizedValue && index < OTP_LENGTH - 1) {
            focusOtpIndex(index + 1);
        }
    };

    const handleOtpKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
            focusOtpIndex(index - 1);
        }
        if (event.key === 'ArrowLeft' && index > 0) {
            focusOtpIndex(index - 1);
        }
        if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
            focusOtpIndex(index + 1);
        }
    };

    const handleOtpPaste = (event) => {
        event.preventDefault();
        const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        if (!pasted) return;

        const nextDigits = Array(OTP_LENGTH).fill('');
        pasted.split('').forEach((digit, index) => {
            nextDigits[index] = digit;
        });

        setOtpDigits(nextDigits);
        focusOtpIndex(Math.min(pasted.length, OTP_LENGTH - 1));
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const fullName = formData.fullName.trim();
        const email = formData.email.trim();
        const phone = normalizePhoneNumber(formData.phone);
        const category = formData.category;
        const organization = formData.organization.trim();
        const heardAboutTedx = formData.heardAboutTedx.trim();

        if (fullName.length < 2 || fullName.length > 100) {
            return onError('Enter a valid name between 2 and 100 characters.');
        }
        if (!email || !isValidEmail(email)) {
            return onError('Please enter a valid email address.');
        }
        if (!phone || !isValidPhone(formData.phone)) {
            return onError('Please enter a valid 10-digit mobile number.');
        }
        if (!formData.category) {
            return onError('Please select an attendee category.');
        }
        if (organization.length < 2 || organization.length > 150) {
            return onError('Enter an organization between 2 and 150 characters.');
        }
        if (!formData.consent) {
            return onError('Please confirm that your information is accurate.');
        }

        setLoading(true);
        try {
            console.log(formData);
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.toLowerCase(), name: fullName, phoneNumber: phone, category: category, organization: organization, heardAboutTedx: heardAboutTedx }),
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.error || data.message || 'Unable to send the verification OTP.');

            setStep(2);
            setResendTimer(30);
            setOtpDigits(Array(OTP_LENGTH).fill(''));
            setTimeout(() => focusOtpIndex(0), 50);
        } catch (err) {
            console.error(err);
            onError(err.message || 'Unable to send the verification OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;
        setResendTimer(30);
        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email.trim().toLowerCase(),
                    name: formData.fullName.trim(),
                    phoneNumber: normalizePhoneNumber(formData.phone),
                }),
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.error || data.message || 'Unable to resend the OTP.');

            setOtpDigits(Array(OTP_LENGTH).fill(''));
            setTimeout(() => focusOtpIndex(0), 50);
        } catch (err) {
            console.error(err);
            setResendTimer(0);
            onError(err.message || 'Unable to resend the OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const otp = otpDigits.join('');
        if (otp.length !== OTP_LENGTH) return onError('Please enter the complete 6-digit OTP.');

        setLoading(true);
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email.trim().toLowerCase(), otp }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || data.success !== true) {
                throw new Error(data.error || data.message || 'Invalid or expired OTP. Please try again.');
            }

            onVerifySuccess({
                name: formData.fullName.trim(),
                email: formData.email.trim().toLowerCase(),
                phoneNumber: normalizePhoneNumber(formData.phone),
                category: formData.category,
                organization: formData.organization.trim(),
                heardAboutTedx: formData.heardAboutTedx,
                consent: formData.consent,
            });
        } catch (err) {
            console.error(err);
            onError(err.message || 'Unable to verify the OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tedx-modal-backdrop">
            <div className="tedx-modal compact">
                <button className="tedx-modal-close" onClick={onClose} aria-label="Close modal">
                    ✕
                </button>

                <div className="tedx-modal-header">
                    <span className="tedx-modal-tag">Identity Verification</span>
                    <h3>{passName}</h3>
                </div>

                <div className="tedx-step-indicator">
                    <div className="tedx-step-track">
                        <span className={`tedx-step-dot ${step === 1 ? 'active' : ''}`} />
                        <span className={`tedx-step-dot ${step === 2 ? 'active' : ''}`} />
                    </div>
                    <span className="tedx-step-text">Step {step} of 2</span>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="tedx-modal-form">
                        <div className="tedx-form-grid">
                            <div className="tedx-field">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="tedx-field">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="tedx-field">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    inputMode="numeric"
                                    placeholder="99xxxxxxx4"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                                        }))
                                    }
                                />
                            </div>

                            <div className="tedx-field">
                                <label>School / Company *</label>
                                <input
                                    type="text"
                                    name="organization"
                                    required
                                    placeholder="Organization name"
                                    value={formData.organization}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="tedx-field">
                            <label>Attendee Category *</label>
                            <div className="category-pills-compact">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        className={`pill-compact ${formData.category === cat ? 'active' : ''}`}
                                        onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="tedx-field">
                            <label>How did you hear about TEDx?</label>
                            <select name="heardAboutTedx" value={formData.heardAboutTedx} onChange={handleChange}>
                                <option value="">Select option (optional)</option>
                                {heardAboutTedx_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="consent-row-compact">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                            />
                            <span>I confirm provided information is accurate for pass issuing. *</span>
                        </label>

                        <button type="submit" disabled={loading} className="tedx-modal-submit">
                            {loading ? 'Sending OTP...' : 'Send Verification OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="tedx-modal-form">
                        <p className="tedx-modal-desc">
                            Enter the 6-digit code sent to <strong>{formData.email}</strong>
                        </p>
                        <div className="tedx-field">
                            <div className="tedx-otp-grid" onPaste={handleOtpPaste}>
                                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            otpRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={otpDigits[index]}
                                        autoComplete="one-time-code"
                                        className="tedx-otp-box"
                                        onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="tedx-otp-actions">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendTimer > 0}
                                className="tedx-resend-btn"
                            >
                                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                            </button>
                        </div>
                        <button type="submit" disabled={loading} className="tedx-modal-submit">
                            {loading ? 'Verifying...' : 'Verify & Proceed'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}