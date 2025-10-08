import { getSubmissions } from '@/lib/data';
import SubmissionsList from '@/components/SubmissionsList';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';
import ExportButton from '@/components/ExportButton';

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { submissions, totalPages } = await getSubmissions(query, currentPage);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Contact Form Submissions</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all messages submitted through the contact form.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <ExportButton query={query} />
        </div>
      </div>
      <div className="mt-4">
        <Search placeholder="Search by email..." />
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <SubmissionsList submissions={submissions} />
            <div className="mt-5">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}