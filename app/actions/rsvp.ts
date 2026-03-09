"use server";

export async function clickrsvp(formData: FormData): Promise<void> {
  const email = formData.get("email");
  
  if (!email || typeof email !== "string") {
    throw new Error("Email is required");
  }
  
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
  const BASE_ID = process.env.AIRTABLE_BASE_ID!;
  const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME!;
  
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: { Email: email } }],
      }),
    }
  );
  
  const data = await res.json();
  
  if (!res.ok) {
    console.error("Airtable error:", data);
    throw new Error(data?.error?.message || "Failed to submit RSVP");
  }
}