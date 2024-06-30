// app/blog/page.jsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Navbar from '@components/Navbar';

async function getPosts() {
  // Get all posts from the posts directory
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  // Get the content of each post
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    // Return the post data
    return {
      slug: filename.replace(/\.md$/, ''),
      ...data,
    };
  });

  // Sort posts by order
  posts.sort((a, b) => (a.order || 0) - (b.order || 0));

  return posts;
}

const Blog = async () => {
  const posts = await getPosts();

  return (
    <>
      <title>Blog - Brekor</title>
      <meta name="description" content="Découvrez les derniers articles de notre blog." />
      <meta name="keywords" content="blog, articles" />

      <Navbar />
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
