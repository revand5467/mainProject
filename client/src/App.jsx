// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Canvas  from './canvas';
import Customizer from './pages/Customizer'
import AvatarMaker from './avatarmaker/avatar';
import AvatarDetails from './avatarmaker/AvatarDetails';


const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={  <main className="app transition-all ease-in">
                                    <Home />
                                    <Canvas />
                                    <AvatarDetails />
                                     <Customizer />
                        
                                     </main>
                                     } />
        <Route path="/Avatar" element={ <AvatarMaker/>}  />   
        <Route path="/avatar-details" element={ <AvatarDetails/>}  />                         
       </Routes>
    </>
//    <main className="app transition-all ease-in">
//    <AvatarMaker/>
//    <Home />
//    <Canvas />
//    <Customizer />
//  </main>
 );
};

export default App;