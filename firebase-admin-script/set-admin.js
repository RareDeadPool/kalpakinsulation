const admin = require('firebase-admin');

// IMPORTANT: REPLACE THIS WITH THE ACTUAL PATH TO YOUR SERVICE ACCOUNT KEY JSON FILE
// Example: const serviceAccount = require('./your-project-name-firebase-adminsdk-xxxxx-yyyyy.json');
const serviceAccount = require('./kalpak-insulation-firebase-adminsdk-fbsvc-59c1d91bd9.json'); 

// IMPORTANT: REPLACE THIS with the EMAIL of the user you want to make an admin
// This user must already be registered in your Firebase project (e.g., via your app's signup page).
const adminUserEmail = 'sawantaditya0708@gmail.com'; 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setAdminClaim() {
  try {
    const userRecord = await admin.auth().getUserByEmail(adminUserEmail);
    const userUid = userRecord.uid;

    await admin.auth().setCustomUserClaims(userUid, { admin: true });
    console.log(`Custom claim 'admin: true' set for user ${userUid}`);

    // Revoke existing refresh tokens to force the user to get new claims on next login/refresh
    await admin.auth().revokeRefreshTokens(userUid);
    console.log('User refresh tokens revoked. User needs to re-authenticate.');

  } catch (error) {
    console.error('Error setting custom claim:', error);
    process.exit(1); // Exit with an error code
  } finally {
    process.exit(); // Ensure the script exits
  }
}

setAdminClaim(); 