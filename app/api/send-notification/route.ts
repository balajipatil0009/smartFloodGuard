import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import fs from 'fs';

// Path where Docker Secrets are mounted
const DOCKER_SECRET_PATH = '/run/secrets/firebase_service_account';

/**
 * Initialize Firebase Admin safely
 */
if (!admin.apps.length) {
    try {
        let credential;

        // 1. Check if the Docker Secret file exists (Production)
        if (fs.existsSync(DOCKER_SECRET_PATH)) {
            const secretFile = fs.readFileSync(DOCKER_SECRET_PATH, 'utf8');
            credential = admin.credential.cert(JSON.parse(secretFile));
            console.log('Firebase Admin: Initialized using Docker Secret');
        } 
        // 2. Fallback to Environment Variables (Local Dev / Traditional Hosting)
        else if (process.env.FIREBASE_PROJECT_ID) {
            credential = admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Fixes the common issue where \n is escaped in .env files
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            });
            console.log('Firebase Admin: Initialized using Environment Variables');
        }

        if (credential) {
            admin.initializeApp({ credential });
        } else {
            console.error('Firebase Admin: No credentials found! Check your Docker secrets or .env variables.');
        }
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
            topic: 'button_alerts',
        };

        const response = await admin.messaging().send(messagePayload);

        console.log('Successfully sent message:', response);
        return NextResponse.json({ success: true, response });
    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to send notification', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}