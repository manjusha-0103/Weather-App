import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Navebar from "./components/navebar";
export default function Home() {
  return (
    <main className={styles.main}>
     <Navebar/>
      <div >
        <div>
        <h1>🌦️⛅🌞🌤️                   🌦️⛅🌞🌤️</h1>
          <h1>Welcome here</h1>
          <h1>⛈️🌩️🌪️🌨️🌧️</h1>
          <Link href = '/Search'><h2>Go for Checking current weather of any City 👉</h2></Link>
        </div>

      </div>
    </main>
  );
}
