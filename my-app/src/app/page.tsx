'use client';
import { useState } from "react";
import CommuneDropdownItem from "./ui/dashboard/commune/communedropdown";
import { useRouter } from "next/navigation";
import Page from "@/app/dashboard/commune/page"
import Link from "next/link";
import router from "next/router";
import { getServerSideData } from "./lib/data";


export default function Home() {
  return (
    <>
    <div>
    <div>
      <Link href={'/dashboard/commune'} >To dashboard</Link>
    </div>
    </div>
    </>
  )
};