"use client"
import axios from 'axios'
import { ArrowLeft, Pencil } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function EditForm({ initialPost }) {
    // console.log(initialPost, "initial post")
    const [formData, setFormData] = useState({
        title: initialPost.title,
        author: initialPost.author,
        description: initialPost.description
    })

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData, "form data")
        try {
            const id = initialPost._id
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`, formData)
            // console.log("Post updated successfully")
            toast.success("Post updated successfully")
            router.push("/")
        } catch (error) {
            console.log("doesnt updated", error)
            toast.error("error found")
        }
    }

    return (
        <div>
            <div className='mxa-w-3xl mx-auto'>
                <div className='card'>
                    <label className='mb-2 '>Title<span className='text-red-600'>*</span></label><br />
                    <input type='text' id='title' placeholder='Enter Post title' name='title' value={formData.title} onChange={handleChange} className='input mb-5'></input>

                    <label className='mb-2 '>Author<span className='text-red-600'>*</span></label><br /><br />
                    <input type='text' id='author' name='author' value={formData.author} onChange={handleChange} placeholder='Author Name' className='input mb-5'></input>

                    <label className='mb-2 '>Description<span className='text-red-600'>*</span></label><br /><br />
                    <input type='text' id='description' name='description' value={formData.description} onChange={handleChange} placeholder='Enter description' className='input mb-5'></input>
                    <div className='flex gap-2 items-center'>
                        <button onClick={handleSubmit} className="btn btn-primary flex gap-x-2 items-center "><Pencil />Edit Post</button>
                        <button onClick={() => router.back()} className="btn btn-secondary flex gap-x-2 items-center "><ArrowLeft />Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditForm
