import React, { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Component thanh tìm kiếm dùng chung
 */
const SearchBar = memo(({ value, onChange, placeholder = "Tìm kiếm..." }) => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-900/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#9370db] transition-colors tracking-vn-tight"
    />
  </div>
));

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchBar; 