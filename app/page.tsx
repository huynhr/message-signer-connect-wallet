"use client";

import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount, useSignMessage, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { useEthersSigner } from "./providers";

export default function Home() {
  const [message, setMessage] = useState("");
  const { address } = useAccount();
  // const { data, error, isLoading, signMessage, variables } = useSignMessage();
  const signer = useEthersSigner({ chainId: 5 });
  const [copied, setCopied] = useState(false);
  const [signature, setSignature] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignMessage = async () => {
    setIsLoading(true);
    const payload = ethers.utils.arrayify(message);

    console.log({ payload, message });
    const signatureResponse = await signer?.signMessage(payload);

    if (signatureResponse) setSignature(signatureResponse);

    setIsLoading(false);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5 p-24">
      <Web3Button />
      <div className="text-lg font-bold">{address}</div>
      <div className="flex items-center justify-center space-x-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-10"
        />
        <button
          onClick={handleSignMessage}
          className="p-2 rounded-md uppercase shadow-xl bg-blue-400 text-white hover:scale-105"
        >
          {isLoading ? "loading..." : "sign message"}
        </button>
      </div>
      {signature && (
        <div className="relative">
          {copied && (
            <div className="absolute -top-[45px] left-[95%] bg-green-500 text-white p-2 rounded-md uppercase">
              copied
            </div>
          )}
          <div
            className="cursor-pointer hover:opacity-50"
            onClick={() =>
              navigator.clipboard
                .writeText(signature as string)
                .then(() => setCopied(true))
            }
          >
            {signature}
          </div>
        </div>
      )}
    </main>
  );
}
