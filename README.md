#  Arteriaz Fintech Dashboard  (Arteriaz is project name only you can change also if you want )

Arteriaz is a highly interactive, data-driven fintech dashboard built using Next.js. It is designed for investors and corporates to explore, analyze, and track high-growth startup deals with a modern UI and optimized performance.

🔗 Live Demo: https://dashboard-by-mukesh.netlify.app/



## Objective

This project was built as part of a frontend assignment to simulate a real-world fintech investment platform without using any backend APIs.

All backend behavior such as data fetching, filtering, sorting, and async handling is simulated on the frontend.

---

## Features

- Explore 50+ fintech deals
- Search and filter companies
- Multi-filter (ROI, Risk, Industry, Investment Range)
- Sorting and pagination
- Deal recommendations (scoring-based)
- Dashboard with charts and analytics
- Corporate analytics dashboard
- Persistent user interests (localStorage)
- Fully responsive modern UI

---

##  Architecture

The project follows a scalable and modular architecture:

- Components Reusable UI components (DealExplorer, SummaryCards, Charts)
- Services Simulated API calls with delay and data processing
- Hooks Custom hooks like useDebounce for performance
- Utils → Filtering, sorting, and recommendation logic
- Store (Redux Toolkit) State management (loading, error, caching)
- Data Layer Static JSON used as mock backend
- Routing  Next.js App Router 

No business logic is placed inside UI components.

---

##  Data Flow

User Input → Debounce → Service Layer → Filter/Sort → Recommendation Engine → UI Render

- User enters search/filter input
- Debounce optimizes input handling
- Service layer simulates API calls with delay
- Data is filtered, sorted, and processed
- Recommendation engine scores deals
- Final data is rendered efficiently


##  Service Layer (API Simulation)

- Simulates async API calls using Promises
- Artificial delay (300–800ms)
- Handles:
  - Filtering
  - Sorting
  - Pagination
- Can simulate error states



##  Recommendation Engine

Deals are ranked based on:

- Risk match  
- Industry match  
- Budget compatibility  
- ROI attractiveness  

Each deal gets a score and is sorted accordingly.

Optimized using memoization.



##  Data Visualization

- Line charts → Investment growth
- Bar charts → Industry distribution
- Pie charts → Risk distribution

Built using modern chart libraries with smooth animations and tooltips.


##  State Management

Using Redux Toolkit:

- Global state handling
- Loading states
- Error handling
- Empty states
- Caching for performance



##  Performance Optimization

- Debouncing (search optimization)
- useMemo / useCallback (memoization)
- Lazy loading components
- Efficient rendering
- Optional virtualization approach







## 🛠️ Tech Stack

- Next.js (App Router + Turbopack)
- React
- Tailwind CSS
- TypeScript
- Redux Toolkit
- Chart libraries (Recharts / Chart.js)
- Lucide Icons




