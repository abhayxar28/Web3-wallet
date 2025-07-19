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
