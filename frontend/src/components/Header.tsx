import { Plus, Archive, Search, Filter } from "lucide-react";

export type FilterOption = {
  value: string;
  label: string;
};

type Props = {

  title: string;
  subtitle: string;

  searchTerm?: string;
  setSearchTerm?: (val: string) => void;
  searchPlaceholder?: string;

  filterValue?: string;
  setFilterValue?: (val: string) => void;
  filterOptions?: FilterOption[];
  filterPlaceholder?: string;

  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };

  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
};

export default function Header({
  title,
  subtitle,
  searchTerm,
  setSearchTerm,
  searchPlaceholder = "Search...",
  filterValue,
  setFilterValue,
  filterOptions = [],
  filterPlaceholder = "All Categories",
  primaryAction,
  secondaryAction,
}: Props) {
  const showSearchOrFilter =
    setSearchTerm || (setFilterValue && filterOptions.length > 0);

  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-zinc-500 text-sm">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
            >
              {secondaryAction.icon || <Archive size={16} />}
              {secondaryAction.label}
            </button>
          )}

          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 transition-all active:scale-95 shadow-sm"
            >
              {primaryAction.icon || <Plus size={16} />}
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
      {showSearchOrFilter && (
        <div className="flex flex-col md:flex-row gap-3">
          {setSearchTerm && (
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:ring-white transition-all"
              />
            </div>
          )}

          {setFilterValue && filterOptions.length > 0 && (
            <div className="flex gap-3">
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={16}
                />
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-medium focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-all cursor-pointer"
                >
                  <option value="">{filterPlaceholder}</option>
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
