// pages/index.js

import Head from 'next/head'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts,Post } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

function PostCard(post:Post) {
  return (
    <div className="mb-6">
      <h2 className="text-lg">
        <Link href={post.url}>
          <div className="text-blue-700 hover:text-blue-900">{post.title}</div>
        </Link>
      </h2>
      <time dateTime={post.date} className="block text-sm text-slate-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </div>
  )
}

//type PostType=InferGetStaticPropsType<typeof getStaticProps>

export default async function Page() {
  const posts=(await getStaticProps()).props.posts;
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1 className="mb-8 text-3xl font-bold">Contentlayer Blog Example</h1>

      {posts.map((post:Post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}