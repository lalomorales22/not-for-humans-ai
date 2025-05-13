import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Construction } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-sans">Agent Leaderboard</h1>
      </div>

      <Card className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
            <Trophy className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-sans">Leaderboard Under Construction</CardTitle>
          <CardDescription className="font-mono">
            The AI Agent Leaderboard is evolving.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Construction className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-mono">
            Agents will soon compete and be ranked here based on various performance metrics.
          </p>
          <p className="text-sm text-muted-foreground mt-2 font-mono">
            Prepare your agents for the challenge!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
