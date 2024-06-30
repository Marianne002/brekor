// app/blog/[slug]/page.jsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Navbar from '@components/Navbar';
import QuizForm from '../../../components/QuizForm'; // Correct import path
import QuizResult from '../../../components/QuizResult'; // Correct import path

async function getPost(slug) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...data,
    content: contentHtml,
  };
}

const BlogPost = async ({ params }) => {
  const post = await getPost(params.slug);

  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.description} />
      <meta name="keywords" content={post.keywords} />

      <Navbar />
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      <QuizForm />
    </>
  );
};

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default BlogPost;
