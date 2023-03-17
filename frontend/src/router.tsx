import RootLayout from "@layout/RootLayout"
import ErrorPage from "@pages/ErrorPage"
import React from "react"
import { createBrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage />, errorElement: <ErrorPage /> },
        ],
    },
])
