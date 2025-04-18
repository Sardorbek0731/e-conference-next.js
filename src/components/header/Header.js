"use client";

import "./Header.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { images } from "../../data/data";
import { header } from "../../data/data";

function Header() {
  const router = usePathname();

  const pageNotFound = router !== "/error" && router !== "/login";

  return (
    pageNotFound && (
      <header className={router.length > 1 ? "otherPage" : ""}>
        <Link href="/" className="logo">
          <Image src={images.logo} alt="Logo Icon" />
        </Link>

        <nav>
          {header.map((item, id) => (
            <Link
              className={
                router === "/" + item.title.toLocaleLowerCase() ? "active" : ""
              }
              href={item.to}
              key={id}
            >
              {router.length > 1 ? (
                item.title
              ) : (
                <>
                  <Image src={item.icon} alt="Header Icon" />
                  {item.title}
                </>
              )}
            </Link>
          ))}
        </nav>
      </header>
    )
  );
}

export default Header;
