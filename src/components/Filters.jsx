import React from 'react'
import { useSearch } from '../contexts/SearchContext'

export default function Filters() {
  const { filters, updateFilters, clearFilters } = useSearch()

  const categories = [
    'Electronics',
    'Laptops',
    'Accessories'
  ]

  const vendors = [
    '',
    'apple',
    'samsung',
    'sony',
    'dell'
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-blue-600 text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="mb-3 font-medium">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() =>
                updateFilters({
                  category:
                    filters.category === category
                      ? ''
                      : category
                })
              }
              className={`px-4 py-2 rounded-xl border ${
                filters.category === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Vendor */}
      <div className="mb-6">
        <h4 className="mb-3 font-medium">Vendor</h4>
        <select
          value={filters.vendor}
          onChange={(e) =>
            updateFilters({ vendor: e.target.value })
          }
          className="w-full border rounded-xl p-3"
        >
          {vendors.map(vendor => (
            <option key={vendor} value={vendor}>
              {vendor || 'All Vendors'}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <h4 className="mb-3 font-medium">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            updateFilters({ sortBy: e.target.value })
          }
          className="w-full border rounded-xl p-3"
        >
            <option value="">Default</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popularity">Most Popular</option>
        </select>
      </div>
    </div>
  )
}