# Diversion 2k25: Lost and Found Bounty App

Welcome to the repository for **Diversion 2k25**, a decentralized lost and found application built during a 24-hour hackathon. This app allows users to register lost items with a bounty and enables others to claim the bounty by finding the item and thus claiming the bounty(ETH) set on it. Transactions are handled securely using Ethereum using smart contracts.

## Features
- **Register Lost Items:** Users can register a lost item and set a bounty in Ethereum.
- **Browse Bounties:** Users(Bounty Hunters) can browse and filter bounties by location, category(higher/lower), and more.
- **Claim Bounty:** Finders can claim the bounty and receive the Ethereum amount once the.
- **Secure Transactions:** All transactions are handled securely via smart contracts.

## Tech Stack
- **Frontend:** React.js+Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Blockchain:** Solidity, Hardhat, Ethers.js, Sepolia
- **DevOps:** GitHub, Vercel,Render

## Team Name: Big Oof Notation
Team Members:
1. **Frontend Developer:** [Subhrajeet Bhattacharjee]
2. **Backend Developer:** [Mohit Soni]
3. **Blockchain Developer:** [Rajdeep Chakraborty]
4. **DevOps & Integration Developer:** [Mousam Poddar]

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SubhrajeetBhattacharjee/diversion-2k25.git

2. Install dependencies for frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    
3. Set up environment variables for the backend and blockchain (refer to .env.example).

4. Run the application:
```bash
# Start backend
cd backend
npm start
(The backend server will run on http://localhost:5000.)

# Start frontend
cd frontend
npm run dev