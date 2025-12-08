import UserProfile from '@/components/UserDashboard/UserProfile';
import { getUserData } from '@/services/apiServer';

export default async function ProfilePage() {
  const user = await getUserData();
  return <>{user && <UserProfile user={user} />}</>;
}
