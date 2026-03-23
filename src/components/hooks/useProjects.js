import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabase';

/**
 * Custom hook for fetching projects from Supabase
 * @param {Object} options - Configuration options
 * @param {boolean} options.featured - Filter by featured status
 * @param {number} options.limit - Limit number of results
 * @param {boolean} options.single - Fetch a single project by slug
 * @param {string} options.slug - Project slug when single is true
 * @returns {Object} - { projects, isLoading, error, retry }
 */
export const useProjects = ({ featured = false, limit = null, single = false, slug = null } = {}) => {
    const [projects, setProjects] = useState(single ? null : []);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMounted = useRef(true);

    const fetchProjects = async () => {
        setIsLoading(true);
        setError(null);

        try {
            let query = supabase.from('Projects').select('*');

            // Filter out hidden projects (only show where hidden is false or null)
            query = query.or('hidden.is.null,hidden.eq.false');

            if (single && slug) {
                query = query.eq('slug', slug).single();
            } else {
                if (featured) {
                    query = query.eq('featured', true);
                }
                query = query.order('order', { ascending: true });
                if (limit) {
                    query = query.limit(limit);
                }
            }

            const { data, error: queryError } = await query;

            if (queryError) throw queryError;

            if (isMounted.current) {
                setProjects(data || (single ? null : []));
                setError(null);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
            if (isMounted.current) {
                setError(err);
                setProjects(single ? null : []);
            }
        } finally {
            if (isMounted.current) {
                // Add a small delay to prevent flickering on fast connections
                setTimeout(() => {
                    if (isMounted.current) setIsLoading(false);
                }, single ? 0 : 300);
            }
        }
    };

    useEffect(() => {
        fetchProjects();

        return () => {
            isMounted.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featured, limit, single, slug]);

    const retry = () => {
        fetchProjects();
    };

    // Return project (singular) when single=true, projects (plural) otherwise
    if (single) {
        return { project: projects, isLoading, error, retry };
    }
    
    return { projects, isLoading, error, retry };
};

