'use client'; // This marks this file as a Client Component
import React from 'react';
import UsersList from "@/app/components/UsersList";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter();
    const onButtonCLick = ()=> {
        router.push('/');
      }
  return (
      <div
          className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center">
              <UsersList/>
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                  <button
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                      onClick={() => onButtonCLick()}
                  >
                      Back to home
                  </button>
              </div>
          </main>
      </div>
);
};

export default Page;