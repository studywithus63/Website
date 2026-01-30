
import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
  try {
    const url = new URL(request.url);
    const originalSlug = url.searchParams.get('slug');
    const formData = await request.formData();

    const title = formData.get('title');
    const newSlug = formData.get('slug');
    const author = formData.get('author');
    const description = formData.get('description');
    const tableOfContents = formData.get('tableOfContents');
    const heroImages = formData.getAll('heroImage[]'); // Get all hero image URLs
    const imageAlt = formData.get('imageAlt');
    const content = formData.get('content');

    if (!originalSlug) {
      return new Response(JSON.stringify({ message: 'Original slug is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!title || !newSlug || !author || !description || !content) {
      return new Response(JSON.stringify({ message: 'All required fields must be filled.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const blogPostDir = path.resolve(process.cwd(), 'src/content/blog');
    const originalFilePath = path.join(blogPostDir, `${originalSlug}.md`);
    const newFilePath = path.join(blogPostDir, `${newSlug}.md`);

    if (!fs.existsSync(originalFilePath)) {
        return new Response(JSON.stringify({ message: 'Post not found.' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    
    const fileContent = fs.readFileSync(originalFilePath, 'utf-8');
    const frontmatterRegex = /^---[\s\S]*?---/;
    const match = fileContent.match(frontmatterRegex);

    if (!match) {
        return new Response(JSON.stringify({ message: 'Invalid post format.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const frontmatter = match[0];
    const pubDateLine = frontmatter.split('\n').find(line => line.startsWith('pubDate:'));
    const pubDate = pubDateLine ? pubDateLine.split('pubDate: ')[1] : new Date().toISOString().split('T')[0];

    const newMarkdownContent = `---
title: "${title}"
slug: "${newSlug}"
description: "${description}"
pubDate: ${pubDate}
author: "${author}"
heroImage:
${heroImages.map(img => `  - "${img}"`).join('\n')}
imageAlt: "${imageAlt}"
tableOfContents: "${tableOfContents}"
---

${content}
`;

    // If the slug has changed, rename the file
    if (originalSlug !== newSlug) {
        fs.renameSync(originalFilePath, newFilePath);
    } else {
        fs.writeFileSync(originalFilePath, newMarkdownContent);
    }

    return new Response(JSON.stringify({ message: 'Post updated successfully!', slug: newSlug }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error updating post:', error);
    return new Response(JSON.stringify({ message: 'Error updating post: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
