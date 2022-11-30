import Link from "next/link"
import styles from "../styles/NotFound.module.scss"
import { motion } from "framer"

export default function NotFound() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                transform: "scale(0.95)",
            }}
            animate={{
                opacity: 1,
                transform: "scale(1)",
            }}
            className={styles.main}
        >
            <h1>404</h1>
            <p>Oops! This page was not found or has been deleted. </p>

            <div className={styles.buttons}>
                <Link href="/">Navigate to root</Link>
                <Link href="/blog/post@latest">Read my latest blog post</Link>
            </div>
        </motion.div>
    )
}
