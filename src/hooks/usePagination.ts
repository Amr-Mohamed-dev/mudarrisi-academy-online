import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, Dispatch, SetStateAction, useRef, useCallback } from 'react';

type PageSetter = Dispatch<SetStateAction<number>> | ((page: number) => void);

export const usePagination = (
    currentPage: number = 1,
    setCurrentPage: PageSetter,
    totalPages: number = 1
) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    // Use a ref to track if we're currently updating to prevent circular updates
    const isUpdating = useRef(false);
    // Use a ref to track the last page we navigated to
    const lastNavigatedPage = useRef(currentPage);

    // Sync URL with currentPage (when currentPage changes programmatically)
    useEffect(() => {
        // Skip if we're in the middle of an update from URL
        if (isUpdating.current) return;
        
        // Skip if the URL already has the correct page
        const pageFromURL = Number(searchParams.get('page')) || 1;
        if (pageFromURL === currentPage) return;
        
        // Update URL without triggering another state update
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', currentPage.toString());
        
        navigate(`${location.pathname}?${newParams.toString()}`, {
            replace: true,
        });
    }, [currentPage, navigate, location.pathname, searchParams]);

    // Sync currentPage with URL (when URL changes externally)
    useEffect(() => {
        // Skip if we're in the middle of an update from state
        if (isUpdating.current) return;
        
        const pageFromURL = Number(searchParams.get('page')) || 1;
        
        // Only update if the URL page is different from current page
        if (pageFromURL !== currentPage) {
            isUpdating.current = true;
            
            // Update the component state
            setCurrentPage(pageFromURL);
            lastNavigatedPage.current = pageFromURL;
            
            // Reset the flag after the update
            setTimeout(() => {
                isUpdating.current = false;
            }, 50);
        }
    }, [searchParams, currentPage, setCurrentPage]);

    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages && !isUpdating.current) {
            const nextPage = currentPage + 1;
            isUpdating.current = true;
            
            // Update state first
            setCurrentPage(nextPage);
            
            // Reset the flag after a short delay
            setTimeout(() => {
                isUpdating.current = false;
            }, 50);
        }
    }, [currentPage, totalPages, setCurrentPage]);

    const goToPreviousPage = useCallback(() => {
        if (currentPage > 1 && !isUpdating.current) {
            const prevPage = currentPage - 1;
            isUpdating.current = true;
            
            // Update state
            setCurrentPage(prevPage);
            
            // Reset the flag after a short delay
            setTimeout(() => {
                isUpdating.current = false;
            }, 50);
        }
    }, [currentPage, setCurrentPage]);

    const setPage = useCallback((page: number) => {
        if (page > 0 && page <= totalPages && !isUpdating.current && page !== currentPage) {
            isUpdating.current = true;
            
            // Update state
            setCurrentPage(page);
            
            // Reset the flag after a short delay
            setTimeout(() => {
                isUpdating.current = false;
            }, 50);
        }
    }, [totalPages, setCurrentPage, currentPage]);

    return {
        currentPage,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        setPage,
    };
};
