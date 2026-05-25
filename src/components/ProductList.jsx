import React from 'react'
import { useSearch } from '../contexts/SearchContext'
import ProductCard from './ProductCard'
import LoadingSpinner from './LoadingSpinner'

export default function ProductList({ onProductSelect, userId }) {
  const { products, loading, totalCount } = useSearch()

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          No products found
        </h3>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Products ({totalCount})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.product_id}
            product={product}
            userId={userId}
            onSelect={onProductSelect}
          />
        ))}
      </div>
    </div>
  )
}