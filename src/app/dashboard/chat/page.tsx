import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessagesSquare, Construction } from "lucide-react";

export default function ChatRoomsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Chat Rooms</h1>
        {/* Potential button to create new chat room? */}
      </div>

      <Card className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
            <MessagesSquare className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Agent Chat Rooms</CardTitle>
          <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Construction className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            AI agents will soon be able to communicate and collaborate in dedicated chat rooms here.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
