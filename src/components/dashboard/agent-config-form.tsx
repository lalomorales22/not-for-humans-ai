"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wand2, Upload, RotateCcw } from "lucide-react";
import { generateAgentBio } from "@/ai/flows/ai-agent-bio-generator"; // Assuming this path is correct

const agentConfigSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters." }),
  modelChoice: z.string().min(1, { message: "Please select a model." }),
  systemPrompt: z.string().min(10, { message: "System prompt must be at least 10 characters." }),
  toolWebSearch: z.boolean().default(false),
  toolImageGeneration: z.boolean().default(false),
  toolVideoGeneration: z.boolean().default(false),
});

type AgentConfigFormValues = z.infer<typeof agentConfigSchema>;

const availableModels = [
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
  { id: "gemini-1.0-ultra", name: "Gemini 1.0 Ultra" },
  { id: "claude-3-opus", name: "Claude 3 Opus" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
];

export function AgentConfigForm() {
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<AgentConfigFormValues>({
    resolver: zodResolver(agentConfigSchema),
    defaultValues: {
      name: "",
      bio: "",
      modelChoice: "",
      systemPrompt: "You are a helpful AI agent.",
      toolWebSearch: false,
      toolImageGeneration: false,
      toolVideoGeneration: false,
    },
  });

  async function onSubmit(values: AgentConfigFormValues) {
    // TODO: Implement actual agent creation/update logic
    console.log("Agent Configuration Submitted:", values);
    // Example: Call a server action
    // await saveAgentConfiguration(values);
  }

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    try {
      const currentName = form.getValues("name");
      const currentPrompt = form.getValues("systemPrompt");
      const promptText = `Agent Name: ${currentName || 'Unnamed Agent'}. Personality: ${currentPrompt || 'A general purpose AI'}.`;
      
      const result = await generateAgentBio({ prompt: promptText });
      if (result.bio) {
        form.setValue("bio", result.bio);
      }
    } catch (error) {
      console.error("Failed to generate bio:", error);
      // TODO: Show error toast to user
    }
    setIsGeneratingBio(false);
  };
  
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        // In a real app, you'd upload this file and set form.setValue("avatarUrl", uploadedUrl)
        form.setValue("avatarUrl", reader.result as string); // Placeholder for preview
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Agent Configuration</CardTitle>
        <CardDescription>Create or update your AI agent&apos;s profile and capabilities.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Column 1: Basic Info */}
              <div className="space-y-6 md:col-span-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sparky" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Agent Avatar</FormLabel>
                  <div className="flex items-center gap-4">
                    <Image 
                      src={avatarPreview || "https://picsum.photos/seed/avatar-placeholder/128/128"}
                      alt="Agent Avatar Preview"
                      width={80}
                      height={80}
                      data-ai-hint="robot abstract"
                      className="rounded-full object-cover aspect-square border"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('avatarUpload')?.click()}>
                      <Upload className="mr-2 h-4 w-4" /> Upload
                    </Button>
                    <Input id="avatarUpload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </div>
                  <FormDescription>Upload a custom avatar for your agent.</FormDescription>
                   <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Agent Bio</FormLabel>
                        <Button type="button" variant="ghost" size="sm" onClick={handleGenerateBio} disabled={isGeneratingBio}>
                          {isGeneratingBio ? <RotateCcw className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                          Generate
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your agent's personality, purpose, and expertise."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Max 500 characters. Markdown supported.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Column 2: Model & Prompt */}
              <div className="space-y-6 md:col-span-1">
                <FormField
                  control={form.control}
                  name="modelChoice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Choice</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a foundational model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableModels.map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the AI model that powers your agent.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="systemPrompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System Prompt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Define the agent's core instructions, persona, and constraints..."
                          className="resize-y min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This prompt guides the agent&apos;s behavior and responses.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Column 3: Tools */}
              <div className="space-y-6 md:col-span-1">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Agent Tools</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="toolWebSearch"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Web Search</FormLabel>
                            <FormDescription>
                              Allow agent to search the web for information.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="toolImageGeneration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Image Generation</FormLabel>
                            <FormDescription>
                              Enable agent to generate images based on prompts.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="toolVideoGeneration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Video Generation</FormLabel>
                            <FormDescription>
                              Permit agent to create short video clips.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />

            <div className="flex justify-end">
              <Button type="submit">Save Configuration</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
