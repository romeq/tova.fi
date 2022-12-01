import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.scss"
import { motion, MotionConfig } from "framer"
import { loadScrobble, Scrobble } from "../lib/lastfm-scrobble"
import Image from "next/image"
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react"
import { CaretDownFill } from "react-bootstrap-icons"

export async function getStaticProps() {
    return { props: { lastScrobble: await loadScrobble() } }
}

export default function Home(props: { lastScrobble: Scrobble }) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [musicPopoverShown, setMusicPopoverShown] = useState(false)
    const musicPopover = useRef<HTMLDivElement>(null)
    let timeout: NodeJS.Timeout | undefined = useMemo(() => undefined, [])

    function clickHandler() {
        setMusicPopoverShown((prev) => !prev)
    }

    return (
        <MotionConfig transition={{ duration: 0.4, bounce: 0.4, type: "spring" }}>
            <Head>
                <title>tova.fi</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.top}>
                    <motion.div
                        animate={{
                            transform: imageLoaded ? "translateY(0px)" : "translateY(-20px)",
                            opacity: imageLoaded ? 1 : 0,
                        }}
                        initial={false}
                        className={styles.recentlyListened}
                    >
                        <Link target="_blank" href={props.lastScrobble.link}>
                            <Image
                                onLoadingComplete={() => setImageLoaded(true)}
                                alt="album icon"
                                src={props.lastScrobble.image}
                                width={30}
                                height={30}
                            />
                        </Link>
                        <div className={styles.meta}>
                            <div onClick={clickHandler} className={styles.note}>
                                <span>Recently listened</span>
                                <div className={styles.questionmark}>
                                    <CaretDownFill />
                                </div>
                            </div>
                            <motion.div
                                animate={{
                                    opacity: musicPopoverShown ? 1 : 0,
                                    transform: musicPopoverShown
                                        ? "translateY(0px) scaleY(1)"
                                        : "translateY(-75px) scaleY(0)",
                                }}
                                ref={musicPopover}
                                initial={false}
                                className={styles.musicpopover}
                                onMouseEnter={() => {
                                    clearTimeout(timeout)
                                }}
                            >
                                This data was requested from my{" "}
                                <Link target="_blank" href="https://last.fm/user/tokeeee">
                                    last.fm profile
                                </Link>
                                .
                                <ul>
                                    <li>Date: {props.lastScrobble.date}</li>
                                    <li>Album: {props.lastScrobble.album}</li>
                                    <li>
                                        <Link target="_blank" href={props.lastScrobble.link}>
                                            Show track
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                            <p>
                                {props.lastScrobble.name} By {props.lastScrobble.artist}
                            </p>
                        </div>
                    </motion.div>
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
                    <h1>Hi, I&apos;m Touko. </h1>
                    <div className={styles.classes}>
                        <div className={styles.class}>
                            <h4>A brief overview about me</h4>
                            <p>
                                I&apos;m Touko, also widely known with the nickname toke. My biggest interests
                                are often the most technical or theorethical things- therefore, I mostly like
                                maths, programming, chemistry and psychology. If you think we share certain
                                interests or want to talk regardless, feel free to contact me!{" "}
                                <Link href="/about">You can read more about me here.</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </MotionConfig>
    )
}
