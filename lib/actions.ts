'use server';

import { revalidatePath } from 'next/cache';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Papa from 'papaparse';

export async function deleteSubmission(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection('submissions').deleteOne({ _id: new ObjectId(id) });

    // Revalidate the submissions page to show the updated list
    revalidatePath('/admin/submissions');

    return { success: true, message: 'Submission deleted.' };
  } catch (error) {
    console.error('Failed to delete submission:', error);
    return { success: false, message: 'Failed to delete submission.' };
  }
}

export async function toggleReadStatus(id: string, currentState: boolean) {
  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection('submissions').updateOne(
      { _id: new ObjectId(id) },
      { $set: { read: !currentState } }
    );

    // Revalidate the path to update the UI
    revalidatePath('/admin/submissions');

    return { success: true, message: 'Status updated.' };
  } catch (error) {
    console.error('Failed to toggle read status:', error);
    return { success: false, message: 'Failed to update status.' };
  }
}

export async function exportSubmissionsToCSV(query?: string) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const filter = query ? { email: { $regex: query, $options: 'i' } } : {};

    const submissions = await db
      .collection('submissions')
      .find(filter, { projection: { _id: 0, name: 1, email: 1, subject: 1, message: 1, createdAt: 1, read: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    if (submissions.length === 0) {
      return { success: false, message: 'No submissions to export.' };
    }

    const csv = Papa.unparse(submissions);
    return { success: true, csv };
  } catch (error) {
    console.error('Failed to export submissions:', error);
    return { success: false, message: 'Failed to export data.' };
  }
}

export async function exportAnalyticsToCSV() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const pageviews = await db
      .collection('pageviews')
      .find({}, { projection: { _id: 0, path: 1, timestamp: 1, userAgent: 1, 'geo.country': 1, 'geo.city': 1 } })
      .sort({ timestamp: -1 })
      .toArray();

    if (pageviews.length === 0) {
      return { success: false, message: 'No analytics data to export.' };
    }

    const csv = Papa.unparse(pageviews);
    return { success: true, csv };
  } catch (error) {
    console.error('Failed to export analytics:', error);
    return { success: false, message: 'Failed to export data.' };
  }
}