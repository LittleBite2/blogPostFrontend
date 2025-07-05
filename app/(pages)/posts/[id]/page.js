"use client"
import axios from 'axios'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function page({ params }) {
    const { id } = use(params)
    const [post, setPost] = useState({})
    const router = useRouter()
    // console.log(id)

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${id}`)
                // console.log(response.data)
                setPost(response.data)
            } catch (error) {
                console.log("error fetching post", error)
            }
        }
        fetchPost()
    }, [id])

    async function handleDelete(e) {
        try {
            e.preventDefault()
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`)
            // console.log("Post deleted successfully")
            toast.success("Post deleted successfully")
            router.push("/")
        } catch (error) {
            console.log("error found", error)
            toast.error("error found")
        }
    }
   

    return (
        <div className='max-w-3xl mx-auto'>
            <Link href="/">
                <div className='flex gap-2 items-center text-gray-400 hover:text-white mb-5'>
                    <ArrowLeft size={18} />
                    Back to all post
                </div>
            </Link>
            <div className='card'>
                <h2 className='text-3xl font-semibold text-white mb-3'>{post?.title}</h2>
                <p className='text-gray-400 mb-3'>By {post?.author}</p>
                <p className='text-gray-400 mb-3'>{post?.description}</p>
                <div className='flex items-center gap-3'>
                    <Link href={`/edit/${post?._id}`}>
                        <button className='btn-secondary flex item-center gap-2'><Pencil />Edit</button>
                    </Link>
                    <button onClick={handleDelete} className='btn-danger flex item-center gap-2'><Trash2 />Delete</button>
                </div>
            </div>
        </div>
    )
}

export default page
