import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.scss"
import { motion } from "framer"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>tova.fi</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.top}>
                    <motion.div
                        animate={{
                            opacity: 1,
                            transform: "translateY(0px)",
                        }}
                        initial={{
                            opacity: 0.5,
                            transform: "translateY(-20px)",
                        }}
                        className={styles.links}
                    >
                        <Link href="/blog">My blog</Link>
                        <Link href="/about">About</Link>
                        <Link href="/projects">My projects</Link>
                    </motion.div>
                </div>
                <motion.div
                    initial={{
                        transform: "scale(0.95)",
                        opacity: 0,
                    }}
                    animate={{
                        transform: "scale(1)",
                        opacity: 1,
                    }}
                    className={styles.center}
                >
                    <h1>Hi, I&apos;m Touko. Nice to meet you!</h1>
                    <div className={styles.classes}>
                        <div className={styles.class}>
                            <h4>A brief overview about me</h4>
                            <p>
                                I&apos;m Touko, also widely known with the nickname toke. I&apos;m a 15-year
                                old boy located in Finland, more precisely in Espoo. My biggest interest are
                                often the most technical or theorethical things- therefore I mostly like
                                maths, programming, chemistry and psychology. If you think we share certain
                                interests or want to talk regardless, feel free to contact me!{" "}
                                <Link href="/about">You can read more about me here.</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
