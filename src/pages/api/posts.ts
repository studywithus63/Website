
import type { APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp } from "../../firebase/server";

const app = getAdminApp();
const db = getFirestore(app);

// Helper function to create the markdown content
const createMarkdownContent = (data: Record<string, any>) => {
    const { title, slug, description, author, pubDate, heroImage, content, status, tableOfContents } = data;
    const heroImages = heroImage ? heroImage.split('\n').filter(url => url.trim() !== '') : [];

    return `---
title: "${title}"
slug: "${slug}"
description: "${description}"
pubDate: ${pubDate}
author: "${author}"
status: "${status}"
${tableOfContents ? `tableOfContents: "${tableOfContents.replace(/"/g, '\'')}"` : ''}
${heroImages.length > 0 ? `heroImage:
${heroImages.map(img => `  - "${img}"`).join('\n')}` : ''}
---

${content}`;
};

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const actionType = formData.get("actionType")?.toString() || 'publish';

    const postData: Record<string, any> = {
        title: formData.get("title")?.toString(),
        slug: formData.get("slug")?.toString(),
        description: formData.get("description")?.toString(),
        tableOfContents: formData.get("tableOfContents")?.toString(),
        author: formData.get("author")?.toString(),
        pubDate: formData.get("pubDate")?.toString(),
        heroImage: formData.get("heroImage")?.toString(),
        content: formData.get("content")?.toString(),
    };

    if (!postData.title || !postData.slug || !postData.description || !postData.author || !postData.pubDate || !postData.content) {
        return new Response("Missing required fields", { status: 400 });
    }

    const { default: fs } = await import('fs/promises');
    const { default: path } = await import('path');

    let directoryPath: string;
    let redirectURL: string;

    switch (actionType) {
        case 'draft':
            postData.status = 'draft';
            directoryPath = path.join(process.cwd(), 'src/content/drafts');
            redirectURL = '/admin';
            break;

        case 'schedule':
            postData.status = 'scheduled';
            const scheduleDate = formData.get("scheduleDate")?.toString();
            if (!scheduleDate) {
                return new Response("Missing schedule date", { status: 400 });
            }
            postData.pubDate = new Date(scheduleDate).toISOString().split('T')[0];
            directoryPath = path.join(process.cwd(), 'src/content/scheduled');
            redirectURL = '/admin';
            break;

        case 'publish':
        default:
            postData.status = 'published';
            directoryPath = path.join(process.cwd(), 'src/content/blog');
            redirectURL = `/blog/${postData.slug}`;
            break;
    }

    try {
        await fs.mkdir(directoryPath, { recursive: true });
    } catch (err) {
        console.error("Error creating directory:", err);
        return new Response("Error creating directory", { status: 500 });
    }

    const markdownContent = createMarkdownContent(postData);
    const filePath = path.join(directoryPath, `${postData.slug}.md`);

    try {
        await fs.writeFile(filePath, markdownContent);
    } catch (err) {
        console.error("Error writing file:", err);
        return new Response("Error writing file", { status: 500 });
    }

    try {
        const postsCol = db.collection('posts');
        await postsCol.doc(postData.slug).set(postData);
    } catch (error) {
        console.error("Error saving post to Firestore:", error);
    }

    return redirect(redirectURL);
};
