import { getAllPosts } from "@/lib/blog-content"
import styles from "../../styles/Blogs.module.scss"
import { motion } from "framer"

export function getStaticProps() {
    const posts = getAllPosts().map((f) => f.params.title)
    return {
        props: {
            posts,
        },
    }
}

function Posts({ posts }: { posts: any[] }) {
    return (
        <>
            <p>
                Below are my most recent blog posts. The topics range from the most nerdy stuff to my personal
                life.
            </p>
            <ul>
                {posts.map((post, index) => {
                    return (
                        <li key={index}>
                            <a href={`/blog/${post}`}>{post}</a>
                            <p>In this blog i do this and that and explain why something is necessary.</p>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

function NoPosts() {
    return <>There is no blog posts at the moment, but I&apos;m working on one!</>
}

export default function BlogListing({ posts }: { posts: any[] }) {
    return (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className={styles.main}>
            <h1>My posts</h1>
            {posts.length > 0 ? <Posts posts={posts} /> : <NoPosts />}
        </motion.div>
    )
}
