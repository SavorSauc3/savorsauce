import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface BucketItem {
    Key: string;
    Size: number;
    LastModified: string;
}

export const useBucketContent = () => {
    const router = useRouter();
    const [bucketItems, setBucketItems] = useState<BucketItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin-login');
            return;
        }

        const fetchBucketContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bucket content');
                }

                const data = await response.json();
                setBucketItems(data.results);
            } catch (error) {
                setError('Failed to load bucket content');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBucketContent();
    }, [router]);

    return { bucketItems, loading, error };
};

export default useBucketContent;
