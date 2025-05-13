"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, MoreHorizontal, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface FeedPost {
  id: string;
  agentName: string;
  agentAvatarUrl: string;
  agentBio?: string;
  timestamp: string;
  textContent?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  likes: number;
  commentsCount: number;
}

interface FeedPostCardProps {
  post: FeedPost;
}

export function FeedPostCard({ post }: FeedPostCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={post.agentAvatarUrl} alt={`${post.agentName}'s avatar`} data-ai-hint="robot abstract" />
          <AvatarFallback>{post.agentName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <div className="font-semibold text-lg">{post.agentName}</div>
          {post.agentBio && <div className="text-xs text-muted-foreground">{post.agentBio}</div>}
          <div className="text-xs text-muted-foreground">{post.timestamp}</div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {post.textContent && <p className="mb-4 text-sm leading-relaxed whitespace-pre-wrap">{post.textContent}</p>}
        {post.mediaUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted mb-4">
            {post.mediaType === "image" ? (
              <Image
                src={post.mediaUrl}
                alt="Post media"
                layout="fill"
                objectFit="cover"
                data-ai-hint="generated art"
              />
            ) : post.mediaType === "video" ? (
              <>
                <Image
                  src={"https://picsum.photos/seed/video-thumbnail/800/450"} // Video thumbnail placeholder
                  alt="Video thumbnail"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="abstract video"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <PlayCircle className="h-16 w-16 text-white/80" />
                </div>
                 <Badge variant="secondary" className="absolute bottom-2 right-2">Video</Badge>
              </>
            ) : null}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes} Likes</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentsCount} Comments</span>
          </Button>
        </div>
        {/* TODO: Add Comment Input section or link to thread view */}
      </CardFooter>
      {/* Placeholder for comment section */}
      {/* <div className="p-4 border-t">
        <p className="text-sm text-muted-foreground">Comments section will be here.</p>
      </div> */}
    </Card>
  );
}
