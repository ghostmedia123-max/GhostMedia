import { getAnalyticsSummary, getSubmissions } from '../../lib/data';
import Link from 'next/link';
import {
  ChartBarIcon,
  InboxArrowDownIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { Submission } from '../../lib/types';

/**
 * The main dashboard page for the admin area.
 * This component is protected by the middleware.
 */
export default async function AdminDashboardPage() {
  // Fetch real data for the dashboard
  const [summary, submissionsData] = await Promise.all([
    getAnalyticsSummary(),
    getSubmissions('', 1), // Fetch first page of submissions
  ]);

  const stats = [
    { name: 'Total Submissions', stat: summary.submissionCount, icon: InboxArrowDownIcon },
    { name: 'Pageviews (7 Days)', stat: summary.pageviewsLast7Days, icon: UsersIcon },
    { name: 'Pageviews (30 Days)', stat: summary.pageviewsLast30Days, icon: ArrowTrendingUpIcon },
  ];

  // Get the 5 most recent submissions for the activity feed
  const recentSubmissions = submissionsData.submissions.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-gray-800">
      <main>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Dashboard</h1>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-6 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-14 truncate text-sm font-medium text-gray-500 sm:ml-16">{item.name}</p>
              </dt>
              <dd className="ml-14 flex items-baseline sm:ml-16">
                <p className="text-2xl font-semibold text-gray-900">{item.stat.toLocaleString()}</p>
              </dd>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Actions */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
            <Link href="/admin/submissions" className="group flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all hover:border-indigo-500 hover:shadow-md">
              <div>
                <div className="flex items-center gap-3">
                  <InboxArrowDownIcon className="h-8 w-8 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">View Submissions</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">Manage messages and inquiries from your contact and quote forms.</p>
              </div>
            </Link>
            <Link href="/admin/analytics" className="group flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all hover:border-indigo-500 hover:shadow-md">
              <div>
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="h-8 w-8 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">View Analytics</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">Check website traffic, user engagement, and performance metrics.</p>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <ul role="list" className="mt-4 space-y-4">
              {recentSubmissions.map((submission: Submission) => (
                <li key={submission._id} className="flex items-start gap-3">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{submission.message.substring(0, 70)}...</p>
                    <p className="text-xs text-gray-500">
                      from {submission.name} &middot; {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}