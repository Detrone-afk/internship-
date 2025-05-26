import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";
import Booking from '@/components/Booking/Booking';

export default async function Home() { 
  const { userId } = await auth(); 

  if (!userId) {
    redirect("/sign-in"); // It will redirect to sign-in if not logged in
  }

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        
        {/*the expansion without affecting map */}
        <div className="md:h-auto">
          <Booking />
        </div>

        <div className="col-span-2 h-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.675387229423!2d77.13039097446091!3d28.81653777556481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b1923ada2e3%3A0x1169930518add2fe!2sNational%20Institute%20of%20Technology%20Delhi!5e1!3m2!1sen!2sin!4v1740490149270!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
