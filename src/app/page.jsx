import Image from "next/image";
import App from "@/components/test";
import { 
  Banner,
  Products,
  About,
  Desc,
  CTA
} from "@/components/home";

export const metadata = {
  title: "Kanakdhara Jewellers",
  icons: {
    icon: '/icon.png'
  }
};

export default function Home() {
  return (
    <div>
      <Banner />
      <Products />
      <About />
      <Desc />
      <CTA />
    </div>
  );
}
