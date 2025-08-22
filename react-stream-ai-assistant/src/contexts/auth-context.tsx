import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, supabaseEnabled, AuthUser } from '@/lib/supabase'

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabaseEnabled) {
      // If Supabase is not configured, consider user logged out
      setUser(null)
      setSession(null)
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata?.full_name || '',
          avatar_url: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/9.x/avataaars/svg?seed=${session.user.email}`,
        })
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata?.full_name || '',
          avatar_url: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/9.x/avataaars/svg?seed=${session.user.email}`,
        })
      } else {
        setUser(null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName?: string) => {
    console.log('signUp called with:', { email, fullName, supabaseEnabled })
    if (!supabaseEnabled) return { error: 'Authentication is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.' }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || '',
            avatar_url: `https://api.dicebear.com/9.x/avataaars/svg?seed=${email}`,
          },
        },
      })
      
      console.log('Supabase signUp result:', { error })
      return { error: error?.message || null }
    } catch (err) {
      console.error('SignUp error:', err)
      return { error: 'An unexpected error occurred during sign up.' }
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log('signIn called with:', { email, supabaseEnabled })
    if (!supabaseEnabled) return { error: 'Authentication is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.' }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      console.log('Supabase signIn result:', { error })
      return { error: error?.message || null }
    } catch (err) {
      console.error('SignIn error:', err)
      return { error: 'An unexpected error occurred during sign in.' }
    }
  }

  const signOut = async () => {
    if (!supabaseEnabled) return
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!supabaseEnabled) return { error: 'Authentication is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.' }
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      return { error: error?.message || null }
    } catch (err) {
      console.error('Reset password error:', err)
      return { error: 'An unexpected error occurred during password reset.' }
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
