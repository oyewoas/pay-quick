import { Navigate } from "react-router";
import { useAppSelector } from "@/store/hooks";
import { useGetProfileQuery } from "@/services/profile";
import { useGetTransactionsQuery } from "@/services/transactions";
import Header from "@/components/Header";
import ErrorCard from "@/components/ui/ErrorCard";
import ProfileCard from "@/components/ui/ProfileCard";
import TransactionsList from "@/components/ui/TransactionsList";
import {
  ProfileSkeleton,
  TransactionsSkeleton,
} from "@/components/ui/Skeletons";
import { getErrorMessage } from "@/utils/errors";

export default function Dashboard() {
  const profile = useAppSelector((s) => s.profile);
  const transactions = useAppSelector((s) => s.transactions.items);
  const user = useAppSelector((s) => s.auth.user);
  const {
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
    error: errorProfile,
    refetch: refetchProfile,
  } = useGetProfileQuery(user?.id ?? "", {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });

  const {
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    error: errorTransactions,
    refetch: refetchTransactions,
  } = useGetTransactionsQuery(undefined, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Header title="Dashboard" />

        {/* Inline error blocks for profile or transactions */}
        {(isErrorProfile || isErrorTransactions) && (
          <div className="mb-4 grid grid-cols-1 gap-4">
            {isErrorProfile && (
              <ErrorCard
                title="Failed to load profile"
                message={getErrorMessage(errorProfile)}
                onRetry={() => refetchProfile()}
              />
            )}

            {isErrorTransactions && (
              <ErrorCard
                title="Failed to load transactions"
                message={getErrorMessage(errorTransactions)}
                onRetry={() => refetchTransactions()}
              />
            )}
          </div>
        )}
        {isLoadingProfile || isLoadingTransactions ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfileSkeleton />
            <TransactionsSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfileCard name={profile.name} email={profile.email} />
            <TransactionsList transactions={transactions} />
          </div>
        )}
      </div>
    </div>
  );
}
