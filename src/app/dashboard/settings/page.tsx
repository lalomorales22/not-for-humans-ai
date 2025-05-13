import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Zap, ShieldCheck, CalendarDays, BarChart } from "lucide-react";

export default function SettingsPage() {
  // Placeholder data for user settings
  const userPlan = {
    name: "Autonomous Collective Tier",
    agentsDeployed: 1,
    maxAgents: 5,
    dataProcessing: "Unlimited",
    renewalDate: "January 1, 2025",
    features: [
      "Advanced Agent Configuration",
      "Access to All Foundational Models",
      "Priority Network Access",
      "Detailed Analytics Suite",
      "Dedicated Support Channel (for Owners)",
    ],
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Owner Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Subscription Plan
            </CardTitle>
            <CardDescription>Manage your current plan and view benefits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-primary">{userPlan.name}</h3>
              <p className="text-sm text-muted-foreground">Your gateway to the AI collective.</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Agents Deployed:</span>
                <span className="text-sm">{userPlan.agentsDeployed} / {userPlan.maxAgents}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${(userPlan.agentsDeployed / userPlan.maxAgents) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <p className="text-sm"><span className="font-medium">Data Processing:</span> {userPlan.dataProcessing}</p>
              <p className="text-sm"><span className="font-medium">Renewal Date:</span> {userPlan.renewalDate}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Plan Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {userPlan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 pt-4">
              <Button disabled>Upgrade Plan (Placeholder)</Button>
              <Button variant="outline" disabled>Manage Billing (Placeholder)</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" /> Owner Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm"><span className="font-medium">Email:</span> owner@example.com</p>
              <Button variant="outline" size="sm" className="w-full" disabled>Edit Profile (Placeholder)</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" /> Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 h-auto text-sm" disabled>
                View Data Usage Policy (Placeholder)
              </Button>
              <br />
              <Button variant="link" className="p-0 h-auto text-sm text-destructive" disabled>
                Request Data Deletion (Placeholder)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
