import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
import Navbar from '@/components/ui/NavBar';
import DashboardMenu from '@/components/UserDashboard/DashboardMenu';

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen [background-image:radial-gradient(farthest-corner_at_center,_oklch(0.6249_0.2197_356.35),_oklch(36.194%_0.03849_276.321)_60%)]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-25">
        <DashboardMenu />
        {children}
      </main>
    </div>
  );
}
