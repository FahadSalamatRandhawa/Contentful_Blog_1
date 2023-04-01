// pages/posts/[slug].js

import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPosts,Post } from 'contentlayer/generated'
import { PageProps } from '@/.next/types/app/page'
import { metadata } from '@/app/layout'

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(url:string) {
  const post = allPosts.find((post) => post._raw.flattenedPath === url)
  //console.log(params.url);
  return {
    props: {
      post,
    },
  }
}

async function PostLayout({params}:{params :any}) {
  const post=(await getStaticProps(params.url)).props.post
  
  return (
    <>
      <article className="mx-auto max-w-2xl py-16">
        <div className="mb-6 text-center">
          <Link href="/">
            <div className="text-center text-sm font-bold uppercase text-blue-700">Home</div>
          </Link>
        </div>
        {
          post?
          <>
          <div className="mb-6 text-center">
                    <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
                    <time dateTime={post.date} className="text-sm text-slate-600">
                      {format(parseISO(post.date), 'LLLL d, yyyy')}
                    </time>
                  </div>
                  <div className="cl-post-body" dangerouslySetInnerHTML={{ __html: post.body.html }} />
          </>
        :null
        }
      </article>
    </>
  )
}

export default PostLayout