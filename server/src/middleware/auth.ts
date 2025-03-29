// Function to decode and verify a Clerk JWT token
export const decodeClerkToken = (token: string) => {
    try {
        // Note: In production, you should verify the token signature
        // This is a simplified version that just decodes without verification
        // For proper verification, you would use Clerk's SDK methods

        // Split the token
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }

        // Decode the payload (second part)
        const payload = Buffer.from(parts[1], 'base64').toString();
        const parsedPayload = JSON.parse(payload);

        // Check if token is expired
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (parsedPayload.exp && parsedPayload.exp < currentTimestamp) {
            throw new Error('Token expired');
        }

        return {
            sessionId: parsedPayload.sid, // Session ID
            instanceId: parsedPayload.iid, // Instance ID
            tokenType: parsedPayload.st,  // Session Type
            expiresAt: new Date(parsedPayload.exp * 1000), // Expiration date
            valid: true
        };
    } catch (error: any) {
        console.error('Token decode error:', error.message);
        return {
            valid: false,
            error: error.message
        };
    }
}