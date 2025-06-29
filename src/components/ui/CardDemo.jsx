"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CardDemo({ isOpen, onClose, onAuthSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [shouldRender, setShouldRender] = useState(isOpen);

useEffect(() => {
  if (isOpen) {
    // Handle mounting logic
    setShouldRender(true);
    setEmail('');
    setPassword('');
    setError('');
  } else {
    // Handle unmount delay
    const timeout = setTimeout(() => setShouldRender(false), 300); // match animation duration
    return () => clearTimeout(timeout);
  }
}, [isOpen, isLoginView]);

  if (!shouldRender) return null;

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLoginView) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (email === 'user@example.com' && password === 'password123') {
          onAuthSuccess(email.split('@')[0]);
        } else {
          setError('Invalid email or password.');
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (password.length < 6) {
          setError('Password must be at least 6 characters long.');
        } else {
          onAuthSuccess(email.split('@')[0]);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-9 absolute top-0 left-0 flex items-center justify-center z-20 w-screen h-screen ${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`}>
      <Card className={`w-sm md:w-md lg:w-lg ${isOpen ? 'animate-slide-up' : 'animate-slide-down'} z-20 `}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          {/* <CardDescription>Enter your email below to login</CardDescription> */}
          <CardAction>
            <Button variant="link" onClick={() => setIsLoginView(!isLoginView)}>
              {isLoginView ? 'Sign Up' : 'Back to Login'}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleAuthSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  isLoginView ? 'Login' : 'Register'
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
      <div className='bg-black/80  w-screen h-screen absolute z-10 blur-sm'  style={{ backgroundImage: `url('/Vector2.png')`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
    </div>
  );
}
