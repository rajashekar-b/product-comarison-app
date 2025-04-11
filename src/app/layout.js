
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import ReduxProvider from '../store/ReduxProvider'; 

export const metadata = {
  title: 'Product Comparison',
  description: 'Compare products easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}