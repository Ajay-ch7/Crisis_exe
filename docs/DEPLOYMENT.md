# Crisis.exe Deployment Guide

This guide covers the deployment of the Crisis.exe React/Vite application for production or a tech fest lab environment.

## Platform Recommendations
For a static Vite React application, we recommend the following deployment platforms:
- **Vercel** (Highly Recommended for Vite projects)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## Prerequisites
- A GitHub repository containing the project.
- A Firebase project with a Realtime Database created and configured.
- Accounts on the chosen deployment platform (e.g., Vercel).

## Environment Variables Configuration
The application relies on Firebase credentials to connect to the Realtime Database. These MUST be configured in your deployment platform.

**Required Variables:**
- `VITE_FB_API_KEY`
- `VITE_FB_AUTH_DOMAIN`
- `VITE_FB_DATABASE_URL`
- `VITE_FB_PROJECT_ID`

*Never commit your `.env` file to the repository. Use the `.env.example` as a reference.*

## Database Configuration (Firebase)
Ensure your Firebase Realtime Database rules are set up correctly. For an event setting where users submit scores without authentication, use:

```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": true
    }
  }
}
```
*Note: In a true production environment, consider adding Firebase Anonymous Auth or rate-limiting rules to prevent spam.*

## Build Commands
The build configuration is already defined in `package.json`.
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## Step-by-Step Deployment (Vercel)
1. **Connect GitHub:** Log in to [Vercel](https://vercel.com/) and click "Add New Project". Import your Crisis.exe GitHub repository.
2. **Configure Project:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Environment Variables:**
   - Expand the "Environment Variables" section.
   - Add all the `VITE_FB_*` variables listed above.
4. **Deploy:** Click "Deploy". Vercel will build the project and assign a custom `.vercel.app` domain.

## Step-by-Step Deployment (Netlify)
1. **Connect GitHub:** Log in to [Netlify](https://www.netlify.com/) and click "Add new site" -> "Import an existing project".
2. **Configure Settings:**
   - Base directory: `/`
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables:**
   - Click "Add environment variables" and enter your Firebase keys.
4. **Deploy:** Click "Deploy site".

## Production Settings & Domain/HTTPS Setup
- Both Vercel and Netlify automatically provide free SSL certificates (HTTPS) for your deployed app.
- You can add a custom domain (e.g., `crisis-game.yourcollege.edu`) through the deployment platform's dashboard under "Domain Management".

## Verification
1. Open the deployed URL.
2. Play one complete game.
3. Verify that the score successfully posts to the Leaderboard.
4. Check the browser console (F12) for any missing environment variable errors or CORS issues.

## Troubleshooting & Redeployment
- **White Screen on Load:** Check the browser console. Usually means environment variables are missing in the platform settings.
- **Scores Not Saving:** Verify Firebase Database rules allow `.write`. Check that `VITE_FB_DATABASE_URL` is correct.
- **Redeployment:** Any push to the `main` branch will automatically trigger a rebuild and redeployment on Vercel/Netlify. No manual action is required.
- **Clearing Scores for Event Day:** Manually delete the `scores/` node from the Firebase Console before the event starts.
