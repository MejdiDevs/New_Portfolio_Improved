import { supabase } from '../supabase';

/**
 * Highlight Service - Fetches highlights from Supabase for the main website
 */

export const fetchAllHighlights = async () => {
    try {
        const { data, error } = await supabase
            .from("Achievements")
            .select("*")
            .order("order", { ascending: true });

        if (error) {
            console.error("Error fetching achievements:", error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error("Error fetching achievements:", err);
        return [];
    }
};

