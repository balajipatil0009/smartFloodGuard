import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Handle newline characters in private key being escaped in .env files
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
}

export async function POST(request: Request) {
    try {
        const { button, message: customMessage } = await request.json();

        if (!button && !customMessage) {
            return NextResponse.json({ success: false, error: 'Button ID or Message required' }, { status: 400 });
        }

        const messagePayload = {
            notification: {
                title: 'FloodGuard Alert',
                body: customMessage || `Button ${button} was pressed!`,
            },
            topic: 'button_alerts', // The Flutter app will subscribe to this topic
        };

        // Send a message to the devices subscribed to the provided topic.
        const response = await admin.messaging().send(messagePayload);

        console.log('Successfully sent message:', response);
        return NextResponse.json({ success: true, response });
    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json({ success: false, error: 'Failed to send notification' }, { status: 500 });
    }
}
