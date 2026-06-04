import Layout from '../../components/layout/Layout'
import SessionList from '../components/sessions/SessionList'
import SessionSelection from '../components/sessions/SessionSelection'
import { useTasks } from '../../context/tasks'
import { useState } from 'react'

export default function SessionsPage() {
  const {tasks} = useTasks()
  const [selected, setSelected] = useState<string>("all");

  return (
    <Layout>
      <SessionSelection tasks={tasks} selected={selected} setSelected={setSelected}/>
      <SessionList tasks={tasks} selected={selected}/>
    </Layout>
  )
}
