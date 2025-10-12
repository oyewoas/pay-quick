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
    <div className="min-h-screen bg-slate-50">
      <Header title="Dashboard" />
      <div className="w-full">
        <div className="max-w-7xl mx-auto p-6">
          {/* Inline error blocks for profile or transactions */}
          {(isErrorProfile || isErrorTransactions) && (
            <div className="mb-6 grid grid-cols-1 gap-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <ProfileSkeleton />
              </div>
              <div className="lg:col-span-8">
                <TransactionsSkeleton />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <ProfileCard name={profile.name} email={profile.email} />
              </div>
              <div className="lg:col-span-8">
                <TransactionsList transactions={transactions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
