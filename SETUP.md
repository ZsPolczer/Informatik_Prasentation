# Setup Instructions

To run this project locally:

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

This project requires environment variables to run. Create a `.env` file in the root directory with the following:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
HTTP_REFERER=http://localhost:3000
```

**Note**: You'll need to obtain your own API key from [OpenRouter](https://openrouter.ai/).

## Running the Application

To run in development mode:
```bash
npm run dev
```

This will start both the React frontend (on port 3000) and the backend proxy server (on port 5000).

## Building for Production

To build the application:
```bash
npm run build
```

## Deployment

For deployment to platforms like Vercel or Netlify, make sure to set the environment variables in the platform's settings:

- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `HTTP_REFERER`: The URL of your deployed application