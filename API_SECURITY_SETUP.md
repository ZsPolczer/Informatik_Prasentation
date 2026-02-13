# Secure API Key Setup

This project now implements a secure approach to handle API keys by using a backend proxy server. This prevents the API key from being exposed in the client-side code.

## How it works

1. Client-side code (React app) makes requests to `/api/ai/chat-completion`
2. These requests are proxied to the backend server during development (via Vite proxy)
3. Backend server makes the actual API call to OpenRouter with the API key
4. Response is sent back to the client through the proxy

## Setup Instructions

### Development
1. Create a `.env` file in the root directory with your API key:
```
OPENROUTER_API_KEY=your_actual_api_key_here
HTTP_REFERER=http://localhost:3000
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```
This will start both the React app (on port 3000) and the proxy server (on port 5000).

### Production Deployment

For production deployment, you have several options:

#### Option 1: Deploy to platforms supporting both frontend and backend
- Platforms like Heroku, Railway, or AWS Elastic Beanstalk can run both the React app and the proxy server
- Set environment variables in the deployment platform settings
- The server.js file serves both the built React app and the API proxy

#### Option 2: Serverless functions (Netlify, Vercel)
- Move the proxy code to serverless functions
- For Vercel: Place API routes in `api/` directory
- For Netlify: Place functions in `netlify/functions/`

#### Option 3: Separate backend hosting
- Host the proxy server separately (e.g., on a VPS)
- Update the proxy configuration in `vite.config.ts` for development
- Update the fetch URL in `aiService.ts` for production

## Important Security Notes

- Never commit the `.env` file to version control (it should be in `.gitignore`)
- The `.gitignore` file should already include environment files
- Always validate and sanitize inputs on the backend
- Monitor API usage to prevent abuse
- Consider implementing rate limiting on the proxy server

## Files Added/Modified

- `server.js`: Backend proxy server implementation
- `vite.config.ts`: Updated to proxy API requests during development
- `services/aiService.ts`: Updated to call the proxy instead of the API directly
- `package.json`: Added backend dependencies and scripts