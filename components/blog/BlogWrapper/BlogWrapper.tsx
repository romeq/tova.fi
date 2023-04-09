import styles from "./BlogWrapper.module.scss"
import hljs from "highlight.js"
import { useEffect } from "react"

export default function BlogWrapper({ children }: { children: JSX.Element[] }) {
    useEffect(() => hljs.highlightAll(), [])
    return <div className={styles.main}>{children}</div>
}
