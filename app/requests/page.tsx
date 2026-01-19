'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

interface HelpRequest {
    id: string;
    latitude: number;
    longitude: number;
    timestamp: Timestamp;
    status: string;
    user_name?: string;
    user_email?: string;
}

export default function RequestsPage() {
    const [requests, setRequests] = useState<HelpRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const q = query(collection(db, "help_requests"), orderBy("timestamp", "desc"));
                const querySnapshot = await getDocs(q);
                const data: HelpRequest[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                } as HelpRequest));
                setRequests(data);
            } catch (error) {
                console.error("Error fetching requests: ", error);
                alert("Error fetching data. Check console (and your Firebase rules/config).");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const openMap = (lat: number, lng: number) => {
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, '_blank');
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
    }

    return (
        <div>
            <div className="page-header">
                <h1 className="hero-title" style={{ fontSize: '2rem', marginBottom: 0 }}>Help Requests</h1>
                <Link href="/" className="back-link">&larr; Back to Home</Link>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Location (Lat, Lng)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id}>
                                <td>
                                    {req.timestamp?.toDate().toLocaleString() || 'N/A'}
                                </td>
                                <td>
                                    {req.user_name || 'Anonymous'}
                                </td>
                                <td>
                                    {req.user_email || 'N/A'}
                                </td>
                                <td>
                                    <span className={`status-badge ${req.status === 'pending' ? 'status-pending' : 'status-success'}`}>
                                        {req.status || 'Pending'}
                                    </span>
                                </td>
                                <td>
                                    {req.latitude?.toFixed(5)}, {req.longitude?.toFixed(5)}
                                </td>
                                <td>
                                    <button
                                        onClick={() => openMap(req.latitude, req.longitude)}
                                        className="btn-sm-map"
                                    >
                                        Show Map
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>
                                    No requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
