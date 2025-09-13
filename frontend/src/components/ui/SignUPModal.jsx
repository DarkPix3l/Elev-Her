'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { signup, loginWithGoogle } from '@/actions/auth';

import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/actions/authSchema';
import { toast } from 'sonner';

export default function SignUPModal() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      birthDate: undefined,
    },
    resolver: zodResolver(signupSchema),
  });
  const [date, setBirthDate] = useState(undefined);

  const onDateChange = (selectedDate) => {
    setBirthDate(selectedDate);
    setValue('birthDate', selectedDate, { shouldValidate: true });
  };

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({ success: false, message: '' });

  async function handleSignup(data) {
    const result = await signup(data);

    if (result.success) {
      setStatus({ success: true, message: result.message });
      toast.success(result.message, {
        id: 'signup-success',
        style: {
          background: 'var(--navbar-bg)',
          color: 'var(--chart-2a)',
          fontSize: '18px',
          borderColor: 'var(--chart-2a)',
        },
      });

      setTimeout(() => {
        setOpen(false);
        setStatus({ success: false, message: '' }); // Optional: reset state
      }, 1500);
    } else {
      setStatus({
        success: false,
        message: result.error,
      });
      toast.error(result.message || 'Failed to register', {
        id: 'signup-error',
        style: {
          background: 'var(--navbar-bg)',
          color: 'var(--chart-5)',
          fontSize: '18px',
          borderColor: 'var(--chart-5)',
        },
      });
    }
  }

  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign up</Button>
      </DialogTrigger>
      <DialogContent className="bg-card border border-white">
        <form onSubmit={handleSubmit(handleSignup)}>
          {/*i am passing signup as parameter of handleSubmit, because of the validation */}
          <DialogHeader className="pb-5">
            <DialogTitle>Sign up</DialogTitle>
            <DialogDescription>Join us! Your next adventure starts here.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 text-white">
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="m@example.com"
                {...register('username')}
                disabled={isSubmitting}
                autoComplete="username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
                disabled={isSubmitting}
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isSubmitting}
                autoComplete="new-password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="birthDate">Date of birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="birthDate"
                    variant={'outline'}
                    className={cn('w-full pl-3 text-left font-normal', 'text-muted-foreground')}
                  >
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onDateChange}
                    disabled={(d) => d > new Date() || d < new Date('1900-01-01')}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              {errors.birthDate && (
                <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
              )}
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-3 pt-5">
            <Button type="submit" className="w-full" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                'Submit'
              )}
            </Button>
            <Button variant="" className="w-full" onClick={loginWithGoogle} disabled={isSubmitting}>
              Continue with Google
            </Button>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
      <DialogOverlay
        style={{ backgroundImage: `url(${baseURL}/Vector2.png)` }}
        className="bg-[length:100%] bg-no-repeat bg-center blur"
      />
    </Dialog>
  );
}
