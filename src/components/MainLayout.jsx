import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from "react";

const MainLayout = () => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
       
        return localStorage.getItem("theme") === "dark";
      });
    
      const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
          const newMode = !prevMode;
          localStorage.setItem("theme", newMode ? "dark" : "light");
          return newMode;
        });
      };
    
      useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
      }, [isDarkMode]);
    
    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white">
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode}></Navbar>
            
                <Outlet></Outlet>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;