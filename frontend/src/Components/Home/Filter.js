import React,{ useEffect, useState} from 'react';
import FilterModal from './FilterModal';
import { UseDispatch, useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';
const Filter = () => {
  // State for controlling model visibility.
  const [isModalOpen,setIsModalOpen]=useState(false);
   // State for Stroing selected filters.
  const [selectedFilters, setSelectedFilters ]= useState({});
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(propertyAction.updateSearchParams(selectedFilters));
    dispatch(getAllProperties());
  },[selectedFilters,dispatch]);
  //functiont o handle open Modal/popup window
  const handleOpenmodal = () =>{
    setIsModalOpen(true);
  };
  //functionto close the window
  const handleCloseModal = () => {
    setIsModalOpen(false);
};
//function to handle the changes filter
const handleFilterChange = (filterName,value) => {
  // update the selected filters
  setSelectedFilters((prevFilters)=>({
    ...prevFilters, 
    // its store the previouse value of filter  
    [filterName]: value,
  }));
};
  return (
    <>
 <span className="material-symbols-outlined fliter filter" onClick={handleOpenmodal}>tune</span>
      {isModalOpen&& (
        <FilterModal 
        selectedFilters={selectedFilters} 
        onFilterChange={handleFilterChange} 
        onClose={handleCloseModal}/>
      )}
      </>
  );
};
export default Filter;