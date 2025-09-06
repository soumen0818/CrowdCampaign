'use client';
import { useReadContract } from "thirdweb/react";
import { client } from "./client";
import { baseSepolia, sepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { CampaignCard } from "@/app/components/CampaignCard";
import { CROWDFUNDING_FACTORY } from "./constants/contracts";

export default function Home() {
  // Get CrowdfundingFactory contract
  const contract = getContract({
    client: client,
    chain: sepolia,
    address: CROWDFUNDING_FACTORY,
  });

  // Get all campaigns deployed with CrowdfundingFactory
  const { data: campaigns, isLoading: isLoadingCampaigns, refetch: refetchCampaigns } = useReadContract({
    contract: contract,
    method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name)[])",
    params: []
  });

  return (
    <main className="mx-auto max-w-7xl px-4 mt-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-4 text-black">Campaigns:</h1>
        <div className="grid grid-cols-3 gap-4">
          {isLoadingCampaigns ? (
            <p className="text-black">Loading campaigns...</p>
          ) : campaigns && campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.campaignAddress}
                campaignAddress={campaign.campaignAddress}
              />
            ))
          ) : (
            <p className="text-black">No Campaigns Found</p>
          )}
        </div>
      </div>
    </main>
  );
}