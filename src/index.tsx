import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import Main from 'pages/Main'
import { RouterProvider } from 'react-router-dom'
import router from 'routes'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<RouterProvider router={router} />)
