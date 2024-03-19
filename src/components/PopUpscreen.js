import { useState, useEffect } from 'react';
export default function Popup(){
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    // Check if the popup has already been shown
    const popupShown = localStorage.getItem('popupShown');
    if (!popupShown) {
      // If not, set the flag to indicate that the popup has been shown
      localStorage.setItem('popupShown', true);
      // Show the popup
      setShowPopup(true);

      // Hide the popup after 12 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 12000); // 12 seconds
    }
  }, []);

  return (
    <>
          {showPopup && (
            <div className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="w-72 p-5 rounded flex flex-col items-center bg-white dark:bg-primary space-y-3">
                      <img className="w-28 h-28 rounded-full" src={ Data?.Avatar} alt="" />
                      <h1 className="dark:text-white text-primary font-semibold">{ Data?.name} </h1>
                      <p className="dark:text-dark-subtle text-light-subtle">{ Data?.Des}</p>
              </div>
            </div>
      )}
    </>
  );
};


const Data = {
    name: "Suraj Khonde",
    Avatar: "https://res.cloudinary.com/demjvtd9v/image/upload/v1706687030/suraj_xkhqk3.jpg",
    Des: "Hey Welcome, I Am very exicted to show you my little web App.So I used varcel for Serverside so Ideally it tooks 12 sec to render due to free version.Please wait....... "
}