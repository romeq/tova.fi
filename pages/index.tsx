import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.scss"
import { motion, MotionConfig } from "framer"
import { loadScrobble, Scrobble } from "../lib/lastfm-scrobble"
import Image from "next/image"
import { ReactElement, useMemo, useRef, useState } from "react"
import { CaretDownFill } from "react-bootstrap-icons"

export async function getServerSideProps() {
    const latestScrobble = await loadScrobble()
    return { props: { lastScrobble: latestScrobble } }
}

interface LatestPosts {
    title?: string
    shortDescription?: string
    links?: {
        text: string
        link: string
        icon?: ReactElement
    }[]
}

const latestBlogPosts: LatestPosts[] = [
    {
        title: "Usva is now in production!",
        shortDescription:
            "I'm glad to announce that my most recent project Usva was released to production recently.",
        links: [
            {
                text: "Website",
                link: "https://usva.cc",
            },
            {
                text: "Backend-repository",
                link: "https://github.com/romeq/usva",
            },
            {
                text: "Frontend-repository",
                link: "https://github.com/romeq/usva-ui",
            },
        ],
    },
]

export default function Home(props: { lastScrobble: Scrobble | undefined }) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [musicPopoverShown, setMusicPopoverShown] = useState(false)
    const musicPopover = useRef<HTMLDivElement>(null)
    let timeout: NodeJS.Timeout | undefined = useMemo(() => undefined, [])

    function clickHandler() {
        setMusicPopoverShown((prev) => !prev)
    }

    return (
        <MotionConfig reducedMotion="user" transition={{ duration: 0.5, bounce: 0.55, type: "spring" }}>
            <Head>
                <title>Touko Valkonen - Personal website</title>
                <meta name="title" content="Touko Valkonen - Personal website" />
                <meta
                    name="description"
                    content='This website works as my "portfolio" for recruitment process as well as a public blog where I share my frustration. You might find something interesting, too.'
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tova.fi/" />
                <meta property="og:title" content="Touko Valkonen - Personal website" />
                <meta
                    property="og:description"
                    content='This website works as my "portfolio" for recruitment process as well as a public blog where I share my frustration. You might find something interesting, too.'
                />

                <meta property="twitter:url" content="https://tova.fi/" />
                <meta property="twitter:title" content="Touko Valkonen - Personal website" />
                <meta
                    property="twitter:description"
                    content='This website works as my "portfolio" for recruitment process as well as a public blog where I share my frustration. You might find something interesting, too.'
                />
            </Head>
            <div className={styles.main}>
                <div className={styles.top}>
                    <motion.div
                        animate={{
                            transform:
                                imageLoaded && props.lastScrobble ? "translateY(0px)" : "translateY(-20px)",
                            opacity: imageLoaded && props.lastScrobble ? 1 : 0,
                        }}
                        className={styles.recentlyListened}
                    >
                        <Link target="_blank" href={props.lastScrobble?.link || ""}>
                            <Image
                                onLoadingComplete={() => setImageLoaded(true)}
                                alt="album icon"
                                src={props.lastScrobble?.image || ""}
                                width={30}
                                height={30}
                            />
                        </Link>
                        <div className={styles.meta}>
                            <div onClick={clickHandler} className={styles.note}>
                                <span>
                                    {props.lastScrobble?.currentlyPlaying
                                        ? "Currently playing"
                                        : "Recently listened"}
                                </span>
                                <div className={styles.questionmark}>
                                    <CaretDownFill />
                                </div>
                            </div>
                            <motion.div
                                animate={{
                                    opacity: musicPopoverShown ? 1 : 0,
                                    transform: musicPopoverShown
                                        ? "translateY(0px) scaleX(1)"
                                        : "translateY(-35px) scaleX(0)",
                                }}
                                ref={musicPopover}
                                initial={false}
                                className={styles.musicpopover}
                                onMouseEnter={() => {
                                    clearTimeout(timeout)
                                }}
                            >
                                For more information check my{" "}
                                <Link target="_blank" href="https://last.fm/user/tokeeee">
                                    last.fm profile
                                </Link>
                                !
                                <ul>
                                    {props.lastScrobble?.date ? (
                                        <li>Date: {props.lastScrobble?.date}</li>
                                    ) : (
                                        <></>
                                    )}
                                    <li>Album: {props.lastScrobble?.album}</li>
                                    <li>
                                        <Link target="_blank" href={props.lastScrobble?.link || ""}>
                                            Show track
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                            <p>
                                {props.lastScrobble?.name} By {props.lastScrobble?.artist}
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
                        <Link href="/blog">Blog</Link>
                        <Link href="https://github.com/romeq" target="_blank">
                            GitHub profile
                        </Link>
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
                    <div className={styles.maincontainer}>
                        <div className={styles.maincontainerbox}>
                            <h1>Hi, I&apos;m Touko. </h1>
                            <h4>A brief overview about me</h4>
                            <p>
                                I&apos;m Touko, also widely known by the nickname toke. Now that you&apos;ve
                                got to my website, let me introduce myself! I&apos;m a programming enthusiast
                                with large interest to digging through data and making systems safer. <br />
                                <br />
                                My points of interest vary from time to time, but it&apos;s common for most of
                                them to be related to technical things. I mostly like maths, physics,
                                chemistry and that kind of stuff. I listen to all kinds of music, ranging from
                                the hardest and toughest metal you can imagine to the softest pop you can
                                find. <br /> <br />
                                If you think we share certain interests or want to talk regardless, feel free
                                to contact me (preferrably at touko@testausserveri.fi)!
                            </p>
                        </div>
                        <div>
                            <div className={styles.news}>
                                {latestBlogPosts.map((post, key) => (
                                    <>
                                        <div key={key} className={styles.box}>
                                            {post.title ? <h3>{post.title}</h3> : <></>}
                                            {post.shortDescription ? <p>{post.shortDescription}</p> : <></>}
                                            <div className={styles.links}>
                                                {post.links?.map((link, linkKey) => (
                                                    <Link key={linkKey} href={link.link}>
                                                        <>
                                                            {link.text} {link.icon ? link.icon : <></>}
                                                        </>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        {key !== latestBlogPosts.length - 1 ? <hr /> : <></>}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </MotionConfig>
    )
}
