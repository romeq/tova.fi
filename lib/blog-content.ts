import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = "./public/content"

export default async function getBlogContent(title: string) {
    try {
        const fullPath = path.join(postsDirectory, `${title}.md`)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const matterResult = matter(fileContents)
        const processedContent = await remark().use(html).process(matterResult.content)
        const contentHtml = processedContent.toString()
        return {
            title,
            contentHtml,
            ...matterResult.data,
        }
    } catch (e) {
        return null
    }
}

export function getAllPosts() {
    try {
        const fileNames = fs.readdirSync(postsDirectory)
        return fileNames.map((fileName) => {
            return {
                params: {
                    title: fileName.replace(/\.md$/, ""),
                },
            }
        })
    } catch (e) {
        return []
    }
}
