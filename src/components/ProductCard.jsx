import React from 'react'
import apiClient from '../services/api'

export default function ProductCard({
  product,
  userId,
  onSelect
}) {
  const handleView = async () => {
    await apiClient.trackEvent({
      userId,
      productId: product.product_id,
      eventType: 'click'
    })
  
    onSelect?.(product.product_id)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()

    apiClient.trackEvent({
      userId,
      productId: product.product_id,
      eventType: 'add_to_cart'
    })

    alert('Added to cart')
  }

  const handlePurchase = (e) => {
    e.stopPropagation()

    apiClient.trackEvent({
      userId,
      productId: product.product_id,
      eventType: 'purchase'
    })

    alert('Purchase tracked')
  }

  return (
    <div
      onClick={handleView}
      className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:-translate-y-2"
    >
      <div className="h-56 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.product_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/400x300?text=Product'
          }}
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            {product.category}
          </span>

          <span className="text-xl font-bold text-green-600">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2">
          {product.product_name}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          by {product.vendor_id}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {product.sales_count} sold
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={handlePurchase}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}