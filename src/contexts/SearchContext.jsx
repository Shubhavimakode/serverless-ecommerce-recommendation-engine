import React, {
  createContext,
  useContext,
  useState,
  useCallback
} from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error(
      'useSearch must be used within SearchProvider'
    )
  }

  return context
}

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const [filters, setFilters] = useState({
    category: '',
    vendor: '',
    minPrice: '',
    maxPrice: '',
    sortBy: ''
  })

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      category: '',
      vendor: '',
      minPrice: '',
      maxPrice: '',
      sortBy: ''
    })
  }, [])

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        products,
        setProducts,
        loading,
        setLoading,
        totalCount,
        setTotalCount,
        filters,
        updateFilters,
        clearFilters
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}