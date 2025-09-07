'use client';
import { client } from "@/app/client";
import Link from "next/link";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Menu,
    X,
    Coins,
    LayoutDashboard,
    Home,
    Wallet,
    TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const account = useActiveAccount();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navItems = [
        {
            href: "/",
            label: "Campaigns",
            icon: Home,
            active: true
        },
        ...(account ? [{
            href: `/dashboard/${account.address}`,
            label: "Dashboard",
            icon: LayoutDashboard,
            active: false
        }] : [])
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className={cn(
                                "relative inline-flex items-center justify-center rounded-xl p-2",
                                "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                                "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
                                "transition-all duration-200"
                            )}
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={toggleMobileMenu}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Logo and brand */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href="/" className="flex flex-shrink-0 items-center group">
                            <div className="relative flex items-center space-x-3">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300"></div>
                                    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                                        <Coins className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        CrowdCampaign
                                    </h1>
                                    <p className="text-xs text-slate-500 -mt-1">Decentralized Funding</p>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop navigation */}
                        <div className="hidden sm:ml-8 sm:block">
                            <div className="flex space-x-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center space-x-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                                                item.active
                                                    ? "bg-indigo-100 text-indigo-700"
                                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                            )}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Connect wallet button */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="flex items-center space-x-3">
                            {account && (
                                <div className="hidden sm:flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                    <Wallet className="h-3 w-3" />
                                    <span>Connected</span>
                                </div>
                            )}
                            <ConnectButton
                                client={client}
                                theme={lightTheme({
                                    colors: {
                                        primaryButtonBg: "rgb(99 102 241)",
                                        primaryButtonText: "white",
                                    }
                                })}
                                detailsButton={{
                                    style: {
                                        maxHeight: "44px",
                                        borderRadius: "12px",
                                        border: "1px solid rgb(226 232 240)",
                                        background: "white",
                                        color: "rgb(51 65 85)"
                                    }
                                }}
                                connectButton={{
                                    style: {
                                        borderRadius: "12px",
                                        background: "linear-gradient(135deg, rgb(99 102 241), rgb(147 51 234))",
                                        border: "none",
                                        fontWeight: "500"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="sm:hidden"
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 pb-3 pt-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center space-x-3 rounded-xl px-3 py-3 text-base font-medium transition-all duration-200",
                                            item.active
                                                ? "bg-indigo-100 text-indigo-700"
                                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                        )}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}

                            {/* Mobile wallet status */}
                            {account && (
                                <div className="mt-4 px-3">
                                    <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-xl text-sm font-medium">
                                        <Wallet className="h-4 w-4" />
                                        <span>Wallet Connected</span>
                                        <TrendingUp className="h-4 w-4 ml-auto" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;