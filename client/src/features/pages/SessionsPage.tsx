import React from 'react'
import Layout from '../../components/layout/Layout'
import SessionList from '../components/sessions/SessionList'
import SessionSelection from '../components/sessions/SessionSelection'
import type { Task } from '../../types'


interface SessionSelectionProps {
  tasks: Task[];
}


export default function SessionsPage({tasks}: SessionSelectionProps) {
  return (
    <Layout>
      <SessionSelection tasks={tasks}/>
      <SessionList />
    </Layout>
  )
}
