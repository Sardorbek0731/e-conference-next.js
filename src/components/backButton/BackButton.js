"use client";

import "./BackButton.css";
import Image from "next/image";
import { icons } from "../../data/data";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  const backPage = () => {
    router.back();
  };

  return (
    <button onClick={backPage} className="backBtn">
      <Image src={icons.leftArrow} alt="Left Arrow" />
      Back
    </button>
  );
}

export default BackButton;
