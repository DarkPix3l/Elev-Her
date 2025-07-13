"use client";

import UserProfile from "@/components/UserDashboard/UserProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <UserProfile />
      </CardContent>
    </Card>
  );
}
