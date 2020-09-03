import React, {useState, useEffect} from 'react';

const Navbar = () => {
    const [currentYOffest, setOffset] = useState(window.pageYOffset);
    const [hide, setHide] = useState(false);

    const isScrolingDown = () => {
        let toHide = currentYOffest < window.pageYOffset;
        setOffset(window.pageYOffset);
        setHide(toHide);
    }

    useEffect(()=>{
        window.addEventListener("scroll", isScrolingDown);
        return () => window.removeEventListener("scroll", isScrolingDown);
    }, [window.pageYOffset])

    return (
        <div className='navbar' style={{transform: hide ? 'translate(0,-50px)' : 'translate(0,0)'}} >
           <a href="#root"><h2>C🍭R</h2></a>
           <div className="navbar--menu">
               <div className='navbar--menu-item desktop'>log in</div>
               <div className='navbar--menu-item desktop'>sign up</div>
               <div className='navbar--menu-item mobile'>☰</div>
           </div>
        </div>
    )
}

export default Navbar