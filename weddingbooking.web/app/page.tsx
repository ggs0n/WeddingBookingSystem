import Image from "next/image";
import Navbar from "@/components/navbar";
import HeroHeader from "@/components/heroheader";
import HeroDesc from "@/components/herodescription";
import Venus from "@/components/venus";

export default function Home() {
  return (
    <div>
          <HeroHeader></HeroHeader>
          <HeroDesc></HeroDesc>
          <Venus></Venus>
    </div>
  );
}
