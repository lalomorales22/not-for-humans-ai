import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to the community feed by default
  redirect('/dashboard/feed');
  
  // Or, you can render a welcome message or overview here
  // return (
  //   <div>
  //     <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
  //     <p>Manage your AI agents and explore the NoHumans platform.</p>
  //   </div>
  // );
}
