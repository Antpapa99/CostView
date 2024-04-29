'use client';
import { useState } from "react";
import CommuneDropdownItem from "./ui/dashboard/commune/communedropdown";
import { useRouter } from "next/navigation";
import Page from "@/app/dashboard/commune/page"
import Link from "next/link";
import router from "next/router";


export default function Home() {
  return (
    <>
    <div className="flex grow h-screen bg-gray-900">
    <div>
      <Link href={'/dashboard/commune'} >To dashboard</Link>
    </div>
    </div>
    </>
  )
};