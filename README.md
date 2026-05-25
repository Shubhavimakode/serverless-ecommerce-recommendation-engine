# 🛒 ShubSearch – Smart Product Search & Recommendation System

A scalable serverless e-commerce product search and recommendation platform built using **AWS Cloud Services**, **React.js**, and **DynamoDB**.  
The system provides intelligent product recommendations, real-time search filtering, user activity tracking, and recommendation caching.

---

# 🚀 Features

## 🔍 Product Search
- Keyword-based product search
- Filter products by:
  - Category
  - Vendor
  - Price Range
- Sort by:
  - Price
  - Popularity
- Fast querying using DynamoDB GSIs

## 🎯 Recommendation Engine
Implements multiple recommendation strategies:

### 1. Frequently Bought Together
Uses purchase history to recommend related products.

### 2. Users Also Viewed
Tracks user activity and recommends products viewed by similar users.

### 3. Category-Based Recommendations
Recommends trending products from the same category.

### 4. Cold Start Handling
Uses category + global popularity for new users/products.

---

# 📊 A/B Testing
Two recommendation strategies implemented:

| Strategy | Description |
|---|---|
| Baseline | Category + Popularity |
| Advanced | User behavior + Co-occurrence |

Metrics Tracked:
- CTR (Click Through Rate)
- Conversion Rate
- Recommendation Clicks

---

# 📈 Monitoring & Alerts
Integrated:
- Amazon CloudWatch
- Amazon SNS

Tracks:
- API latency
- Lambda failures
- Request count
- Recommendation traffic

---

# 🧠 User Activity Tracking
Tracks:
- Product Views
- Add to Cart
- Purchases

Stored in DynamoDB for recommendation generation.

---

# ☁️ AWS Services Used

| Service | Purpose |
|---|---|
| AWS Lambda | Backend compute |
| API Gateway | REST APIs |
| DynamoDB | NoSQL database |
| Cognito | Authentication |
| Amplify | Frontend hosting |
| CloudWatch | Monitoring |
| SNS | Alerts |
| EventBridge | Scheduled recommendation refresh |

---

# 🏗️ System Architecture

![Architecture Diagram](images/architecture-diagram.jfif)

---

# 🖥️ Application Output

![Application UI](images/project-output.jfif)


---

# 📂 DynamoDB Tables

## Products Table

| Field | Description |
|---|---|
| product_id | Primary Key |
| product_name | Product name |
| category | Product category |
| vendor_id | Vendor identifier |
| price | Product price |
| popularity_score | Product popularity |
| sales_count | Sales count |

### GSIs
- category-index
- vendor-index

---

## User Events Table

| Field | Description |
|---|---|
| user_id | User identifier |
| product_id | Product identifier |
| event_type | view/cart/purchase |
| timestamp | Event timestamp |

---

## Recommendation Cache Table

| Field | Description |
|---|---|
| product_id | Product identifier |
| user_id | User identifier |
| recommendations | Recommended products |
| strategy | baseline/advanced |
| updated_at | Cache timestamp |

---

# 🔌 API Endpoints

## Search Products
```bash
GET /search
```

### Supported Query Parameters
- product_name
- category
- vendor
- min_price
- max_price
- sort

---

## Get Recommendations
```bash
GET /recommendations?product_id=X&user_id=Y
```

---

## Log User Events
```bash
POST /events
```

Tracks:
- views
- cart actions
- purchases

---

# 🖥️ Frontend Components

Built using React.js.

Components:
- Search Bar
- Filters
- Product Cards
- Recommendation Widget
- Authentication Screens

---

# ⚙️ Recommendation Workflow

1. User searches/view products
2. Events logged in DynamoDB
3. Recommendation Lambda processes:
   - Co-occurrence
   - User similarity
   - Popularity
4. Results cached
5. Frontend displays recommendations

---

# 🔄 Recommendation Cache Refresh

Scheduled using:
- Amazon EventBridge
- AWS Lambda

Runs periodically to:
- Precompute recommendations
- Reduce API latency
- Improve performance

---

# 🔐 Authentication

Implemented using:
- Amazon Cognito

Features:
- Sign Up
- Login
- JWT Authentication
- Protected APIs

---

# 📦 Project Structure

```bash
ecommerce-frontend/
│
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── Recommendations.jsx
│   │   └── Filters.jsx
│   │
│   ├── contexts/
│   ├── hooks/
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── README.md
```

---

# ▶️ Run Locally

## Clone Repository

```bash
git clone https://github.com/your-username/shubsearch.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Frontend

```bash
npm run dev
```

---

# 🌐 Deployment

## Frontend
Hosted on:
- AWS Amplify / S3

## Backend
Hosted using:
- API Gateway
- AWS Lambda

---

# 📌 Key Highlights

✅ Fully Serverless Architecture  
✅ Real-time Product Recommendations  
✅ Recommendation Caching  
✅ A/B Testing Support  
✅ Cloud Monitoring & Alerts  
✅ JWT Authentication  
✅ Scalable AWS Backend  
✅ React Frontend Integration  

---

# 👩‍💻 Developed By

**Shubhavi Makode**

MCA Student | AWS Cloud & Backend Developer  
Focused on:
- Serverless Applications
- AWS Architecture
- Backend Development
- Recommendation Systems

---

# 📜 License

This project is developed for educational and internship purposes.
