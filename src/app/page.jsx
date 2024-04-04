import Image from "next/image";
import App from "@/components/test";

export const metadata = {
  title: "Kanakdhara Jewellers",
  icons: {
    icon: '/icon.png'
  }
};

export default function Home() {
  return (
    <div className="t1 text-white h-[100vh] w-full flex justify-center items-center m-auto">
      {/* <App /> */}
      Banner
    </div>
  );
}
