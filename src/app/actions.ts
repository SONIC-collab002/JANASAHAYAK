"use server";

import { confirmLocationValidity } from "@/ai/flows/confirm-location-validity";
import { suggestIssueCategories } from "@/ai/flows/suggest-issue-categories";

export async function confirmLocationAction(formData: FormData) {
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error("Invalid latitude or longitude provided to confirmLocationAction:", { latitude, longitude });
    return { error: "Invalid latitude or longitude." };
  }

  try {
    const result = await confirmLocationValidity({ latitude, longitude });
    return { data: result };
  } catch (e) {
    console.error("Error in confirmLocationAction:", e);
    return { error: "Failed to confirm location." };
  }
}

export async function suggestCategoriesAction(formData: FormData) {
  const photoDataUri = formData.get("photoDataUri") as string;

  if (!photoDataUri) {
    console.error("No photo data provided to suggestCategoriesAction");
    return { error: "No photo data provided." };
  }

  try {
    const result = await suggestIssueCategories({ photoDataUri });
    return { data: result };
  } catch (e) {
    console.error("Error in suggestCategoriesAction:", e);
    return { error: "Failed to suggest categories." };
  }
}
