import { NextResponse } from 'next/server';

interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: {
    Email?: string;
  };
}

interface AirtableResponse {
  records: AirtableRecord[];
}

export async function GET() {
  try {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const BASE_ID = process.env.AIRTABLE_BASE_ID;
    const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

    if (!AIRTABLE_API_KEY || !BASE_ID || !TABLE_NAME) {
      return NextResponse.json(
        { error: "Missing Airtable configuration" },
        { status: 500 }
      );
    }

    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }, 
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch data from Airtable' },
        { status: response.status }
      );
    }

    const data: AirtableResponse = await response.json();
    
    const emails = data.records
      .filter((record: AirtableRecord) => record.fields.Email) 
      .map((record: AirtableRecord) => ({
        id: record.id,
        email: record.fields.Email,
        createdTime: record.createdTime
      }));

    return NextResponse.json({
      success: true,
      count: emails.length,
      data: emails
    });

  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}