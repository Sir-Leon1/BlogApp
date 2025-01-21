import React from 'react';
import Header from '../components/readingLists/Header';
import ReadingGrid from '../components/readingLists/ReadingGrid';
import Layout from '../components/layout/Layout.jsx';
import { UserProvider } from '../contexts/UserContext.jsx';

const AllReadingLists = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <main className="container mx-auto px-4 py-8">
                    <Header/>
                  <UserProvider>
                    <ReadingGrid/>
                  </UserProvider>
                </main>
            </div>
        </Layout>
    );
};

export default AllReadingLists;