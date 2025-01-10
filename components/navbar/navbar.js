"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import DateTime from "../date-time/date-time";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <>
      <nav className={styles["nav-bar"]}>
        <ul className={styles["nav-menu"]}>
          <li className={pathName === "/" ? styles["active"] : ""}>
            <Link href="/">HOME</Link>
          </li>
          <li className={pathName === "/favourites" ? styles["active"] : ""}>
            <Link href="/favourites">FAVOURITE</Link>
          </li>
          <li
            className={pathName === "/recent-searches" ? styles["active"] : ""}
          >
            <Link href="/recent-searches">RECENT SEARCHES</Link>
          </li>
        </ul>
        <DateTime />
      </nav>
    </>
  );
};

export default Navbar;
