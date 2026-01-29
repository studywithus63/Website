
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Helper function to create a slug from a title
function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const author = formData.get("author")?.toString();
    const pubDate = formData.get("pubDate")?.toString();
    const heroImage = formData.get("heroImage")?.toString();
    const content = formData.get("content")?.toString();

    if (!title || !description || !author || !pubDate || !content) {
        return new Response("Missing required fields", { status: 400 });
    }

    const slug = createSlug(title);

    const markdownContent = `---   
title: "${title}"
description: "${description}"
pubDate: ${pubDate}
author: "${author}"
${heroImage ? `heroImage: "${heroImage}"` : ''}
---

${content}`;

    const { default: fs } = await import('fs/promises');
    const { default: path } = await import('path');

    const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);

    try {
        await fs.writeFile(filePath, markdownContent);
    } catch (err) {
        console.error(err);
        return new Response("Error writing file", { status: 500 });
    }

    return redirect(`/blog/${slug}`);
};
