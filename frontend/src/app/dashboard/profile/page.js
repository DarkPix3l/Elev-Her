import UserProfile from "@/components/UserDashboard/UserProfile";
import { getUserData } from "@/services/apiClient";

export default async function ProfilePage() {
  const user = await getUserData();
  return <>{user && <UserProfile user={user} />}</>;
}
