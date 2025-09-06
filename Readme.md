# Crowdfunding DApp

A decentralized crowdfunding platform built with Solidity smart contracts and Next.js frontend, enabling users to create and fund campaigns on the Ethereum blockchain.

![Crowdfunding DApp](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.0-363636?style=for-the-badge&logo=solidity)
![thirdweb](https://img.shields.io/badge/thirdweb-Deploy-purple?style=for-the-badge)

## 🌟 Features

- **Create Campaigns**: Users can create crowdfunding campaigns with goals and deadlines
- **Fund Campaigns**: Support campaigns with ETH contributions
- **Progress Tracking**: Real-time funding progress visualization
- **User Dashboard**: Manage your created campaigns
- **Responsive Design**: Works seamlessly on desktop and mobile

## 📁 Project Structure

```
Crowdfunding/
├── cfc-contract/                # Smart contracts
│   ├── contracts/
│   │   ├── Crowdfunding.sol
│   │   └── CrowdFundingFactory.sol
│   ├── hardhat.config.js
│   └── package.json
└── frontend/                    # Next.js frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   ├── constants/
    │   │   └── dashboard/
    ├── public/
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- pnpm package manager
- MetaMask wallet
- thirdweb account

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd Crowdfunding
```

### 2. Smart Contract Setup

Navigate to the contract directory:
```bash
cd cfc-contract
```

Install dependencies:
```bash
pnpm install
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
pnpm install
```

Create environment file:
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
```

## 📋 Smart Contracts

### CrowdfundingFactory Contract
The factory contract manages campaign creation and tracking.

**Key Functions:**
- `createCampaign()`: Deploy new campaign contracts
- `getAllCampaigns()`: Get list of all campaigns
- `getUserCampaigns()`: Get campaigns created by a user

### Crowdfunding Contract
Individual campaign contract for managing funds and contributions.

**Key Functions:**
- `fundCampaign()`: Contribute ETH to a campaign
- `getContractBalance()`: Check current funding amount
- `withdrawFunds()`: Creator can withdraw funds after goal is met

## 🛠 Development

### Contract Development

Build contracts:
```bash
cd cfc-contract
npm run build
```

Deploy using thirdweb:
1. Visit [thirdweb dashboard](https://thirdweb.com/dashboard)
2. Connect your wallet
3. Go to "Deploy" section
4. Upload your contract files
5. Fill in constructor parameters
6. Deploy to Sepolia testnet

### Frontend Development

Start development server:
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Smart Contract Deployment

This project uses **thirdweb** for smart contract deployment:

1. **Prepare Contracts**:
   ```bash
   cd cfc-contract
   npm run build
   ```

2. **Deploy via thirdweb Dashboard**:
   - Visit [thirdweb.com/dashboard](https://thirdweb.com/dashboard)
   - Connect your wallet
   - Navigate to "Deploy" section
   - Upload contract files (`CrowdFundingFactory.sol`)
   - Configure deployment parameters:
     - Network: Sepolia (for testing) or Ethereum Mainnet
     - Constructor parameters (if any)
   - Confirm deployment transaction

3. **Get Contract Address**:
   - Copy the deployed contract address
   - Update `CROWDFUNDING_FACTORY` in `frontend/src/app/constants/contracts.ts`

### Frontend Deployment

Deploy to Vercel:
```bash
cd frontend
npm run build
```

Or deploy using Vercel CLI:
```bash
npx vercel --prod
```

## 🔧 Configuration

### thirdweb Setup

1. Create account at [thirdweb.com](https://thirdweb.com)
2. Get your Client ID from [API Keys section](https://thirdweb.com/dashboard/settings/api-keys)
3. Add to your `.env.local`:
   ```env
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
   ```

### Contract Configuration

Update contract addresses in `frontend/src/app/constants/contracts.ts`:
```typescript
export const CROWDFUNDING_FACTORY = "0x..."; // Your deployed factory address
```

### Network Configuration

The app is configured for Sepolia testnet. To change networks, update:
- `frontend/src/app/page.tsx` - chain parameter
- `frontend/src/app/components/CampaignCard.tsx` - chain parameter

## 🛠 Technologies Used

### Smart Contracts
- **Solidity** ^0.8.0 - Smart contract language
- **Hardhat** - Development framework
- **thirdweb** - Deployment and interaction platform

### Frontend
- **Next.js 14+** - React framework with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **thirdweb SDK** - Web3 interactions and wallet connectivity

### Infrastructure
- **Ethereum Sepolia** - Testnet for development
- **IPFS** - Decentralized storage (if applicable)
- **Vercel** - Frontend hosting platform

## 📱 Usage

### For Campaign Creators
1. Connect your wallet
2. Navigate to Dashboard
3. Click "Create Campaign"
4. Fill in campaign details:
   - Name and description
   - Funding goal (in ETH)
   - Campaign duration (in days)
5. Confirm transaction to deploy campaign

### For Contributors
1. Browse available campaigns on homepage
2. Click "View Campaign" for details
3. Enter contribution amount
4. Confirm transaction to fund campaign

## 🧪 Testing

Run frontend tests:
```bash
cd frontend
npm run test
```

Test smart contracts:
```bash
cd cfc-contract
npx hardhat test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


## 🆘 Support

- Create an issue for bugs or feature requests
- Check [thirdweb documentation](https://portal.thirdweb.com/) for SDK help

## 🙏 Acknowledgments

- [thirdweb](https://thirdweb.com) for deployment infrastructure
- [Remix](https://remix.ethereum.org/) for secure contract patterns
- [Tailwind CSS](https://tailwindcss.com) for styling system

---

Built with ❤️ by soumen