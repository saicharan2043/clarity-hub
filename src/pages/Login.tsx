import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRole } from '@/contexts/RoleContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { setRole, setUserName } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role: 'trainer' | 'user') => {
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setRole(role);
    setUserName(role === 'trainer' ? 'John Trainer' : 'Jane Learner');
    toast.success(`Logged in as ${role === 'trainer' ? 'Trainer' : 'User'}`);
    navigate(role === 'trainer' ? '/trainer' : '/user');
  };

  const handleQuickLogin = (role: 'trainer' | 'user') => {
    setRole(role);
    setUserName(role === 'trainer' ? 'John Trainer' : 'Jane Learner');
    toast.success(`Quick login as ${role === 'trainer' ? 'Trainer' : 'User'}`);
    navigate(role === 'trainer' ? '/trainer' : '/user');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-content-accent mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">LMS Training Portal</h1>
          <p className="text-muted-foreground mt-1">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button 
                onClick={() => handleLogin('trainer')}
                className="bg-content-accent hover:bg-content-accent/90 gap-2"
              >
                <User className="h-4 w-4" />
                Login as Trainer
              </Button>
              <Button 
                onClick={() => handleLogin('user')}
                variant="outline"
                className="gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                Login as User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access (Demo) */}
        <Card className="border-border bg-muted/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Access (Demo)</CardTitle>
            <CardDescription className="text-xs">Skip login for demonstration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => handleQuickLogin('trainer')}
                className="gap-2"
              >
                <User className="h-4 w-4" />
                Trainer Demo
              </Button>
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => handleQuickLogin('user')}
                className="gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                User Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
