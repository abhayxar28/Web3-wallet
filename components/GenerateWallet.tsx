"use client";
import { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";
import { validateMnemonic } from "bip39";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CircleCheck, Copy, Eye, EyeOff} from "lucide-react";
import { toast } from "sonner";
import DeleteWalletIndex from "./remove-wallet";
import axios from "axios";

export default function GenerateWallet() {
  const [mnemonics, setMnemonics] = useState<string[]>([]);
  const [wallets, setWallets] = useState<{ publicKey: string; privateKey: string }[]>([]);
  const [derivationIndex, setDerivationIndex] = useState(0);
  const [seed, setSeed] = useState<Buffer | null>(null);
  const [input, setInput] = useState("");
  const [walletAmount, setWalletAmount] = useState<{[key: string]: number}>({});
  const [visibleWallets, setVisibleWallets] = useState<{ [index: number]: boolean }>({});  

  const handleCopy = async (value: string[]) => {
    await navigator.clipboard.writeText(value.join(" ")) 
    toast.success("Copied to clipboard!", {
      icon: <CircleCheck />,
    })
  }

  const handlePrivateCopy = async(value: string)=>{
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!", {
      icon: <CircleCheck />,
    })
  }

  const handlePublicCopy = async(value: string)=>{
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!", {
      icon: <CircleCheck />,
    })
  }

  const generateInitialWallet = () => {

    if(!input.trim()){
      const mnemonic = generateMnemonic();
      const mnemonicWords = mnemonic.split(" ");
      const seedBuffer = mnemonicToSeedSync(mnemonic);
      setMnemonics(mnemonicWords);
      setSeed(seedBuffer);
      generateWalletAtIndex(0, seedBuffer);
      toast.success("Wallet created!", {
        icon: <CircleCheck />,
      })
    }else{
      if (!validateMnemonic(input.trim())) {
        alert("Invalid mnemonic phrase");
        return;
      }
      const mnemonicWords = input.split(" ");
      const seedBuffer = mnemonicToSeedSync(input);
      setMnemonics(mnemonicWords);
      setSeed(seedBuffer);
      generateWalletAtIndex(0, seedBuffer);
      toast.success("Wallet created!", {
        icon: <CircleCheck />,
      })
    }

    setDerivationIndex(1);

  };

  const generateWalletAtIndex = (index: number, seedBuffer: Buffer) => {
    const path = `m/44'/501'/${index}'/0'`;
    const { key } = derivePath(path, seedBuffer.toString("hex"));
    const keypair = Keypair.fromSeed(key);

    const wallet = {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey),
    };

    setWallets((prev) => [...prev, wallet]);
    setDerivationIndex(index + 1);
  };

  const addWallet = () => {
    if (!seed) return;
    generateWalletAtIndex(derivationIndex, seed);
    toast.success("Wallet Added", {
      icon: <CircleCheck />,
    })
  };

  const clearWallets = () => {
    setMnemonics([]);
    setWallets([]);
    setSeed(null);
    setDerivationIndex(0);
    toast.success("Copied to clipboard!", {
      icon: <CircleCheck />,
    })
  };

  const deleteWalletAtIndex = (index: number) => {
    setWallets((prev) => prev.filter((_, i) => i !== index));
    toast.success("Wallet Deleted Successfully", {
      icon: <CircleCheck />,
    })
  };

  const handleVisible = (index: number) => {
    setVisibleWallets((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  useEffect(()=>{

      const getWalletAmount = async()=>{               
        if (wallets.length === 0) return;

        const balances: {[key: string]: number} = {}

        await Promise.all(
          wallets.map(async(wallet)=>{
            try{
              const res = await axios.post("https://solana-devnet.g.alchemy.com/v2/-jyOnsatlVdZ5yMtdxZTb", {
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [wallet.publicKey],
              });

              const balance = res.data.result.value / LAMPORTS_PER_SOL;
              balances[wallet.publicKey] = balance
            }catch(err){

            }
          })
        )
        setWalletAmount(balances);
      }

      getWalletAmount();
  },[wallets])

  return (
    <div className="p-4 space-y-6">
      {mnemonics.length === 0 ? (
        <div className="min-h-screen bg-black text-white px-6 py-12 space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Secret Recovery Phrase</h1>
            <p className="text-lg text-gray-400 mt-2">Save these words in a safe place.</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full max-w-5xl">
            <Input
              placeholder="Enter your secret phrase (or leave blank to generate)"
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-black text-white border border-zinc-700 focus-visible:ring-white"
            />
            <Button
              onClick={generateInitialWallet}
              className="bg-white text-black hover:bg-gray-200 cursor-pointer"
            >
              Generate Wallet
            </Button>
          </div>
        </div>

      ) : (
        <div className="space-y-6">
          <div className="border border-[#212121] py-4 px-6 rounded-lg cursor-pointer">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-2xl font-bold flex items-center cursor-pointer no-underline hover:no-underline">Your Secret Phrase</AccordionTrigger>
                <AccordionContent  onClick={()=>handleCopy(mnemonics)}>
                  <div>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {mnemonics.map((word, index) => (
                        <span
                          key={index}
                          className="bg-[#141414] p-4 rounded text-xl text-white"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 text-md text-[#828282] hover:text-gray-200 flex gap-2 items-center">
                      <span>
                        <Copy />
                      </span>
                      <span>
                        Click Anywhere To Copy
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">🔐 Your Solana Wallets</div>
            <div className="flex gap-2">
              <Button onClick={addWallet}>Add Wallet</Button>
              <Button variant="destructive" onClick={clearWallets}>
                Clear Wallets
              </Button>
            </div>
          </div>

          {wallets.map((wallet, index) => (
            <div
              key={index}
              className="border border-[#212121] rounded-xl space-y-2 text-white "
            >
              <div className="flex justify-between p-6">
                <div>
                  <h3 className="font-semibold text-2xl pb-4">Wallet {index + 1}</h3>
                </div>
                <div>
                  <DeleteWalletIndex deleteWalletAtIndex={deleteWalletAtIndex} index={index}/>
                </div>
              </div>
              <div className="bg-[#171717] p-6 rounded-t-2xl ">
                <div className="pb-2">
                  <label className="font-semibold text-lg">Public Key</label>
                  <div className="flex justify-between">
                    <p className="break-all py-2 text-[#cccccc] hover:text-white cursor-pointer" onClick={()=>handlePublicCopy(wallet.publicKey)}>{wallet.publicKey}</p>
                    <div className="text-white">
                      {walletAmount[wallet.publicKey]} SOL
                    </div>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-lg">Private Key</label>
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-[#cccccc] hover:text-white cursor-pointer" onClick={()=>handlePrivateCopy(wallet.privateKey)}>
                      {visibleWallets[index] ? <p className="break-all" >{wallet.privateKey.slice(0,55)}...</p>: <p>{"•".repeat(70)}</p> }
                    </div>
                    <div className="text-[#cccccc]">
                      <button onClick={()=>handleVisible(index)} className="cursor-pointer">
                        {visibleWallets[index] ? <Eye size={15}/> : <EyeOff size={15}/>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
