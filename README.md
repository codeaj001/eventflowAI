# EventFlow AI

EventFlow AI is an AI-powered event organizer built for the IBM TechXchange Agentic AI Hackathon 2025. It leverages IBM watsonx Orchestrate to coordinate multiple agents for planning events, managing venues, catering, and invitations.

## Features
- **AI Event Planning**: Natural language interface to plan events.
- **Multi-Agent System**: 5 specialized agents (Planner, Venue, Catering, Invite, Notion).
- **Real-time Dashboard**: Live updates of budget, RSVPs, and tasks.
- **Mock Data**: Built-in mock datasets for venues and catering (Hackathon compliant).

## Tech Stack
- **Frontend**: Next.js 15, Tailwind CSS, Shadcn UI, Recharts.
- **Backend**: Supabase (PostgreSQL, Realtime), Vercel Serverless Functions.
- **AI**: IBM watsonx Orchestrate (Granite Models).

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- Supabase Account
- IBM Cloud Account (for watsonx Orchestrate)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Copy `env.example` to `.env.local` and fill in your credentials:
```bash
cp env.example .env.local
```
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
- `ORCHESTRATE_WEBHOOK_SECRET`: A secret to secure your webhook (optional implementation).

### 4. Database Setup
Run the SQL commands in `supabase/schema.sql` in your Supabase SQL Editor to create the tables and mock data.

### 5. Running Locally
```bash
npm run dev
```
Visit `http://localhost:3000`.

### 6. IBM watsonx Orchestrate Setup
Refer to `agent_configurations.md` for detailed instructions on how to configure the agents in IBM watsonx Orchestrate.

## Deployment
Deploy to Vercel:
```bash
vercel
```
Ensure you add the environment variables in the Vercel dashboard.
