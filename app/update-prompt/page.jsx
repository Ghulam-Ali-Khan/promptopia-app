import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/router';

import Form from '@components/Form';

const UpdatePrompt = () => {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const promptId = router.query.id;
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }

        getPromptDetails();

    }, [router.query.id])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const promptId = router.query.id;

        if (!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response?.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {typeof window !== 'undefined' && (
                <Form
                    type="Edit"
                    post={post}
                    setPost={setPost}
                    submitting={submitting}
                    handleSubmit={updatePrompt}
                />
            )}
        </Suspense>
    )
}

export default UpdatePrompt;
