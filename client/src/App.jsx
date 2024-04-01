import {Routes,Route} from 'react-router-dom'
import Homepage from './components/Homepage'
import UserDetail from './components/UserDetail'
import CreateUser from './components/CreateUser'
import Navbar from './components/Navbar'
import Edituser from './components/Edituser'
import TeamCreation from './components/CreateTeam'
import TeamDetail from './components/TeamDetail'
import Totalteams from './components/Totalteams'

function App() {
  return (
    <>

     <Navbar />

     <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/newuser' element={<CreateUser />} />
        <Route path='/edit/:userId' element={<Edituser />} />
        <Route path='/newteam' element={<TeamCreation />} />
        <Route path='/teamdetail/:teamId' element={<TeamDetail />} />
        <Route path='/teams' element={<Totalteams />} />
        <Route path='/:userId' element={<UserDetail />} />
      </Routes>
    </>
  )
}

export default App
