import Layout from '../../components/layout/Layout'
import SessionList from '../components/sessions/SessionList'
import SessionSelection from '../components/sessions/SessionSelection'
import { useTasks } from '../../context/useTasks'

export default function SessionsPage() {
  const {tasks} = useTasks()

  return (
    <Layout>
      <SessionSelection tasks={tasks}/>
      <SessionList />
    </Layout>
  )
}
