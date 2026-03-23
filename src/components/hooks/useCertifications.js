import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabase';

/**
 * Custom hook for fetching certifications from Supabase
 * @returns {Object} - { certifications, isLoading, error, retry }
 */
export const useCertifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMounted = useRef(true);

    const fetchCertifications = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error: queryError } = await supabase
                .from('Certifications')
                .select('*')
                .order('order', { ascending: true });

            if (queryError) throw queryError;

            if (isMounted.current) {
                setCertifications(data || []);
                setError(null);
            }
        } catch (err) {
            console.error('Error fetching certifications:', err);
            if (isMounted.current) {
                setError(err);
                setCertifications([]);
            }
        } finally {
            if (isMounted.current) {
                // Add a small delay to prevent flickering on fast connections
                setTimeout(() => {
                    if (isMounted.current) setIsLoading(false);
                }, 300);
            }
        }
    };

    useEffect(() => {
        fetchCertifications();

        return () => {
            isMounted.current = false;
        };
    }, []);

    const retry = () => {
        fetchCertifications();
    };

    return { certifications, isLoading, error, retry };
};

