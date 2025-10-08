'use client';

import { Submission } from '@/lib/types';
import { deleteSubmission, toggleReadStatus } from '@/lib/actions';
import { useTransition } from 'react';

interface SubmissionsListProps {
  submissions: Submission[];
}

export default function SubmissionsList({ submissions }: SubmissionsListProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      startTransition(() => {
        deleteSubmission(id);
      });
    }
  };

  const handleToggleRead = (id: string, currentState: boolean) => {
    startTransition(() => {
      toggleReadStatus(id, currentState);
    });
  };

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email & Subject</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {submissions.length > 0 ? submissions.map((submission) => (
            <tr key={submission._id} className={!submission.read ? 'bg-blue-50' : ''}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{submission.name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="font-medium text-gray-900">{submission.email}</div>
                <div className="text-gray-500">{submission.subject}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(submission.createdAt).toLocaleDateString()}</td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-4">
                <button
                  onClick={() => handleToggleRead(submission._id, submission.read)}
                  disabled={isPending}
                  className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400"
                >
                  {submission.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={() => handleDelete(submission._id)}
                  disabled={isPending}
                  className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={4} className="text-center py-4 text-gray-500">No submissions yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}