import Img from "@/assets/notfound.png";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Not Found",
  description: "Composition Book 404 Page",
};

const Notfound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-sandwisp p-10">
      <div className="max-w-[800px] w-full rounded-xl shadow grid md:grid-cols-2 bg-white">
        <div className="flex items-center justify-center flex-col p-10">
          <div className="text-4xl ">404</div>
          <div className="text-4xl">Not Found!</div>
        </div>
        <div className="pt-10 hidden md:block">
          <Image src={Img} alt="Notfund" width={400} height={200} className="w-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Notfound;
