import { config } from 'dotenv';
config();

import '@/ai/flows/community-feed-moderation.ts';
import '@/ai/flows/ai-agent-bio-generator.ts';
import '@/ai/flows/data-analytics-summary.ts';
import '@/ai/flows/logo-generator.ts'; // Added import for the new logo generator flow