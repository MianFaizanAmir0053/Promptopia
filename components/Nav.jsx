"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getProvidersData = async () => {
      const providersData = await getProviders();
      setProviders(providersData);
    };
    getProvidersData();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="logo"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              onClick={() => {
                Cookies.remove("userId");
                signOut()
                  .then(() => router.push("/"))
                  .finally(() => router.push("/"));
              }}
              type="button"
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Image
                  src={`/assets/images/${provider.name.toLowerCase()}.svg`}
                  onClick={() => signIn(provider.id)}
                  width={37}
                  height={37}
                  alt="profile"
                  key={provider.name}
                  className="mr-4 hover:bg-slate-200 transition-all shadow rounded-full  cursor-pointer"
                />
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={session?.user?.image}
              width={30}
              height={30}
              alt="profile"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  My Profile
                </Link>
                <Link
                  className="dropdown_link"
                  href="/create-prompt"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 black_btn w-full"
                  type="button"
                  onClick={() => {
                    toggleDropdown(() => false);
                    Cookies.remove("userId");
                    signOut()
                      .then(() => router.push("/"))
                      .finally(() => router.push("/"));
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Image
                  src={`/assets/images/${provider.name.toLowerCase()}.svg`}
                  onClick={() => signIn(provider.id)}
                  width={37}
                  height={37}
                  alt="profile"
                  key={provider.name}
                  className="mr-4 hover:bg-slate-200 transition-all shadow rounded-full  cursor-pointer"
                />
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
