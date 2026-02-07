import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import StudentDashboard from './components/StudentDashboard'
import PhysicsTopicsPage from './components/PhysicsTopicsPage'
import ChemistryTopicsPage from './components/ChemistryTopicPage'
import BiologyTopicsPage from './components/BiologyTopicPages'
import PracticalExperiment from './components/PrcaticalExperiment'
import FaradaySimulation from './Experiments/FaradaySimulation'
import OhmsLawVirtualLab from './Experiments/OhmsLawVirtualLab'
import Series from './Experiments/Series'
import AcidBaseLabPro from './Experiments/AcidBaseIndicatorLab'
import ChemicalReactionsInteractiveLab from './Experiments/ChemicalReactionsInteractiveLab'
import SoapCleansingActionLab from './Experiments/CleansingActionSoapVirtualLab'
import PhotosynthesisVirtualLab from './Experiments/PhotosynthesisLab'
import RespirationLabLimewater from './Experiments/RespirationLab'
import StarchTestLabProfessional from './Experiments/StarchTestLab'

function MainLayout(){
  return(
    <>
     <Header />    
     <Outlet/>
     <Footer/>
    </>
  )
}

 const routes = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    children:[
      {
        path:"/",
        element:<Home />,
      },
      {
        path:"/dashboard",
        element:<StudentDashboard />,
      },
      {
        path:"/physics",
        element:<PhysicsTopicsPage />,
      },
      {
        path:"/chemistry",
        element:<ChemistryTopicsPage />,
      },
      {
        path:"/biology",
        element:<BiologyTopicsPage />,
      },
      {
        path:"/allexp/:id",
        element:<PracticalExperiment />,
      },
      {
        path:"/faradayLaw",
        element:<FaradaySimulation/>,
      },
       {
        path:"/ohmsLaw",
        element:<OhmsLawVirtualLab/>,
      },
      {
        path:"/PhSeries",
        element:<Series/>,
      },
       {
        path:"/chemicalrxn",
        element:<ChemicalReactionsInteractiveLab/>,
      },
       {
        path:"/AcidBase",
        element:<AcidBaseLabPro/>,
      },
       {
        path:"/soap",
        element:<SoapCleansingActionLab/>,
      },
       {
        path:"/photosynthesis",
        element:<PhotosynthesisVirtualLab/>,
      },
       {
        path:"/Respiration",
        element:<RespirationLabLimewater/>,
      },
       {
        path:"/starchtest",
        element:<StarchTestLabProfessional/>,
      },
     
    ]
  }
 ])

 function App() {
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App;

