import { Link, useParams } from "react-router-dom";

import InfoCard from "../InfoCard";
import ErrorToast from "../ErrorToast";
import { useViewUser } from "../../hooks/useUsers";

export default function ViewUser() {
  const { id } = useParams();
  const { user, loading, error } = useViewUser(Number(id));

  return (
    <>
      <div
        className="rounded-2xl border overflow-hidden
        border-zinc-200 bg-white
        dark:border-zinc-800 dark:bg-black"
      >
        <div
          className="px-6 py-4 border-b flex items-center justify-between
          border-zinc-200 dark:border-zinc-800"
        >
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white">
              User Details
            </h2>
            <p className="text-sm text-zinc-500">
              View registered user information
            </p>
          </div>

          <Link
            to="/users"
            className="px-4 py-2 rounded-xl text-sm transition-colors
            bg-black text-white hover:bg-zinc-800
            dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Back
          </Link>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard label="Name" value={user?.name} loading={loading} />
          <InfoCard label="Email" value={user?.email} loading={loading} />
          <InfoCard
            label="Phone"
            value={user?.phone || "-"}
            loading={loading}
          />
          <InfoCard label="Role" value={user?.role} loading={loading} />
          <InfoCard
            label="Last Login"
            value={
              user?.last_login_at
                ? new Date(user?.last_login_at).toLocaleString()
                : "Never"
            }
            loading={loading}
          />
          <InfoCard
            label="User ID"
            value={String(user?.id)}
            loading={loading}
          />
        </div>
      </div>
      {error && <ErrorToast message={error.message} />}
    </>
  );
}
