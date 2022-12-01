import { MotionConfig } from "framer"
import styles from "../styles/Projects.module.scss"

export default function Projects() {
    return (
        <MotionConfig
            transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.1,
            }}
        >
            <div className={styles.main}>
                <h1>My projects</h1>
                <p></p>
            </div>
        </MotionConfig>
    )
}
