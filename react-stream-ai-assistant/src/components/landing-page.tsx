import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  MessageCircle, 
  ArrowRight,
  Brain,
  Globe,
  Shield,
  Zap,
  Menu,
  X,
  Check,
  Play
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkHeader, setIsDarkHeader] = useState(false);

  // Observe dark sections to flip header styles automatically
  useEffect(() => {
    const triggers = Array.from(document.querySelectorAll('.header-dark-trigger')) as Element[];
    if (triggers.length === 0) return;

    const headerHeight = 80; // h-20
    const observer = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some((e) => e.isIntersecting);
        setIsDarkHeader(anyIntersecting);
      },
      { root: null, rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 }
    );

    triggers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Advanced AI",
      description: "Powered by GPT-4 for intelligent conversations and content generation"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Real-time Search",
      description: "Live web search integration for current information and data"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Team Collaboration",
      description: "Seamless real-time messaging with AI-enhanced productivity"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption"
    }
  ];

  const benefits = [
    "Save 10+ hours per week on content creation",
    "Increase team productivity by 40%", 
    "Access to real-time information",
    "Seamless workflow integration",
    "Advanced AI-powered insights",
    "24/7 intelligent assistance"
  ];

  const faqs = [
    {
      question: "How does ChatAI differ from other AI tools?",
      answer: "ChatAI combines advanced language models with real-time web search and team collaboration features, offering a comprehensive AI-powered communication platform designed specifically for business productivity."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade security with end-to-end encryption, compliance with GDPR and SOC 2 standards, and your data is never used for training our models."
    },
    {
      question: "Can I integrate with existing tools?",
      answer: "ChatAI offers seamless integration with popular productivity tools, project management platforms, and communication apps to fit into your existing workflow."
    },
    {
      question: "What's included in the free trial?",
      answer: "The free trial includes full access to all features for 14 days, including AI chat, web search, team collaboration, and up to 1000 AI-powered interactions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-xl z-50 transition-colors duration-300 ${isDarkHeader ? 'bg-slate-900/95 border-b border-slate-700/60 shadow-lg' : 'bg-white/95 border-b border-slate-200/60 shadow-sm'}`}> 
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${isDarkHeader ? 'bg-gradient-to-br from-white to-slate-100' : 'bg-gradient-to-br from-slate-900 to-slate-700'}`}>
                <MessageCircle className={`w-6 h-6 ${isDarkHeader ? 'text-slate-900' : 'text-white'}`} />
              </div>
              <span className={`text-xl font-bold tracking-tight ${isDarkHeader ? 'text-white' : 'text-slate-900'}`}>ChatAI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className={`${isDarkHeader ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm font-semibold transition-colors duration-200 py-2`}>Features</a>
              <a href="#pricing" className={`${isDarkHeader ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm font-semibold transition-colors duration-200 py-2`}>Pricing</a>
              <a href="#about" className={`${isDarkHeader ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm font-semibold transition-colors duration-200 py-2`}>About</a>
              <Button onClick={onGetStarted} size="sm" className={`${isDarkHeader ? 'bg-white hover:bg-slate-100 text-slate-900' : 'bg-slate-900 hover:bg-slate-800 text-white'} text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2.5 rounded-lg`}>
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${isDarkHeader ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-6 backdrop-blur-xl ${isDarkHeader ? 'bg-slate-900/95 border-t border-slate-700/60' : 'bg-white/95 border-t border-slate-200/60'}`}>
              <div className="space-y-4">
                <a href="#features" className={`block text-base font-semibold py-2 transition-colors duration-200 ${isDarkHeader ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Features</a>
                <a href="#pricing" className={`block text-base font-semibold py-2 transition-colors duration-200 ${isDarkHeader ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Pricing</a>
                <a href="#about" className={`block text-base font-semibold py-2 transition-colors duration-200 ${isDarkHeader ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>About</a>
                <div className="flex flex-col space-y-3 pt-4">
                  <Button variant="outline" size="sm" className={`font-semibold ${isDarkHeader ? 'border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white bg-transparent' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>Sign In</Button>
                  <Button onClick={onGetStarted} size="sm" className={`${isDarkHeader ? 'bg-white hover:bg-slate-100 text-slate-900' : 'bg-slate-900 hover:bg-slate-800 text-white'} font-semibold`}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <Badge variant="outline" className="mb-10 text-slate-700 border-slate-300 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-2 text-sm font-medium">
            ✨ Powered by GPT-4 and real-time web search
          </Badge>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 leading-[0.95] tracking-tight">
            AI that works<br />
            <span className="bg-gradient-to-r from-slate-600 via-slate-500 to-slate-700 bg-clip-text text-transparent">the way you do</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
            Transform your team's productivity with intelligent AI assistance that understands context, 
            searches the web in real-time, and integrates seamlessly into your workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-xl"
            >
              Start free trial
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-10 py-5 text-lg font-semibold transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm"
            >
              <Play className="mr-3 w-5 h-5" />
              Watch demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
              <div className="text-4xl font-black text-slate-900 mb-2">10k+</div>
              <div className="text-base font-semibold text-slate-600">Active users</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
              <div className="text-4xl font-black text-slate-900 mb-2">40%</div>
              <div className="text-base font-semibold text-slate-600">Productivity increase</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
              <div className="text-4xl font-black text-slate-900 mb-2">4.9/5</div>
              <div className="text-base font-semibold text-slate-600">User rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Everything you need to scale
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Powerful features designed to enhance your team's productivity and streamline your workflow with cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200/60 hover:shadow-2xl hover:border-slate-300/80 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-6 text-slate-700 group-hover:from-slate-200 group-hover:to-slate-300 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                Why teams choose ChatAI
              </h2>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium">
                Join thousands of teams who have transformed their productivity with intelligent AI assistance 
                that adapts to your workflow and grows with your business.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-7 h-7 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-emerald-700 font-bold" />
                    </div>
                    <span className="text-slate-700 text-lg font-semibold">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={onGetStarted}
                className="mt-12 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
              >
                Get started today
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10 border-2 border-slate-200/80 shadow-2xl">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                        <Brain className="w-5 h-5 text-blue-700" />
                      </div>
                      <span className="font-bold text-slate-900 text-lg">AI Assistant</span>
                    </div>
                    <p className="text-slate-600 font-medium">How can I help you today?</p>
                  </div>
                  
                  <div className="bg-slate-900 text-white rounded-2xl p-6 ml-12 shadow-lg">
                    <p className="font-medium">Generate a marketing strategy for our new product launch</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-slate-500 font-semibold">Analyzing market data...</span>
                    </div>
                    <p className="text-slate-600 font-medium">I'll create a comprehensive strategy based on current market trends and your target audience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-600 mb-12 text-lg font-semibold">Trusted by teams at</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            <div className="text-slate-500 font-bold text-xl">TechCorp</div>
            <div className="text-slate-500 font-bold text-xl">InnovateLab</div>
            <div className="text-slate-500 font-bold text-xl">StartupX</div>
            <div className="text-slate-500 font-bold text-xl">GrowthCo</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="pricing" className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Everything you need to know about ChatAI
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white border-2 border-slate-200 rounded-2xl px-8 data-[state=open]:shadow-xl data-[state=open]:border-slate-300 transition-all duration-300"
              >
                <AccordionTrigger className="text-slate-900 hover:text-slate-700 py-8 text-left font-bold text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-8 leading-relaxed text-base font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden header-dark-trigger">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/50"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
            Join thousands of teams already using ChatAI to boost productivity and streamline communication.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl"
            >
              Start free trial
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-slate-400 text-slate-200 hover:bg-slate-800 hover:border-slate-300 px-12 py-6 text-xl font-bold transition-all duration-300 rounded-2xl bg-slate-900/50 backdrop-blur-sm"
            >
              Contact sales
            </Button>
          </div>
          
          <p className="text-base text-slate-400 font-semibold">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t-2 border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">ChatAI</span>
              </div>
              
              <p className="text-slate-600 text-base leading-relaxed max-w-lg mb-8 font-medium">
                AI-powered communication platform designed to enhance productivity and streamline team collaboration with cutting-edge technology.
              </p>
              
              <div className="text-slate-500 text-sm font-semibold">
                © 2024 ChatAI. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-lg">Product</h4>
              <div className="space-y-4">
                <a href="#features" className="block text-slate-600 hover:text-slate-900 transition-colors font-semibold">Features</a>
                <a href="#pricing" className="block text-slate-600 hover:text-slate-900 transition-colors font-semibold">Pricing</a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 transition-colors font-semibold">Enterprise</a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 transition-colors font-semibold">API</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-lg">Support</h4>
              <div className="space-y-4">
                <a href="#" className="block text-slate-600 hover:text-slate-900 transition-colors font-semibold">Help Center</a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 transition-colors font-semibold">Documentation</a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 transition-colors font-semibold">Contact</a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 transition-colors font-semibold">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}