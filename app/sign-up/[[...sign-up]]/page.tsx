import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-gray-100 dark:bg-gray-900">
      {/* Left: SignUp Widget */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen bg-white/90 dark:bg-gray-800/90 p-0 m-0">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <Image src="/jeep.png" width={90} height={30} alt="Logo" className="mb-4 mt-10 md:mt-0" />
          <h1 className="text-1xl md:text-2xl font-bold mb-4 text-center text-[#182962] dark:text-white">
            Create your Account!
          </h1>
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
                card: "shadow-none bg-transparent",
              },
            }}
          />
        </div>
      </div>

      {/* Right: Image & Text */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 min-h-screen relative p-0 m-0">
        <Image
          src="/web.png"
          alt="Jeep"
          fill
          className="object-cover object-right w-full h-full absolute inset-0 z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-8">
          <Image src="/detrone.png" width={160} height={54} alt="Detrone Logo" className="mb-3" />
          <h1 className="text-2xl lg:text-3xl font-bold text-white drop-shadow mb-2 text-center">
            Join Detrone Today
          </h1>
          <p className="text-base xl:text-xl text-white drop-shadow text-center font-medium">
            Sign up to start your journey with Detrone.<br />
            Enjoy exclusive features, manage your bookings, and more!
          </p>
        </div>
      </div>
    </div>
  );
}