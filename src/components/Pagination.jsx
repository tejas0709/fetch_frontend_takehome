import React from "react";
import { Pagination as MuiPagination, Box } from "@mui/material";

/**
 * Pagination component for navigating through paginated data.
 *
 * @param {Object} props - Component props.
 * @param {number} props.currentPage - The currently active page.
 * @param {number} props.totalPages - The total number of pages available.
 * @param {Function} props.setCurrentPage - Callback to update the current page.
 */
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  /**
   * Handles page change events.
   *
   * @param {Object} event - The event object.
   * @param {number} value - The new page number.
   */
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        mt: 4, // Adds margin to the top
        display: "flex", // Flex container for centering
        justifyContent: "center", // Centers the pagination horizontally
      }}
    >
      {/* Material-UI Pagination Component */}
      <MuiPagination
        count={totalPages} // Total number of pages
        page={currentPage} // Currently active page
        onChange={handleChange} // Handle page changes
        color="primary" // Primary color for the component
        sx={{
          // Hover effect for pagination items
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#f0f0f0",
          },
          // Styles for the selected pagination item
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#3f51b5",
            color: "white",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
