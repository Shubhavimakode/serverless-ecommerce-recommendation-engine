import React, { useState, useEffect } from 'react'
import { useAuth } from 'react-oidc-context'

import Filters from './components/Filters.jsx'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import Recommendations from './components/Recommendations.jsx'
import { SearchProvider } from './contexts/SearchContext'
import './App.css'

function App() {
  const auth = useAuth()

  const signOutRedirect = () => {
    const clientId =
      'is0hu6bg5s0bde1rcr0k5j1lk'

    const logoutUri =
      window.location.origin

    const cognitoDomain =
      'https://eu-north-1dnf4oho54.auth.eu-north-1.amazoncognito.com'

    auth.removeUser()

    window.location.href =
      `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`
  }

  const [userId, setUserId] = useState(
    'user_' + Math.floor(Math.random() * 10000)
  )

  const [currentProductId, setCurrentProductId] =
    useState(null)

  useEffect(() => {
    const storedUserId =
      localStorage.getItem('userId')

    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      localStorage.setItem(
        'userId',
        userId
      )
    }
  }, [])

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    )
  }

  if (auth.error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {auth.error.message}
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            ShubSearch
          </h1>

          <p className="text-gray-600 mb-8">
            Smart Product Search &
            Recommendations
          </p>

          <button
            onClick={() =>
              auth.signinRedirect()
            }
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    S
                  </span>
                </div>

                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShubSearch
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {
                    auth.user?.profile
                      ?.email
                  }
                </span>

                <button
                  onClick={
                    signOutRedirect
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <SearchBar />

          <div className="grid lg:grid-cols-4 gap-8 mt-8">
            <div className="lg:col-span-3 space-y-8">
              <Filters />

              <ProductList
                onProductSelect={
                  setCurrentProductId
                }
                userId={userId}
              />
            </div>

            <div className="lg:col-span-1 space-y-8">
              <Recommendations
                productId={
                  currentProductId
                }
                userId={userId}
              />
            </div>
          </div>
        </main>
      </div>
    </SearchProvider>
  )
}

export default App