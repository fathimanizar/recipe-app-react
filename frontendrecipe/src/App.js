
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Cuisines from './components/Cuisines';
import Addcuisine from './components/Addcuisine';
import Recipes from './components/Recipes';
import Addrecipe from './components/Addrecipe';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path='/' element={<Cuisines/>}/>
          <Route path='/viewrecipes' element={<Recipes/>}/>
          <Route path='/addrecipe' element={<Addrecipe data={{cuisine_name:'',recipe_name:'',recipe_duration:'',recipe_servings_no:'',recipe_image:''}} method='post'/>} />
          <Route path='/addcuisine' element={<Addcuisine data={{cuisine_name:'',cuisine_duration:'',cuisine_servings_no:'',cuisine_image:''}} method='post'/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
