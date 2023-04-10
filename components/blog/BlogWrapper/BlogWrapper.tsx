import styles from "./BlogWrapper.module.scss"
import hljs from "highlight.js"
import { useEffect } from "react"
import { motion } from "framer"

export default function BlogWrapper({ children }: { children: JSX.Element[] }) {
    useEffect(() => hljs.highlightAll(), [])
    return (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className={styles.main}>
            {children}
        </motion.div>
    )
}
