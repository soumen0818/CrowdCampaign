'use client';
import { useReadContract } from "thirdweb/react";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { CampaignCard } from "@/app/components/CampaignCard";
import { CROWDFUNDING_FACTORY } from "./constants/contracts";
import { motion } from "framer-motion";
import {
  Rocket,
  Shield,
  Globe,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  Sparkles,
  Target,
  Heart
} from "lucide-react";
import Link from "next/link";

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

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Smart contracts ensure transparent and secure funding with immutable records."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Connect with backers and creators worldwide without geographical limitations."
    },
    {
      icon: TrendingUp,
      title: "Real-time Updates",
      description: "Track funding progress and campaign milestones in real-time."
    }
  ];

  const stats = [
    { icon: DollarSign, value: "2.5M+", label: "Total Funded" },
    { icon: Users, value: "15K+", label: "Backers" },
    { icon: Target, value: "250+", label: "Projects" },
    { icon: Heart, value: "98%", label: "Success Rate" }
  ];

  const LoadingCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card p-6 space-y-4">
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
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16 pb-20">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-full px-6 py-3 shadow-sm">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Decentralized • Transparent • Secure</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 mb-6"
            >
              Fund the Future with{" "}
              <span className="gradient-text">CrowdCampaign</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              The first truly decentralized crowdfunding platform. Launch your project,
              connect with global backers, and bring innovative ideas to life through
              blockchain technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="#campaigns">
                <button className="btn-primary flex items-center space-x-2 group">
                  <Rocket className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Explore Campaigns</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="btn-secondary flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Launch Project</span>
              </button>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-3">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose CrowdCampaign?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built on blockchain technology for maximum transparency, security, and global accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-6">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section id="campaigns" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            >
              Active Campaigns
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              Discover innovative projects and help bring them to life
            </motion.p>
          </div>

          {isLoadingCampaigns ? (
            <LoadingCards />
          ) : campaigns && campaigns.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.campaignAddress}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CampaignCard campaignAddress={campaign.campaignAddress} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                <Target className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Campaigns Yet</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Be the first to launch an innovative project on our platform
              </p>
              <button className="btn-primary flex items-center space-x-2 mx-auto">
                <Rocket className="h-4 w-4" />
                <span>Launch Your Campaign</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}