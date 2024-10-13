import React, {useEffect, useState} from 'react';


const PwaModal = () => {

    const [ss,setShowInstallModal] = useState(false);
    const [prompt, setPrompt] = useState(null);

    //let deferredPrompt;
    const handleInstallModal = () => {
        console.log(prompt);
        if (prompt) {
            console.log("222");
            prompt.prompt();
            prompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome ==="accepted") {
                    console.log("accepted");
                }
                else {
                
                    console.log("canceled");
                }

                setShowInstallModal(false);
                setPrompt(null);
            })
        }
    }

    const handleCloselModal = () => {
        setShowInstallModal(false);

    }

    
    useEffect(() => {
        
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setPrompt(event);
            
       

            if (!window.matchMedia("(display-mode: standalone)").matches) {
                console.log("I'm here");
                setShowInstallModal(true);
                console.log(ss);
              
            }

        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        return () => {
            window.removeEventListener("beforeinstallprompt",handleBeforeInstallPrompt);
      }
    }, [])
    

  return (
    ss && (
    <div style={{border:"1px solid black",background:"grey", padding:"10px"}}>
        <div className="bg-white w-94 p-4 rounded-lg shadow-lg">
            <h2>
                Install the App
            </h2>
            <p className="text-sm mb4 text black">
                Click the button below to install the app on your device
            </p>
            <button onClick={handleInstallModal}>Install PWA</button>
            <button onClick={handleCloselModal}>Close</button>
    </div>

        </div>
 
    )
  )
}

export default PwaModal;