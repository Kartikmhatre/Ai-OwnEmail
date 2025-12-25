# 🤖 AI-OwnEmail

An intelligent email client powered by AI that lets you manage your emails with natural language. Ask questions about your inbox, compose emails with AI assistance, and get smart suggestions.

![AI Email Client](public/demo.png)

## ✨ Features

- **🔍 AI-Powered Search** - Ask questions about your emails in natural language 
- **✉️ Smart Compose** - Write emails faster with AI autocomplete suggestions
- **📧 Multi-Account Support** - Connect multiple Google or Office365 accounts 
- **🎨 Modern UI** - Beautiful, responsive interface with dark mode support
- **⚡ Real-time Sync** - Emails sync automatically in the background
- **🔒 Secure** - Your credentials are encrypted and never stored on our servers

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** MongoDB (with Prisma ORM) 
- **Authentication:** Clerk
- **Email Provider:** Aurinko API
- **AI:** Google Gemini 1.5 Flash
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** tRPC + React Query

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (MongoDB Atlas recommended)
- Clerk account
- Aurinko account
- Google Cloud Console project (for Gmail OAuth)
- Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kartikmhatre/Ai-OwnEmail.git
   cd Ai-OwnEmail
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your credentials in `.env` (see Configuration section below)

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3001](http://localhost:3001) in your browser

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# MongoDB Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"

# Aurinko Email API
AURINKO_CLIENT_ID=your_aurinko_client_id
AURINKO_CLIENT_SECRET=your_aurinko_client_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# App URL
NEXT_PUBLIC_URL=http://localhost:3001
```

### Setting Up Services

#### 1. Clerk (Authentication)
1. Create account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys to your `.env`

#### 2. MongoDB
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Whitelist your IP (or use 0.0.0.0/0 for development)
4. Copy the connection string to `DATABASE_URL`

#### 3. Aurinko (Email API)
1. Sign up at [aurinko.io](https://aurinko.io)
2. Create a new application with "Mailbox" feature
3. Copy Client ID and Secret to your `.env`
4. Add callback URL: `http://localhost:3001/api/aurinko/callback`

#### 4. Google OAuth (for Gmail)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://api.aurinko.io/v1/auth/callback`
6. Add your Google credentials in Aurinko Settings
7. Add yourself as a test user in OAuth consent screen

#### 5. Gemini AI
1. Get API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add to `GEMINI_API_KEY` in `.env`

## 📁 Project Structure

```
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   └── mail/         # Mail application
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── server/           # tRPC server
│   └── trpc/             # tRPC client
└── ...config files
```

## 🎯 Usage

1. **Sign in** with your email using Clerk
2. **Add an email account** - Click "Add account" and connect your Gmail or Office365
3. **Browse emails** - View your inbox, sent, and draft emails
4. **Ask AI** - Use the AI chat to ask questions about your emails
5. **Compose** - Write new emails with AI-powered suggestions

### AI Features

**Ask questions like:**
- "What can I ask?"
- "Summarize my inbox"
- "Find emails from John"
- "What meetings do I have this week?"

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Aurinko](https://aurinko.io/)
- [Google Gemini](https://ai.google.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://prisma.io/)

---

Made with ❤️ by [Kartik Mhatre](https://github.com/Kartikmhatre)
