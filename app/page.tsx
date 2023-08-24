"use client";

import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

export default function Home() {
  const [nonce, setNonce] = useState("");
  const { address } = useAccount();
  const { data, error, isLoading, signMessage, variables } = useSignMessage();
  const [copied, setCopied] = useState(false);

  const handleSignMessage = async () => {
    signMessage({ message: nonce });
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
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
          className="h-10"
        />
        <button
          onClick={handleSignMessage}
          className="p-2 rounded-md uppercase shadow-xl bg-blue-400 text-white hover:scale-105"
        >
          {isLoading ? "loading..." : "sign message"}
        </button>
      </div>
      {data && (
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
                .writeText(data as string)
                .then(() => setCopied(true))
            }
          >
            {data}
          </div>
        </div>
      )}
    </main>
  );
}
