import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from '../store/store.js'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ChakraProvider>
            <ColorModeScript />
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
