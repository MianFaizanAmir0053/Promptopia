"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

export const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(null);
  const router = useRouter();

  const steps = [
    {
      target: "#logoText",
      content: "Welcome to Promptopia",
      disableBeacon: true,
    },
    {
      target: "#openDropdown",
      content:
        "Click to view your profile (where you can edit and delete your prompts) and create your prompt",
    },
    {
      target: "#toProfile",
      content:
        "Click to view your profile where you can edit and delete your prompts",
    },
  ];

  useEffect(() => {
    const getProvidersData = async () => {
      const providersData = await getProviders();
      setProviders(providersData);
    };
    getProvidersData();
  }, []);
  return (
    <>
      {session?.user && (
        <Joyride
          steps={steps}
          styles={{
            options: {
              width: 200,
            },
          }}
          continuous={true}
          showSkipButton={true}
        />
      )}
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href={"/"} className="flex gap-2 flex-center">
          <Image
            id="logoText"
            src="/assets/images/logo.svg"
            width={30}
            height={30}
            alt="logo"
          />
          <p className="logo_text">Promptopia</p>
        </Link>
        <div className="sm:flex hidden">
          {
            Cookies.get("isAdmin") ? (
              <button onClick={() => {
                Cookies.remove("isAdmin");
                signIn(
                  providers.google.id,
                )
              }} className="black_btn mr-3">
                Become Guest
              </button>
            ) : <button onClick={() => {
              Cookies.set("isAdmin", "true", { expires: 1, path: "/" });
              signIn(
                providers.google.id,
              )
              console.log(providers.google.id);
            }} type="button" className="outline_btn mr-3">Become Admin</button>
          }

          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button
                onClick={() => {
                  type = "button"
                  className = "outline_btn"
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
              <Link href="/profile" className="profile">
                <Image
                  src={session?.user?.image}
                  width={37}
                  height={37}
                  alt="profile"
                  id="toProfile"
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
                id="openDropdown"
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
                      setToggleDropdown(() => false);
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
    </>
  );
};
