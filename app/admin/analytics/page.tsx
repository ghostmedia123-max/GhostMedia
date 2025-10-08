import { getAnalyticsSummary } from '@/lib/data';
import AnalyticsExportButton from '@/components/AnalyticsExportButton';

export default async function AnalyticsPage() {
  const summary = await getAnalyticsSummary();

  const stats = [
    { name: 'Pageviews (Last 7 Days)', stat: summary.pageviewsLast7Days },
    { name: 'Pageviews (Last 30 Days)', stat: summary.pageviewsLast30Days },
    { name: 'Pageviews (Last 90 Days)', stat: summary.pageviewsLast90Days },
    { name: 'Total Contact Submissions', stat: summary.submissionCount },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Site Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            A summary of website traffic and engagement.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AnalyticsExportButton />
        </div>
      </div>

      <div className="mt-8">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat.toLocaleString()}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}