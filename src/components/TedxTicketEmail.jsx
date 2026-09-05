import { Html, Head, Preview, Body, Container, Section, Text, Heading, Hr, Img } from '@react-email/components';
import * as React from 'react';

export const TedxTicketEmail = ({ 
  name = 'Attendee', 
  passCode = '',
  uri='',
  eventName = 'TEDxIntegralUniversity' 
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your Entry Pass for {eventName}</Preview>
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
            <Text style={styles.eyebrow}>OFFICIAL ENTRY PASS</Text>
            <Heading style={styles.heading}>You're Confirmed!</Heading>
            <Text style={styles.paragraph}>
              Hello <strong style={{ color: '#ffffff' }}>{name}</strong>,
            </Text>
            <Text style={styles.paragraph}>
              Your registration for <strong style={{ color: '#ffffff' }}>{eventName}</strong> is successful. Present this digital ticket containing your entry credentials on your mobile device at the check-in reception desk.
            </Text>

            {/* QR Code Container Pass Box */}
            <Section style={styles.ticketBox}>
              {uri ? (
                <Img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${passCode}`}
                  width="200"
                  height="200"
                  alt="TEDx Access QR Code"
                  style={styles.qrImage}
                />
              ) : (
                <Text style={styles.errorText}>[QR Pass Generation Error]</Text>
              )}
              <Text style={styles.ticketLabel}>DIGITAL ACCESS KEY</Text>
              <Text style={styles.ticketLabel}>{passCode}</Text>
            </Section>

            <Text style={styles.gateNote}>
               Doors open <strong>30 minutes</strong> before kickoff. Please arrive early to clear security.
            </Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Footer Legal & Info */}
          <Section style={styles.footer}>
            <Text style={styles.footerLegal}>
              This independent TEDx event is operated under license from TED.
            </Text>
            <Text style={styles.footerText}>
              Please do not duplicate or share this ticket layout, as it maps strictly to your registration profile.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default TedxTicketEmail;

const styles = {
  main: {
    backgroundColor: '#0a0a0a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '40px 0',
  },
  container: {
    backgroundColor: '#111111',
    border: '1px solid #222222',
    borderRadius: '8px',
    maxWidth: '520px',
    margin: '0 auto',
    padding: '40px',
  },
  header: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '-0.5px',
    margin: '0',
    lineHeight: '1.2',
  },
  tedRed: {
    color: '#e62b1e',
  },
  orgName: {
    color: '#ffffff',
  },
  tagline: {
    color: '#666666',
    fontSize: '11px',
    marginTop: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  divider: {
    borderColor: '#222222',
    margin: '25px 0',
  },
  content: {
    padding: '10px 0',
  },
  eyebrow: {
    color: '#e62b1e',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    margin: '0 0 10px 0',
  },
  heading: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 20px 0',
  },
  paragraph: {
    color: '#aaaaaa',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
  },
  ticketBox: {
    backgroundColor: '#161616',
    border: '1px dashed #333333',
    borderRadius: '6px',
    padding: '30px',
    textAlign: 'center',
    margin: '30px auto',
    maxWidth: '260px',
  },
  qrImage: {
    display: 'block',
    margin: '0 auto',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    padding: '10px',
  },
  ticketLabel: {
    color: '#666666',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    marginTop: '15px',
    marginBottom: '0',
  },
  errorText: {
    color: '#e62b1e',
    fontSize: '14px',
    margin: '20px 0',
  },
  gateNote: {
    color: '#888888',
    fontSize: '13px',
    textAlign: 'center',
    margin: '20px 0 0 0',
  },
  footer: {
    textAlign: 'center',
  },
  footerLegal: {
    color: '#444444',
    fontSize: '11px',
    margin: '0 0 8px 0',
    lineHeight: '1.4',
  },
  footerText: {
    color: '#555555',
    fontSize: '12px',
    margin: '0',
    lineHeight: '1.4',
  },
};
