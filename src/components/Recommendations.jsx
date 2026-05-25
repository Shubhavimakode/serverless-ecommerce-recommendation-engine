import React, { useState, useEffect } from 'react'
import apiClient from '../services/api'
import ProductCard from './ProductCard'
import LoadingSpinner from './LoadingSpinner'

export default function Recommendations({
  productId,
  userId
}) {
  const [recommendations, setRecommendations] =
    useState([])
  const [loading, setLoading] = useState(false)
  const [strategy, setStrategy] = useState('')

  useEffect(() => {
    if (!productId) {
      setRecommendations([])
      setStrategy('')
      return
    }

    const fetchRecommendations = async () => {
      setLoading(true)

      try {
        const recs =
          await apiClient.getRecommendations({
            productId,
            userId
          })

        setRecommendations(
          recs.recommendations || []
        )

        setStrategy(recs.strategy || '')

      } catch (error) {
        console.error(
          'Recommendation error:',
          error
        )
        setRecommendations([])
        setStrategy('')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [productId, userId])

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Smart Recommendations
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Personalized from user activity
        </p>

        {strategy && (
          <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
            Strategy: {strategy}
          </span>
        )}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : recommendations.length > 0 ? (
        <div className="space-y-5">
          {recommendations.map(product => (
            <ProductCard
              key={product.product_id}
              product={product}
              userId={userId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">✨</div>

          <p className="text-gray-500">
            Select a product to discover
            related recommendations
          </p>
        </div>
      )}
    </div>
  )
}