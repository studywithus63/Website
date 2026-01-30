
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const slug = formData.get("slug")?.toString();
    const description = formData.get("description")?.toString();
    const tableOfContents = formData.get("tableOfContents")?.toString();
    const author = formData.get("author")?.toString();
    const pubDate = formData.get("pubDate")?.toString();
    const heroImage = formData.get("heroImage")?.toString();
    const content = formData.get("content")?.toString();

    if (!title || !slug || !description || !author || !pubDate || !content) {
        return new Response("Missing required fields", { status: 400 });
    }

    const heroImages = heroImage ? heroImage.split('\n').filter(url => url.trim() !== '') : [];

    const markdownContent = `---   
title: "${title}"
slug: "${slug}"
description: "${description}"
pubDate: ${pubDate}
author: "${author}"
${heroImages.length > 0 ? `heroImage:\n${heroImages.map(img => `  - "${img}"`).join('\n')}` : ''}
tableOfContents: "${tableOfContents}"
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
