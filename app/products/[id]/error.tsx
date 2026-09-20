"use client";

import { redirect } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="aspect-video rounded border-2 border-red-800 bg-red-200 md:w-1/3">
        <div className="py-5 text-center text-3xl text-red-800">Error</div>
        <div className="mx-auto w-9/12">{error.message}</div>

        <div className="flex h-1/2 items-center justify-center">
          <div
            className="w-fit cursor-pointer select-none rounded bg-red-500 px-3 py-2 text-white"
            onClick={reset}
          >
            Reload
          </div>
        </div>
      </div>
    </div>
  );
}
