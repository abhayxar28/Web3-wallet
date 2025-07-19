# 🔐 Web3 Wallet Generator (Solana)

A minimal web-based Solana wallet generator built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
This project helps beginners understand how **mnemonics**, **seed phrases**, **public keys**, and **private keys** are generated and used in Web3.

---

## ✨ Features

- 🔑 Generate a **new mnemonic** or use a custom one
- 🔐 Derive **Solana keypairs** from seed using `ed25519` path (`m/44'/501'/0'/0'`)
- 📜 View and **copy public/private keys**
- 👀 Toggle private key visibility
- ➕ Generate multiple wallets using the same mnemonic
- ❌ Clear or delete individual wallets

---


## 🧠 How It Works

- A **mnemonic phrase** is generated using `bip39`.
- It’s converted to a **seed buffer** using `mnemonicToSeedSync()`.
- Using `ed25519-hd-key`, the app derives a private key at a Solana-compatible path.
- A **keypair** is generated using `@solana/web3.js`, giving you a public and private key.
- The keys are then displayed in the browser for learning purposes.

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [bip39](https://github.com/bitcoinjs/bip39)
- [ed25519-hd-key](https://github.com/danfinlay/ed25519-hd-key)
- [@solana/web3.js](https://solana.com/developers)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/abhayxar28/web3-wallet-generator.git

# 2. Install dependencies
cd web3-wallet-generator
npm install

# 3. Run the dev server
npm run dev

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
