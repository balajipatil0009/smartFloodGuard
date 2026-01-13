'use client';

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

interface HelpRequest {
    id: string;
    latitude: number;
    longitude: number;
    timestamp: Timestamp;
    status: string;
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
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="p-8 sm:p-20 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Help Requests</h1>
                <a href="/" className="text-blue-500 hover:underline">&larr; Back to Home</a>
            </div>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                    <thead className="bg-gray-100 dark:bg-zinc-800">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date/Time</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Location (Lat, Lng)</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                        {requests.map((req) => (
                            <tr key={req.id}>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    {req.timestamp?.toDate().toLocaleString() || 'N/A'}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {req.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {req.latitude?.toFixed(5)}, {req.longitude?.toFixed(5)}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => openMap(req.latitude, req.longitude)}
                                        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
                                    >
                                        Show Map
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
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
