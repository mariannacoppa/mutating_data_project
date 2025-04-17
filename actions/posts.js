'use server';
import {storePost} from "@/lib/posts";
import {redirect} from "next/navigation";

export async function createPost(prevState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Please enter a title');
    }

    if (!content || content.trim().length === 0) {
        errors.push('Please enter a content');
    }

    if (!image || image.size === 0) {
        errors.push('Please enter an image');
    }

    if (errors.length > 0) {
        return { errors };
    }

    await storePost({
        imageUrl: '',
        title,
        content,
        userId: 1
    });

    redirect('/feed');
}