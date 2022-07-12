import React, {useState} from 'react';
import './App.css';
import Post from './components/Home/Pages/Post';
import Person from './components/Home/Pages/Person';
import Entity from './components/Home/Pages/Entity';
import Home from './components/Home/Home';
import Signup from './components/Home/Pages/Signup';
import Profile from './components/Home/Pages/profile/Profile';
import SignIn from './components/Home/Pages/Login/SignIn';
import Header from './components/Header/Header';
import CreatePost from './components/Home/Pages/CreatePost';
import UpdateProfile from './components/Home/Pages/profile/UpdateProfile';
import CreateVac from './components/Home/Pages/CreateVac';
import Offers from './components/Home/Pages/Offers';
import OfferPage from './components/Home/Pages/OfferPage';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; 

const App = ()=>{ 
  const posts = [
    {author: "Marvel", content: "Vocent invenire torquatos nam ut, vel an odio saperet ornatus. Facer nostrud ad mei. Vis an purto tota, probo efficiantur comprehensam ei ius. Hendrerit reprehendunt ea mel. Nec dico gloriatur moderatius ad, has choro mnesarchum ea, an probatus conceptam maiestatis usu. Tamquam tractatos sit ex.Ullum soleat cetero eos id, an nam mnesarchum incorrupte. Est vidit pericula te, vim et natum omnium vocent. Possit animal placerat has cu. Sanctus tractatos ad per, ne omnes nonumy vivendum has. Nam erat oporteat ne, ius te purto doming suscipit. Cu est dicta nominati. Ea his impetus conceptam mediocritatem, ius ei explicari consetetur.Te sea natum prima appetere, feugiat appetere incorrupte ut sed, at mei quando dicunt. Vero error et vim, eos ei mundi civibus. Quas consequat disputationi vel eu, ea quem nostro theophrastus cum. Etiam vocent prodesset sea eu. Vero nostrum cum eu, omnesque vivendum at mea, pri placerat eloquentiam eu.Vix epicuri scriptorem ex, utinam vituperatoribus pri in. <br/> <br/> Movet nominavi invidunt in eum. No eos integre rationibus. Per ut mundi molestiae, ut lorem senserit persequeris eam.Dicit euismod consequat nam ad, commodo impedit denique cu pri, pri et esse docendi epicuri. Ad nec eros numquam torquatos, et ipsum nominavi qui, per novum dictas aeterno an. Nec harum paulo voluptatum no. In has fuisset oportere, eu mea natum sonet inimicus. Te dolore epicuri nostrum vix, animal discere accumsan cum ut.Ius zril saperet pertinax id, pro id inani nullam, sea ea facilisi scribentur. No qui eirmod graecis. Ut sint solet gloriatur eam. His at clita persecuti, id usu percipit reformidans. Est labitur vivendum te, ei vis nostrud tibique molestie.No brute summo voluptatibus usu, pro an quem alia melius, quis audire virtute ex mel.<br/> <br/>  Zril iisque alienum usu eu, iriure eruditi voluptaria per cu. Eu eum iuvaret discere, veniam iisque te eum. Bonorum hendrerit consectetuer nam ad. Vis utamur labitur inimicus te.Ea scripta aperiam virtute vis, ne sensibus expetenda vim, voluptua mnesarchum interpretaris in qui. Animal antiopam mediocrem ea pro, eruditi pertinacia in mea. Ei mundi hendrerit mei, dolore argumentum eum ut. Prima veniam moderatius sed ea, assum nominavi ullamcorper sit ex. Latine accusata periculis per ne. Eligendi probatus salutandi nec ad.Nec sonet solet ex, usu ridens phaedrum assueverit ne. Meliore admodum neglegentur sit at. Per ad impedit adipisci. Per nostrum volutpat efficiendi et, in eos verear splendide, probo atqui ridens in sit.Pro modo admodum abhorreant at, qui posse altera facete ex. Minimum efficiendi scripserit ei eam, modus paulo accusam et vel. Vim ea suas solet. Mundi liberavisse at sed, ne sit natum ipsum imperdiet. Mei in purto partiendo persecuti, cu posse delicatissimi sit, quis sapientem an duo.Petentium voluptatum conclusionemque nec ea. Ut habemus officiis has, usu oblique feugiat ea, duo dolore indoctum sententiae cu. Ex nec quot commune quaestio, omnis mediocrem quo ut, sit ea simul admodum explicari. Ad sed volumus euripidis. Id alia quodsi ceteros est, ne vis nonumy labore nonumes, id nemore accusata nec. Tamquam rationibus nam ea, in oblique oporteat patrioque has, quo assum ridens."},
      {author: "Tony", content: "Vocent invenire torquatos nam ut, vel an odio saperet ornatus. Facer nostrud ad mei. Vis an purto tota, probo efficiantur comprehensam ei ius. Hendrerit reprehendunt ea mel. Nec dico gloriatur moderatius ad, has choro mnesarchum ea, an probatus conceptam maiestatis usu. Tamquam tractatos sit ex.Ullum soleat cetero eos id, an nam mnesarchum incorrupte. Est vidit pericula te, vim et natum omnium vocent. Possit animal placerat has cu. Sanctus tractatos ad per, ne omnes nonumy vivendum has. Nam erat oporteat ne, ius te purto doming suscipit. Cu est dicta nominati. Ea his impetus conceptam mediocritatem, ius ei explicari consetetur.Te sea natum prima appetere, feugiat appetere incorrupte ut sed, at mei quando dicunt. Vero error et vim, eos ei mundi civibus. Quas consequat disputationi vel eu, ea quem nostro theophrastus cum. Etiam vocent prodesset sea eu. Vero nostrum cum eu, omnesque vivendum at mea, pri placerat eloquentiam eu.Vix epicuri scriptorem ex, utinam vituperatoribus pri in. <br/> <br/> Movet nominavi invidunt in eum. No eos integre rationibus. Per ut mundi molestiae, ut lorem senserit persequeris eam.Dicit euismod consequat nam ad, commodo impedit denique cu pri, pri et esse docendi epicuri. Ad nec eros numquam torquatos, et ipsum nominavi qui, per novum dictas aeterno an. Nec harum paulo voluptatum no. In has fuisset oportere, eu mea natum sonet inimicus. Te dolore epicuri nostrum vix, animal discere accumsan cum ut.Ius zril saperet pertinax id, pro id inani nullam, sea ea facilisi scribentur. No qui eirmod graecis. Ut sint solet gloriatur eam. His at clita persecuti, id usu percipit reformidans. Est labitur vivendum te, ei vis nostrud tibique molestie.No brute summo voluptatibus usu, pro an quem alia melius, quis audire virtute ex mel.<br/> <br/>  Zril iisque alienum usu eu, iriure eruditi voluptaria per cu. Eu eum iuvaret discere, veniam iisque te eum. Bonorum hendrerit consectetuer nam ad. Vis utamur labitur inimicus te.Ea scripta aperiam virtute vis, ne sensibus expetenda vim, voluptua mnesarchum interpretaris in qui. Animal antiopam mediocrem ea pro, eruditi pertinacia in mea. Ei mundi hendrerit mei, dolore argumentum eum ut. Prima veniam moderatius sed ea, assum nominavi ullamcorper sit ex. Latine accusata periculis per ne. Eligendi probatus salutandi nec ad.Nec sonet solet ex, usu ridens phaedrum assueverit ne. Meliore admodum neglegentur sit at. Per ad impedit adipisci. Per nostrum volutpat efficiendi et, in eos verear splendide, probo atqui ridens in sit.Pro modo admodum abhorreant at, qui posse altera facete ex. Minimum efficiendi scripserit ei eam, modus paulo accusam et vel. Vim ea suas solet. Mundi liberavisse at sed, ne sit natum ipsum imperdiet. Mei in purto partiendo persecuti, cu posse delicatissimi sit, quis sapientem an duo.Petentium voluptatum conclusionemque nec ea. Ut habemus officiis has, usu oblique feugiat ea, duo dolore indoctum sententiae cu. Ex nec quot commune quaestio, omnis mediocrem quo ut, sit ea simul admodum explicari. Ad sed volumus euripidis. Id alia quodsi ceteros est, ne vis nonumy labore nonumes, id nemore accusata nec. Tamquam rationibus nam ea, in oblique oporteat patrioque has, quo assum ridens."},
        {author: "Joshua", content: "Vocent invenire torquatos nam ut, vel an odio saperet ornatus. Facer nostrud ad mei. Vis an purto tota, probo efficiantur comprehensam ei ius. Hendrerit reprehendunt ea mel. Nec dico gloriatur moderatius ad, has choro mnesarchum ea, an probatus conceptam maiestatis usu. Tamquam tractatos sit ex.Ullum soleat cetero eos id, an nam mnesarchum incorrupte. Est vidit pericula te, vim et natum omnium vocent. Possit animal placerat has cu. Sanctus tractatos ad per, ne omnes nonumy vivendum has. Nam erat oporteat ne, ius te purto doming suscipit. Cu est dicta nominati. Ea his impetus conceptam mediocritatem, ius ei explicari consetetur.Te sea natum prima appetere, feugiat appetere incorrupte ut sed, at mei quando dicunt. Vero error et vim, eos ei mundi civibus. Quas consequat disputationi vel eu, ea quem nostro theophrastus cum. Etiam vocent prodesset sea eu. Vero nostrum cum eu, omnesque vivendum at mea, pri placerat eloquentiam eu.Vix epicuri scriptorem ex, utinam vituperatoribus pri in. <br/> <br/> Movet nominavi invidunt in eum. No eos integre rationibus. Per ut mundi molestiae, ut lorem senserit persequeris eam.Dicit euismod consequat nam ad, commodo impedit denique cu pri, pri et esse docendi epicuri. Ad nec eros numquam torquatos, et ipsum nominavi qui, per novum dictas aeterno an. Nec harum paulo voluptatum no. In has fuisset oportere, eu mea natum sonet inimicus. Te dolore epicuri nostrum vix, animal discere accumsan cum ut.Ius zril saperet pertinax id, pro id inani nullam, sea ea facilisi scribentur. No qui eirmod graecis. Ut sint solet gloriatur eam. His at clita persecuti, id usu percipit reformidans. Est labitur vivendum te, ei vis nostrud tibique molestie.No brute summo voluptatibus usu, pro an quem alia melius, quis audire virtute ex mel.<br/> <br/>  Zril iisque alienum usu eu, iriure eruditi voluptaria per cu. Eu eum iuvaret discere, veniam iisque te eum. Bonorum hendrerit consectetuer nam ad. Vis utamur labitur inimicus te.Ea scripta aperiam virtute vis, ne sensibus expetenda vim, voluptua mnesarchum interpretaris in qui. Animal antiopam mediocrem ea pro, eruditi pertinacia in mea. Ei mundi hendrerit mei, dolore argumentum eum ut. Prima veniam moderatius sed ea, assum nominavi ullamcorper sit ex. Latine accusata periculis per ne. Eligendi probatus salutandi nec ad.Nec sonet solet ex, usu ridens phaedrum assueverit ne. Meliore admodum neglegentur sit at. Per ad impedit adipisci. Per nostrum volutpat efficiendi et, in eos verear splendide, probo atqui ridens in sit.Pro modo admodum abhorreant at, qui posse altera facete ex. Minimum efficiendi scripserit ei eam, modus paulo accusam et vel. Vim ea suas solet. Mundi liberavisse at sed, ne sit natum ipsum imperdiet. Mei in purto partiendo persecuti, cu posse delicatissimi sit, quis sapientem an duo.Petentium voluptatum conclusionemque nec ea. Ut habemus officiis has, usu oblique feugiat ea, duo dolore indoctum sententiae cu. Ex nec quot commune quaestio, omnis mediocrem quo ut, sit ea simul admodum explicari. Ad sed volumus euripidis. Id alia quodsi ceteros est, ne vis nonumy labore nonumes, id nemore accusata nec. Tamquam rationibus nam ea, in oblique oporteat patrioque has, quo assum ridens."}
]



  return (
  
    <Router>
    <div className='App'>
    <Header/>
   
      <Routes>
      <Route path="/" exact element={<Home posts={posts}/>}/>
      <Route path="/log-in" element={<SignIn/>}/>
      <Route path="/post/:id" element={<Post/>}/>
      <Route path="/create-account" element={<Signup/>}/>
      
      <Route path="/profile/:id" element={<Profile/>}/>
      <Route path="/update-profile" element={<UpdateProfile/>}/>
      <Route path="/create-post" element={<CreatePost/>}/>
      <Route path="/create-vacancy" element={<CreateVac/>}/>
      <Route path="/offers/" element={<Offers/>}/>
      <Route path="/offers/:id" element={<OfferPage/>}/>

      </Routes>

      
      </div>
      </Router>    
    
     
  );
}

export default App;

