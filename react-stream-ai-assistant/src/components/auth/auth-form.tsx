import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, MessageCircle, ArrowLeft } from "lucide-react"

interface AuthFormProps {
  onBack: () => void
}

export function AuthForm({ onBack }: AuthFormProps) {
  const { signIn, signUp, resetPassword } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setFullName("")
    setConfirmPassword("")
    setShowPassword(false)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    resetForm()
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const { error } = await signIn(email, password)
    
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Welcome back!",
      })
    }
    
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (!email || !password || !fullName) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    console.log('Attempting to sign up with:', { email, fullName })
    const { error } = await signUp(email, password, fullName)
    console.log('Sign up result:', { error })
    
    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email to confirm your account before signing in.",
      })
      // Reset form after successful signup
      resetForm()
      // Switch to sign in tab
      setActiveTab("signin")
    }
    
    setLoading(false)
  }

  const handleResetPassword = async () => {
    setLoading(true)
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const { error } = await resetPassword(email)
    
    if (error) {
      toast({
        title: "Reset Failed",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Check your email for a password reset link!",
      })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-slate-200 relative">
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-4 left-4 text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ChatAI</h1>
          </div>
          <p className="text-slate-600 font-medium">
            Welcome to the future of AI-powered communication
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100">
            <TabsTrigger value="signin" className="text-slate-700 font-semibold">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="text-slate-700 font-semibold">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <Label htmlFor="email-signin" className="text-slate-700 font-medium">Email</Label>
                <Input
                  id="email-signin"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 border-slate-300 focus-visible:ring-slate-400 h-12"
                />
              </div>
              
              <div>
                <Label htmlFor="password-signin" className="text-slate-700 font-medium">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password-signin"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-12 border-slate-300 focus-visible:ring-slate-400 h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 h-12 rounded-lg" 
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-slate-600 hover:text-slate-900 p-0"
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  Forgot password?
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <Label htmlFor="full-name-signup" className="text-slate-700 font-medium">Full Name</Label>
                <Input
                  id="full-name-signup"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-2 border-slate-300 focus-visible:ring-slate-400 h-12"
                />
              </div>

              <div>
                <Label htmlFor="email-signup" className="text-slate-700 font-medium">Email</Label>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 border-slate-300 focus-visible:ring-slate-400 h-12"
                />
              </div>
              
              <div>
                <Label htmlFor="password-signup" className="text-slate-700 font-medium">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pr-12 border-slate-300 focus-visible:ring-slate-400 h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password-signup" className="text-slate-700 font-medium">Confirm Password</Label>
                <Input
                  id="confirm-password-signup"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-2 border-slate-300 focus-visible:ring-slate-400 h-12"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 h-12 rounded-lg" 
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-slate-700 hover:text-slate-900 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-slate-700 hover:text-slate-900 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
