'use client';
import { client } from "@/app/client";
import Link from "next/link";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Target,
    TrendingUp,
    Users,
    Calendar,
    ArrowRight,
    DollarSign,
    CheckCircle
} from "lucide-react";

type CampaignCardProps = {
    campaignAddress: string;
};

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaignAddress }) => {
    const contract = getContract({
        client: client,
        chain: sepolia,
        address: campaignAddress,
    });

    // Get Campaign Data
    const { data: campaignName } = useReadContract({
        contract: contract,
        method: "function name() view returns (string)",
        params: []
    });

    const { data: campaignDescription } = useReadContract({
        contract: contract,
        method: "function description() view returns (string)",
        params: []
    });

    const { data: goal, isLoading: isLoadingGoal } = useReadContract({
        contract: contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });

    const { data: balance, isLoading: isLoadingBalance } = useReadContract({
        contract: contract,
        method: "function getContractBalance() view returns (uint256)",
        params: [],
    });

    // Calculate progress
    const totalBalance = balance?.toString();
    const totalGoal = goal?.toString();

    let balancePercentage = 0;
    let isGoalReached = false;

    if (totalBalance && totalGoal) {
        balancePercentage = (parseInt(totalBalance) / parseInt(totalGoal)) * 100;
        isGoalReached = balancePercentage >= 100;
        if (balancePercentage >= 100) {
            balancePercentage = 100;
        }
    }

    // Format currency values
    const formatCurrency = (value: string | undefined) => {
        if (!value) return "$0";
        const num = parseInt(value);
        if (num >= 1000000) {
            return `$${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `$${(num / 1000).toFixed(1)}K`;
        }
        return `$${num.toLocaleString()}`;
    };

    const LoadingSkeleton = () => (
        <div className="card card-hover p-6 space-y-4">
            <div className="animate-shimmer h-6 rounded-lg"></div>
            <div className="animate-shimmer h-4 rounded"></div>
            <div className="animate-shimmer h-4 rounded w-3/4"></div>
            <div className="space-y-2">
                <div className="animate-shimmer h-8 rounded-xl"></div>
                <div className="flex justify-between">
                    <div className="animate-shimmer h-4 w-16 rounded"></div>
                    <div className="animate-shimmer h-4 w-16 rounded"></div>
                </div>
            </div>
            <div className="animate-shimmer h-12 rounded-xl"></div>
        </div>
    );

    if (isLoadingBalance || isLoadingGoal) {
        return <LoadingSkeleton />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="group"
        >
            <div className="card card-hover p-6 h-full flex flex-col">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                        "inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium",
                        isGoalReached
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                    )}>
                        {isGoalReached ? (
                            <>
                                <CheckCircle className="h-3 w-3" />
                                <span>Funded</span>
                            </>
                        ) : (
                            <>
                                <TrendingUp className="h-3 w-3" />
                                <span>Active</span>
                            </>
                        )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>Ethereum</span>
                    </div>
                </div>

                {/* Campaign Title */}
                <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {campaignName || "Untitled Campaign"}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {campaignDescription || "No description available for this campaign."}
                </p>

                {/* Progress Section */}
                <div className="space-y-3 mb-6">
                    {/* Progress Bar */}
                    <div className="relative">
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className={cn(
                                    "h-full rounded-full relative",
                                    isGoalReached
                                        ? "bg-gradient-to-r from-green-500 to-green-600"
                                        : "bg-gradient-to-r from-indigo-500 to-purple-600"
                                )}
                                initial={{ width: 0 }}
                                animate={{ width: `${balancePercentage}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                {balancePercentage > 20 && (
                                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                                )}
                            </motion.div>
                        </div>
                        <div className="absolute -top-1 -right-1 bg-white border border-slate-200 rounded-full px-2 py-1">
                            <span className="text-xs font-medium text-slate-700">
                                {Math.round(balancePercentage)}%
                            </span>
                        </div>
                    </div>

                    {/* Funding Stats */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-slate-900">
                                {formatCurrency(totalBalance)}
                            </span>
                            <span className="text-slate-500">raised</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                                of {formatCurrency(totalGoal)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <Link href={`/campaign/${campaignAddress}`} className="w-full">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary flex items-center justify-center space-x-2 group"
                    >
                        <span>View Campaign</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};