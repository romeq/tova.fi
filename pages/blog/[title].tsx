import getBlogContent, { getAllPosts } from "@/lib/blog-content"
import Head from "next/head"
import { useEffect } from "react"
import BlogWrapper from "../../components/blog/BlogWrapper/BlogWrapper"

export async function getStaticPaths() {
    let paths = getAllPosts()
    paths.push({
        params: {
            title: "latest",
        },
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: { title: string } }) {
    let title = params.title
    if (title === "latest") {
        const posts = getAllPosts()
        if (posts.length > 0) {
            title = posts[posts.length - 1].params.title
        }
    }

    return {
        props: {
            post: await getBlogContent(title),
        },
    }
}

export default function BlogPost({ post }: { post: any }) {
    useEffect(() => {
        if (!post) window.location.assign("/404")
    }, [post])

    return (
        <BlogWrapper>
            <Head>
                <title>TVA Blog</title>
            </Head>
            <div dangerouslySetInnerHTML={{ __html: post?.contentHtml }}></div>
        </BlogWrapper>
    )
}
