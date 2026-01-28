import { path } from 'framer-motion/client'
import Home from './pages/Home'
import Series from './Experiments/Series'
import AcidBaseIndicatorLab from './Experiments/AcidBaseIndicatorLab'
import ChemicalReactionsVirtualLab from './Experiments/ChemicalReactionsVirtualLab'
import CleansingActionSoapVirtualLab from './Experiments/CleansingActionSoapVirtualLab'
import Student from './pages/Student'
import PhysicsTopicsPage from './components/PhysicsTopicsPage'
import ChemistryTopicsPage from './components/ChemistryTopicPage'
import BiologyTopicsPage from './components/BiologyTopicPages'
import FaradayDetails from './ExperimentPages/Physics/FaradayExperimentDetails'
import OhmsExperimentDetails from './ExperimentPages/Physics/OhmsExperimentDetails'
import EquivalentResistanceExperimentDetails from './ExperimentPages/Physics/EquivalentResistanceExperimentDetails'



export default function App() {
  return (
    <div>
      {/* <Home/> */}
      {/* <Series/> */}
      {/* <AcidBaseIndicatorLab/> */}
      {/* <ChemicalReactionsVirtualLab/> */}
      {/* <CleansingActionSoapVirtualLab/> */}
      {/* <Student/> */}
      {/* <PhysicsTopicsPage/> */}
      {/* <ChemistryTopicsPage/> */}
      {/* <BiologyTopicsPage/> */}
        <FaradayDetails/>
        <OhmsExperimentDetails/>
        <EquivalentResistanceExperimentDetails/>
    
    </div>
  )
}
