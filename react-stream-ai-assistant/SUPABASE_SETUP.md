# Supabase Authentication Setup

This guide will help you set up Supabase authentication for your ChatAI app.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization and enter project details:
   - **Project Name**: `chatai-app` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project"

## 2. Get Your Supabase Credentials

Once your project is created:

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Configure Environment Variables

Create a `.env` file in the `react-stream-ai-assistant` directory with the following:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Stream Chat Configuration (keep your existing values)
VITE_STREAM_API_KEY=your_stream_api_key_here

# Backend URL (keep your existing value)
VITE_BACKEND_URL=http://localhost:3000
```

## 4. Enable Email Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Auth Providers**, make sure **Email** is enabled
3. Configure email settings:
   - **Enable email confirmations**: Turn this ON for production
   - **Enable email change confirmations**: Recommended for security
   - **Enable secure email change**: Recommended for security

## 5. Optional: Set up Email Templates

1. Go to **Authentication** → **Email Templates**
2. Customize the email templates for:
   - Confirm signup
   - Reset password
   - Email change confirmation

## 6. Test the Authentication

1. Start your development server: `npm run dev`
2. Go to your landing page
3. Click "Get Started" to access the authentication form
4. Try signing up with a valid email address
5. Check your email for the confirmation link (if email confirmations are enabled)
6. Try signing in with your credentials

## 7. Optional: Database Schema

The app automatically works with Supabase's built-in auth system. If you want to extend user profiles:

1. Go to **Table Editor** in Supabase
2. You can create a `profiles` table that automatically syncs with `auth.users`
3. Use Supabase's RLS (Row Level Security) for data protection

## Features Included

✅ **User Registration** - Sign up with email and password  
✅ **User Login** - Sign in with email and password  
✅ **Password Reset** - Reset password via email  
✅ **Session Management** - Automatic session handling  
✅ **User Profiles** - Avatar generation and profile data  
✅ **Secure Authentication** - JWT-based authentication  
✅ **Stream Chat Integration** - Seamless integration with your chat app  

## Security Notes

- The app uses Supabase's built-in security features
- Environment variables keep your secrets safe
- Sessions are automatically managed
- Passwords are securely hashed by Supabase
- Email verification helps prevent fake accounts

## Troubleshooting

**"Missing Supabase environment variables" error:**
- Make sure your `.env` file is in the correct directory
- Check that variable names match exactly (with `VITE_` prefix)
- Restart your development server after adding environment variables

**Authentication not working:**
- Verify your Supabase URL and key are correct
- Check that email provider is enabled in Supabase dashboard
- Look at browser console for any error messages

**Email confirmations not sending:**
- Check your Supabase email settings
- Verify email templates are configured
- Check your spam folder

Need help? Check the [Supabase documentation](https://supabase.com/docs) or create an issue in this repository.
