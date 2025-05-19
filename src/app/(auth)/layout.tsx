// components/AuthLayout.tsx
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-screen w-full overflow-hidden">

    <Image
      src="/imageMovie2.jpg"
      alt="Background"
      fill
      className="object-cover absolute top-0 left-0 z-0"
      priority
    />
    <div className="absolute w-full inset-0 bg-black/60 z-10" />
    <div className="relative z-20 flex items-center justify-center h-full w-full ">
      {children}
    </div>
  </div>
);

export default Layout;
