'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function VolunteerScannerPage() {
  const [scannedCode, setScannedCode] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [scannerActive, setScannerActive] = useState(true);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerActive) return;

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        const code = decodedText.includes('/')
          ? decodedText.split('/').pop()
          : decodedText;
        setScannedCode(code);
        fetchTicketDetails(code);
        scanner.clear();
        setScannerActive(false);
      },
      (error) => {
        // silent continuous scan failures
      }
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [scannerActive]);

  const fetchTicketDetails = async (code) => {
    setLoading(true);
    setStatusMsg('');
    try {
      const res = await fetch(`/api/volunteer/verify?passCode=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.success) {
        setTicketData(data.ticket);
      } else {
        setStatusMsg(data.error || 'Failed to find ticket');
        setTicketData(null);
      }
    } catch (err) {
      setStatusMsg('Network error while querying pass');
    } finally {
      setLoading(false);
    }
  };

  // Toggle Attendance / Perk status
  const updateStatus = async (action, perkKey = null) => {
    if (!ticketData) return;
    try {
      const res = await fetch('/api/volunteer/verify', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passCode: ticketData.passCode,
          action,
          perkKey,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTicketData(data.ticket);
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      alert('Error updating state');
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (scannedCode.trim()) {
      fetchTicketDetails(scannedCode.trim());
    }
  };

  const resetScanner = () => {
    setTicketData(null);
    setScannedCode('');
    setStatusMsg('');
    setScannerActive(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>TEDx Desk Checkpoint</h2>
          {!scannerActive && (
            <button
              onClick={resetScanner}
              style={{ background: '#eb0028', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              Scan Next
            </button>
          )}
        </div>

        {/* Camera Scanner Container */}
        {scannerActive && (
          <div style={{ background: '#161616', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #333' }}>
            <div id="qr-reader" style={{ width: '100%' }} />
          </div>
        )}

        {/* Manual Search Bar */}
        <form onSubmit={handleManualSearch} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Or enter Pass Code (e.g. PLAT-SOT-2026-0001)"
            value={scannedCode}
            onChange={(e) => setScannedCode(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', background: '#161616', border: '1px solid #333', color: '#fff' }}
          />
          <button
            type="submit"
            style={{ padding: '10px 16px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Find
          </button>
        </form>

        {loading && <p style={{ textAlign: 'center', color: '#888' }}>Checking pass records...</p>}
        {statusMsg && <p style={{ textAlign: 'center', color: '#ef4444' }}>{statusMsg}</p>}

        {/* Attendee & Perks Verification Card */}
        {ticketData && (
          <div style={{ background: '#161616', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
            
            {/* User Meta */}
            <div style={{ borderBottom: '1px solid #262626', paddingBottom: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{ticketData.userId?.name || 'Attendee'}</h3>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#888' }}>{ticketData.email}</p>
                </div>
                <span style={{ padding: '4px 10px', borderRadius: '20px', background: '#eb0028', fontSize: '11px', fontWeight: 'bold' }}>
                  {ticketData.passTier.toUpperCase()}
                </span>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#10B981', fontFamily: 'monospace' }}>
                {ticketData.passCode} // {ticketData.seatingTier}
              </p>
            </div>

            {/* Attendance Action */}
            <div style={{ background: '#202020', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>Gate Status</p>
                <span style={{ fontSize: '11px', color: ticketData.attendance.status === 'ENTERED' ? '#10B981' : '#888' }}>
                  {ticketData.attendance.status}
                </span>
              </div>
              <button
                onClick={() => updateStatus('TOGGLE_ATTENDANCE')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: ticketData.attendance.status === 'ENTERED' ? '#ef4444' : '#10B981',
                  color: '#fff',
                }}
              >
                {ticketData.attendance.status === 'NOT_ENTERED' ? 'Mark Entered' : ticketData.attendance.status === 'ENTERED' ? 'Mark Exit' : 'Reset Gate'}
              </button>
            </div>

            {/* Perks & Swags Checklist */}
            <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: '#aaa' }}>Swags & Entitlements</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(ticketData.perksRedemption).map(([key, perk]) => {
                if (!perk.isEligible) {
                  return (
                    <div key={key} style={{ padding: '10px 12px', background: '#111', borderRadius: '8px', opacity: 0.35, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span style={{ fontSize: '11px' }}>Not Included</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={key}
                    style={{
                      padding: '10px 12px',
                      background: perk.isClaimed ? 'rgba(16, 185, 129, 0.1)' : '#202020',
                      border: perk.isClaimed ? '1px solid #10B981' : '1px solid #333',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>{perk.itemLabel}</p>
                      <span style={{ fontSize: '11px', color: perk.isClaimed ? '#10B981' : '#888' }}>
                        {perk.isClaimed ? '✓ Claimed' : 'Ready to hand over'}
                      </span>
                    </div>

                    <button
                      onClick={() => updateStatus('TOGGLE_PERK', key)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        background: perk.isClaimed ? '#10B981' : '#fff',
                        color: perk.isClaimed ? '#fff' : '#000',
                      }}
                    >
                      {perk.isClaimed ? 'Given' : 'Give'}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}