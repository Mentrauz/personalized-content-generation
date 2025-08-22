import { AuthenticatedApp } from "@/components/authenticated-app";
import { AuthForm } from "@/components/auth/auth-form";
import { LandingPage } from "@/components/landing-page";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";
import { User } from "stream-chat";

type AppView = "landing" | "auth" | "chat";

function AppContent() {
  const { user: authUser, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [streamUser, setStreamUser] = useState<User | null>(null);

  // Convert Supabase user to Stream Chat user format
  useEffect(() => {
    console.log('Auth user changed:', authUser)
    if (authUser) {
      const streamChatUser: User = {
        id: authUser.id,
        name: authUser.full_name || authUser.email,
        email: authUser.email,
        image: authUser.avatar_url || `https://api.dicebear.com/9.x/avataaars/svg?seed=${authUser.email}`,
      };
      setStreamUser(streamChatUser);
      setCurrentView("chat");
    } else {
      setStreamUser(null);
      setCurrentView("landing");
    }
  }, [authUser]);

  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  const handleLogout = async () => {
    await signOut();
    setStreamUser(null);
    setCurrentView("landing");
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const renderCurrentView = () => {
    if (authUser && streamUser && currentView === "chat") {
      return <AuthenticatedApp user={streamUser} onLogout={handleLogout} />;
    }
    
    if (currentView === "auth") {
      return <AuthForm onBack={handleBackToLanding} />;
    }
    
    return <LandingPage onGetStarted={handleGetStarted} />;
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className={currentView === "chat" ? "h-screen bg-background" : "min-h-screen bg-background"}>
        {renderCurrentView()}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
