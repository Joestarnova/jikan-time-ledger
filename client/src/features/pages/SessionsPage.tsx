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
      <div className="space-y-6">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-100">Sessions</h1>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <SessionSelection tasks={tasks} selected={selected} setSelected={setSelected} />
          <div className="mt-4">
            <SessionList tasks={tasks} selected={selected} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
