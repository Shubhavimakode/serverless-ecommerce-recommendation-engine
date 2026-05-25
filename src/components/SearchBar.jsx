import React, { useState, useEffect } from 'react'
import { useSearch } from '../contexts/SearchContext'
import { Search, X } from 'lucide-react'
import apiClient from '../services/api'

export default function SearchBar() {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setProducts,
    setLoading,
    setTotalCount
  } = useSearch()

  const [focused, setFocused] = useState(false)

  const handleSearch = async (term) => {
    setLoading(true)

    try {
      const result = await apiClient.searchProducts({
        query: term,
        filters
      })

      setProducts(result || [])
      setTotalCount(result.length || 0)

    } catch (error) {
      console.error('Search error:', error)
      setProducts([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, filters])

  return (
    <div className="relative max-w-2xl mx-auto">
      <div
        className={`relative group ${
          focused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
        }`}
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

        <input
          type="text"
          placeholder="Search products, categories, brands..."
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white shadow-lg hover:shadow-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('')
              handleSearch('')
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}