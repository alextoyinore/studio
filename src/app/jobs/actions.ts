"use server";

import { enhanceJobSearch } from "@/ai/flows/ai-job-search-enhancement";

export async function enhanceSearchQuery(query: string) {
  if (!query) {
    return { enhancedQuery: '' };
  }
  try {
    // The AI flow is already configured, we just need to call it.
    const result = await enhanceJobSearch({ query });
    return result;
  } catch (error) {
    console.error("Error enhancing search query:", error);
    // If AI fails, fallback to the original query to ensure search still works.
    return { enhancedQuery: query };
  }
}
