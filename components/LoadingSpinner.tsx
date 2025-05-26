export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
  {/* 
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  */}
  <video
    src="/loading.webm"
    autoPlay
    loop
    muted
    className="h-20 w-20 object-contain"
    aria-label="Loading..."
  >
   {/* <img src="/loading.gif" alt="Loading..." className="h-20 w-20 object-contain" />*/}
  </video>
</div>
  );
}