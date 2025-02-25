import { SignIn } from "@clerk/nextjs";
import Image from "next/image";


export default function Page() {
  return (
     <>
        <div>
            <Image src='/web.png' width={900} height={500} alt='Jeep' 
            className="object-contain h-full w-full"/>
            <div className="absolute top-24 left-20">
                <SignIn />
            </div>
            
        </div>
        </>
  );
}
