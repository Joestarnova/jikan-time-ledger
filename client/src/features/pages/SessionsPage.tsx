import React from 'react'
import Layout from '../../components/layout/Layout'
import SessionList from '../components/sessions/SessionList'
import SessionSelection from '../components/sessions/SessionSelection'

export default function SessionsPage() {
  return (
    <Layout>
      <SessionSelection />
      <SessionList />
    </Layout>
  )
}
