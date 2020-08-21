//check for geolocation
window.addEventListener("load", doThis);

function doThis(){
            const altlt=document.getElementById("altlat");
            const altlt2=document.getElementById("altlat2");
            const button=document.getElementById("show");
            const locationT=document.querySelector(".location-timezone");
            const tdescription=document.querySelector(".temperature-description");
            const tempdiv=document.querySelector(".temperature");
            const temperature=document.querySelector(".temperature-degree");
         
            let lat;
            let long;

            function showCoords(){
                    if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(showPosition, showError);
                        //console.log(123);

                    }else{
                        altlt.innerHTML="your browsers does not support this feature";
                    }

                    


            }
        showCoords();


            function showPosition(position){
                let lat;
                let long;
                lat=position.coords.latitude;
                long= position.coords.longitude;
                const proxy='https://cors-anywhere.herokuapp.com/';
                    const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
                    fetch(api)
                    .then((res)=>{
                       return res.json();
                    })  
                    .then((data)=>{
                        console.log(data)
                        locationT.innerHTML=data.timezone;
                        tdescription.innerHTML=data.currently.summary;
                        temperature.textContent=data.currently.temperature;
                         const icon=data.currently.icon;
                         const iconCanvas=document.getElementById("icon");
                         console.log(icon);
                         addicon(icon,iconCanvas);

                         //ADDING THE ICON MANUALLY
                        //  var skycons = new Skycons({"color": "white"});
                        //  const iconCanvas=document.getElementById("icon");
                        //  skycons.add(iconCanvas, Skycons.RAIN);
                        //  skycons.play();

                        //ADDING THE ICON DEPENDING ON THE INFORMATION FROM THE API


            

                    })

            }

            function addicon(icon, iconID){
                var skycons = new Skycons({"color": "white"});
                const currentIcon=icon.replace(/-/g,"_").toUpperCase(); 
                skycons.play(); 
                  return skycons.set(iconID, Skycons[currentIcon]);
                 
                  



            }
            function showError(error) {
                switch(error.code) {
                case error.PERMISSION_DENIED:
                    altlt.innerHTML = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    altlt.innerHTML = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    altlt.innerHTML = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    altlt.innerHTML = "An unknown error occurred."
                    break;
                }
            }
           
            //console.log(temperatureSpan);
   

}