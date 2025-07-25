"use client";

import { useState, useEffect } from "react";
import { User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useSession, getSession } from "next-auth/react";

async function updateAvatar(userId, file, token) {
  const formData = new FormData();
  formData.append("avatar", file);

  const nextAuthUrl = process.env.NEXT_PUBLIC_NEXTAUTH;

  const response = await fetch(`${nextAuthUrl}/users/${userId}/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const text = await response.text();
  console.log("Raw response text:", text);

  try {
    const json = JSON.parse(text);
    if (!response.ok) {
      throw new Error(json.message || "Failed to upload avatar");
    }
    return json;
  } catch (err) {
    console.error("Could not parse JSON from response:", text);
    throw new Error("Unexpected response from server.");
  }
}

export default function UserProfile() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
    const [avatarUrl, setAvatarUrl] = useState(
    session?.user?.avatar || `${process.env.NEXT_PUBLIC_SUPABASE_AVATAR_URL}/user-profile.jpg`
  );
  const [uploading, setUploading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log("Profile saved:", profile);
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file || !userId) return;

  setUploading(true);
  try {
    const token = session?.accessToken || session?.user?.token; // depends on your session structure
    if (!token) throw new Error("Not authenticated");

    const res = await updateAvatar(userId, file, token);
    setAvatarUrl(res.avatarUrl);
    alert(res.message || "Avatar updated!");
    await getSession({ strategy: "force-refresh" });
  } catch (err) {
    console.error(err);
    alert("Failed to upload avatar: " + err.message);
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div>
        <img
          src={avatarUrl || "Error Loading image"}
          alt="User Avatar"
          width={120}
          height={120}
          style={{ border: "1px solid white", borderRadius: "50%", objectFit: "cover", aspectRatio: "1/1", }}
        />

        <div>
          <label
            htmlFor="avatarUpload"
            style={{ cursor: uploading ? "default" : "pointer", color: "blue" }}
          >
            {uploading ? "Uploading..." : "Change Avatar"}
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="bg-gray-700">
              <TabsTrigger className="px-6 py-4" value="personal">
                Personal Info
              </TabsTrigger>
              <TabsTrigger className="px-6 py-4" value="address">
                Address
              </TabsTrigger>
              <TabsTrigger className="px-6 py-4" value="payment">
                Payment Methods
              </TabsTrigger>
              <TabsTrigger className="px-6 py-4" value="preferences">
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={profile.address.street}
                    onChange={(e) => handleInputChange("address.street", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.address.city}
                      onChange={(e) => handleInputChange("address.city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profile.address.state}
                      onChange={(e) => handleInputChange("address.state", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profile.address.zipCode}
                      onChange={(e) => handleInputChange("address.zipCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profile.address.country}
                    onChange={(e) => handleInputChange("address.country", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5" />
                  <h3 className="font-semibold">Saved Payment Methods</h3>
                </div>

                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <CreditCard className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-4">No payment methods saved</p>
                    <Button variant="outline">Add Payment Method</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-600">
                          Get notified about your order status
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-gray-600">
                          Receive offers and new product announcements
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Disabled
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">
                          Get text messages for important updates
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
