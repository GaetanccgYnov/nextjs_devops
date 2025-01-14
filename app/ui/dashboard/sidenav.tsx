import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  const version = process.env.NEXT_PUBLIC_VERSION;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  let envColor;
  switch (environment) {
    case 'local':
    case 'development':
      envColor = 'bg-green-500';
      break;
    case 'staging':
      envColor = 'bg-yellow-500';
      break;
    case 'production':
      envColor = 'bg-red-500';
      break;
    default:
      envColor = 'bg-gray-500';
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className="mb-2 text-sm">
          Version: {version} {'  '}
          <div
            className={`mt-1 inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium  ${envColor}`}
          >
            {environment}
          </div>
        </div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
