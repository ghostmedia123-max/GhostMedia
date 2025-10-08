'use client';

import { exportSubmissionsToCSV } from '@/lib/actions';
import { useTransition } from 'react';

export default function ExportButton({ query }: { query: string }) {
  const [isPending, startTransition] = useTransition();

  const handleExport = () => {
    startTransition(async () => {
      const result = await exportSubmissionsToCSV(query);
      if (result.success && result.csv) {
        // Create a blob and trigger a download
        const blob = new Blob([result.csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `submissions-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert(result.message || 'Export failed.');
      }
    });
  };

  return (
    <button onClick={handleExport} disabled={isPending} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto disabled:bg-gray-400">
      {isPending ? 'Exporting...' : 'Export to CSV'}
    </button>
  );
}