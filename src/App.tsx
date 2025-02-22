import {  Route, Routes } from 'react-router'
import Resume from './component/Resume'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Resume/>}/>
    </Routes>
    </>
  )
}

export default App