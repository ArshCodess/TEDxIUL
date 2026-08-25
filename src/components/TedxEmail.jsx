import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from '@react-email/components';

export const TedxOtpEmail = ({ name = 'Attendee', otp = '000000', eventName = 'TEDxIntegralUniversity' }) => {
  return (
    <Html>
      <Head />
      <Preview>Your verification code for {eventName}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          {/* Header Branding */}
          <Section style={styles.header}>
            <Text style={styles.logoText}>
              <span style={styles.tedRed}>TEDx</span>
              <span style={styles.orgName}>IntegralUniversity</span>
            </Text>
            <Text style={styles.tagline}>x = independently organized TED event</Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Body Content */}
          <Section style={styles.content}>
            <Text style={styles.eyebrow}>PASS IDENTITY VERIFICATION</Text>
            <Heading style={styles.heading}>Confirm Your Identity</Heading>
            <Text style={styles.paragraph}>
              Hello <strong style={{ color: '#ffffff' }}>{name}</strong>,
            </Text>
            <Text style={styles.paragraph}>
              Please use the following One-Time Password (OTP) to authorize your pass purchase and verify your attendee identity for <strong style={{ color: '#ffffff' }}>{eventName}</strong>.
            </Text>

            {/* OTP Code Display Box */}
            <Section style={styles.otpBox}>
              <Text style={styles.otpText}>{otp}</Text>
            </Section>

            <Text style={styles.expiryNote}>
               This code will expire in <strong>5 minutes</strong>. Do not share this code with anyone.
            </Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Footer Legal & Info */}
          <Section style={styles.footer}>
            <Text style={styles.footerLegal}>
              This independent TEDx event is operated under license from TED.
            </Text>
            <Text style={styles.footerText}>
              If you did not request this verification, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default TedxOtpEmail;

const styles = {
  main: {
    backgroundColor: '#0a0a0c',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '40px 0',
  },
  container: {
    backgroundColor: '#111115',
    border: '1px solid #22222a',
    borderRadius: '12px',
    maxWidth: '480px',
    margin: '0 auto',
    padding: '32px 28px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    margin: '0 0 4px 0',
  },
  tedRed: {
    color: '#EB0028',
  },
  orgName: {
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: '10px',
    color: '#888899',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: 0,
  },
  divider: {
    borderColor: '#22222a',
    margin: '24px 0',
  },
  content: {
    textAlign: 'left',
  },
  eyebrow: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#EB0028',
    letterSpacing: '2px',
    margin: '0 0 8px 0',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 16px 0',
  },
  paragraph: {
    color: '#A0A0B0',
    fontSize: '14px',
    lineHeight: '22px',
    margin: '0 0 12px 0',
  },
  otpBox: {
    backgroundColor: '#18181f',
    border: '1px solid #282835',
    borderRadius: '8px',
    textAlign: 'center',
    padding: '20px',
    margin: '24px 0',
    boxShadow: 'inset 0 0 12px rgba(235, 0, 40, 0.08)',
  },
  otpText: {
    color: '#EB0028',
    fontSize: '36px',
    fontWeight: '800',
    letterSpacing: '8px',
    margin: 0,
    fontFamily: '"Courier New", Courier, monospace',
  },
  expiryNote: {
    color: '#71717a',
    fontSize: '12px',
    textAlign: 'center',
    margin: 0,
  },
  footer: {
    textAlign: 'center',
  },
  footerLegal: {
    color: '#52525b',
    fontSize: '11px',
    margin: '0 0 6px 0',
  },
  footerText: {
    color: '#3f3f46',
    fontSize: '11px',
    margin: 0,
  },
};