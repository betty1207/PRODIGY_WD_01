import React, { useState , useEffect, useRef } from 'react';
import './App.css';
const App=()=>{
const[page, setPage]=useState(1); // Current page (1 to 4)
const [isScrolled, setIsScrolled] = useState(false);
const navigationRef = useRef(null);

useEffect(()=>{
const handleNavScroll=()=>{
  const navigation =navigationRef.current;
  if(navigation){
  
  
    if(window.scrollY > 50){
  
      navigation.classList.add('scrolled');
       setIsScrolled(true);
  
    }
    else{
      navigation.classList.remove('scrolled');
      setIsScrolled(false);
    }
  }

};



window.addEventListener('scroll',handleNavScroll);
return()=>{

  window.removeEventListener('scroll',handleNavScroll);
};

},[]);


useEffect(()=>{

    const handleScroll =()=>{

        const sections = document.querySelectorAll('section'); 
        let currentPage = 1;
        
        // Check which section is in the viewport

       sections.forEach((section, index)=>{
        const rect = section.getBoundingClientRect();
        if(rect.top<=window.innerHeight/2 && rect.bottom>=window.innerHeight/2){
            currentPage = index + 1;
        }
       });
       if (currentPage !== page) {
        setPage(currentPage);
      }
    };
       // Attach the scroll event listener
     window.addEventListener('scroll' , handleScroll);
     // Cleanup event listener on unmount
     return()=> window.removeEventListener('scroll' , handleScroll);

} , [page]);

useEffect(()=>{
     // Change the background color dynamically based on the page
    document.body.className = `page-${page}`;
},[page]);

const navStyles = isScrolled ? {
  fontWeight: 'bold', 
  color: '#fff',      
  fontFamily: 'Arial, sans-serif', 
  transition: 'all 0.3s ease' 
} : {};
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});



return(
  <>
  <div ref={navigationRef} class="navigation" style={navStyles}>
    <nav class="navbar">
        
      <li><a href ="#home">home</a></li>
      <li><a href ="#about">about us</a></li>
      <li><a href ="#services">services</a></li>
      <li><a href ="#contact">contact us</a></li>
      
    </nav>
    </div>
    
    <section className="page-1"  id="home">
<h1>Homepage</h1>

    </section>

   
    <section className="page-2"  id="about">
    <h1>Aboutpage</h1>

    </section>

    
    <section className="page-3"  id="services">
    <h1>Servicespage</h1>

    </section>

    
    <section className="page-4"  id="contact">
    <h1>Contactpage</h1>

    </section>

    </>
);

}



export default App;
