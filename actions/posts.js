'use server';
import {storePost, updatePostLikeStatus} from "@/lib/posts";
import {redirect} from "next/navigation";
import {uploadImage} from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

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

    let imageUrl;
    try {
        imageUrl = await uploadImage(image);
    } catch (error) {
        throw new Error(
            'Image upload failed, post was not created. Please try again later'
        );
    }

    await storePost({
        imageUrl: imageUrl,
        title,
        content,
        userId: 1
    });

    redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
   await updatePostLikeStatus(postId, 2);
   revalidatePath('/', 'layout');
}