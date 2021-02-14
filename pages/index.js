import React from 'react'
import Link from 'next/link'

const Home = ({ blogs }) => {
  return (
    <div>
      <h2>最新記事</h2>
      <div>
        {blogs.map((blog) => (
          <React.Fragment key={blog.id}>
            <Link href="/blogs/[id]" as={`blogs/${blog.id}`}>
              <a>
                <h2>{blog.title}</h2>
              </a>
            </Link>
            {blog.tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <span>{tag.name}</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }

  console.log('key', key)

  const res = await fetch(`https://nextjs-jamstack.microcms.io/api/v1/blogs`, key)
  const data = await res.json()

  console.log('data', data)

  return {
    props: {
      blogs: data.contents,
    },
  }
}

export default Home
