// app/blog/page.jsx
import "@styles/Blog.scss";
import "@styles/StaticPage.scss";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Footer from '@components/Footer';
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
      <div className="navbar-padding-protection"></div>
      <div className="container p-0">
        <section className="gradient-border">
          <h1 className="d-none">Blog</h1>
          <ul className='row d-flex justify-content-center gap-4 p-0'>
            {posts.map((post) => (
              <li key={post.slug} className="col-4 blog-card p-0">
                <a 
                  href={`/blog/${post.slug}`} 
                  className='d-flex flex-column justify-content-around'
                >
                  <img 
                    src={post.blogImage} 
                    alt="Image de l'article" 
                    className="img-fluid mx-auto" 
                  />
                  <p><strong>{post.title}</strong></p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
