// app/blog/[slug]/page.jsx
import "@styles/BlogPost.scss";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import QuizForm from '../../../components/QuizForm';

async function getPost(slug) {
  // Get the content of the post
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse the post metadata and content
  const { data, content } = matter(fileContents);

  // Convert the post content to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...data,
    content: contentHtml,
    slug,
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
      <div className="navbar-padding-protection"></div>
      <div className="container p-0">
        <section className="gradient-border d-flex flex-column align-items-center">
          <h1>{post.title}</h1>
          {post.postImage && 
            <img 
              src={post.postImage} 
              alt={`Image de ${post.title}`} 
              className="post-img img-fluid mx-auto m-4"
            />
          }
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          {params.slug === 'quiz-trouvez-votre-mouvement-artistique' && <QuizForm />}
        </section>
      </div>
      <Footer />
    </>
  );
};

export async function generateStaticParams() {
  // Get all post slugs
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  // Return the post slugs
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default BlogPost;
