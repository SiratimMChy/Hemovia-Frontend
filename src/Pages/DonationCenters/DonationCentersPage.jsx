import React, { useState, useEffect } from 'react';
import useAxios from '../../Hooks/useAxios';
import { divisions } from '../utils/centerHelpers';
import DonationCentersHero from './DonationCentersHero';
import DonationCentersStats from './DonationCentersStats';
import DonationCentersFilterBar from './DonationCentersFilterBar';
import DonationCentersGrid from './DonationCentersGrid';
import DonationCentersPagination from './DonationCentersPagination';
import DonationCentersCta from './DonationCentersCta';

const DonationCentersPage = () => {
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All'); 
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [centers, setCenters] = useState([]);

  const axiosInstance = useAxios();

  useEffect(() => {
    setIsInitialLoading(true);
    axiosInstance.get('/centers')
      .then(res => {
        const list = res.data?.centers || (Array.isArray(res.data) ? res.data : []);
        if (list && list.length > 0) {
          setCenters(list);
          setIsInitialLoading(false);
        } else {
          throw new Error('Empty centers list from backend');
        }
      })
      .catch(() => {
        fetch('/centers.json')
          .then(r => r.json())
          .then(data => {
            setCenters(data);
            setIsInitialLoading(false);
          })
          .catch(() => {
            setIsInitialLoading(false);
          });
      });
  }, []);

  // Enhanced search with loading effect
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Client-side filtering 
  const filteredCenters = centers.filter(center => {
    const matchesDivision = selectedDivision === 'All' || center.division === selectedDivision;
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply filter based on selected filter
    let matchesFilter = true;
    if (selectedFilter === 'Featured') {
      matchesFilter = center.featured;
    } else if (selectedFilter === '24/7') {
      matchesFilter = center.emergency && center.emergency.includes('24/7');
    }
    
    return matchesDivision && matchesSearch && matchesFilter;
  });

  // Pagination logic - for all filtered centers
  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCenters = filteredCenters.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDivision, searchQuery, selectedFilter]);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    document.getElementById('all-centers-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <DonationCentersHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      <DonationCentersStats
        isInitialLoading={isInitialLoading}
        centers={centers}
      />

      {/* Centers List */}
      <div id="results-section" className="py-8 sm:py-12 md:py-16 bg-base-200">
        <div className="px-4 lg:px-30 mx-auto">
          <div id="all-centers-section">
            <DonationCentersFilterBar
              startIndex={startIndex}
              endIndex={endIndex}
              filteredCenters={filteredCenters}
              selectedDivision={selectedDivision}
              selectedFilter={selectedFilter}
              totalPages={totalPages}
              currentPage={currentPage}
              setSelectedFilter={setSelectedFilter}
              setSelectedDivision={setSelectedDivision}
              centers={centers}
              divisions={divisions}
            />

            <DonationCentersGrid
              isInitialLoading={isInitialLoading}
              displayedCenters={displayedCenters}
              filteredCenters={filteredCenters}
              setSelectedDivision={setSelectedDivision}
              setSearchQuery={setSearchQuery}
              setSelectedFilter={setSelectedFilter}
            />

            <DonationCentersPagination
              filteredCenters={filteredCenters}
              itemsPerPage={itemsPerPage}
              startIndex={startIndex}
              endIndex={endIndex}
              selectedFilter={selectedFilter}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPrevious={goToPrevious}
              goToNext={goToNext}
              goToPage={goToPage}
            />
          </div>
        </div>
      </div>

      <DonationCentersCta centers={centers} />

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DonationCentersPage;
