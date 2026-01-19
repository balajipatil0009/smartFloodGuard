'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <main>
        <h1 className="hero-title">Admin Panel</h1>
        <p className="hero-subtitle">Welcome to the Smart FloodGuard Admin Dashboard.</p>

        <div>
          <Link
            href="/requests"
            className="btn btn-primary"
          >
            View Help Requests
          </Link>
        </div>

        <div className="alert-section">
          {/* <h2 className="alert-title">Send Alerts</h2>
          <p className="alert-desc">Press a button to send a notification to all users.</p> */}
          <div className="alert-grid">
            {[
              { id: 1, label: '1', msg: 'Heavy Rainfall Detected, Boulders Movement Detected', color: 'white' },
              { id: 2, label: '2', msg: 'Level 1 at the Risk', color: 'white' },
              { id: 3, label: '3', msg: 'Level 2 at the Risk', color: 'white' },
              { id: 4, label: '4', msg: 'Level 3 at the Risk', color: 'white' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={async () => {
                  try {
                    const res = await fetch('/api/send-notification', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        button: btn.id.toString(),
                        message: btn.msg
                      }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      console.log('Notification sent: ' + btn.msg);
                      // alert('Alert Sent: ' + btn.msg);
                    } else {
                      alert('Failed to send: ' + (data.error || 'Unknown error'));
                    }
                  } catch (e) {
                    alert('Error: ' + e);
                  }
                }}
                className={`alert-btn ${btn.color} hover`}

              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
