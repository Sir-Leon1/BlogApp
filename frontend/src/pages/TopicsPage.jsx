import React from 'react';
import Breadcrumb from '../components/topicsPage/breadCrumb';
import TopicsGrid from '../components/topicsPage/topicsGrid';
import Layout from "../components/layout/Layout.jsx";

const TopicsPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-950 py-8">

        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumb/>
        </div>
        <TopicsGrid/>
      </div>
    </Layout>
  );
};

export default TopicsPage;