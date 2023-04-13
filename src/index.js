document.addEventListener("DOMContentLoaded", fetchPups);

const dogBar = document.getElementById("dog-bar");
const dogInfo = document.getElementById("dog-info");

function fetchPups() {
    fetch("http://localhost:3000/pups")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        showAllPups(data)
        showPups(data)
    })
}

function showPups(data) {
    const filterBtn = document.getElementById("good-dog-filter");
    filterBtn.addEventListener("click", () => {
        if (filterBtn.textContent === "Filter good dogs: ON") {
            filterBtn.textContent = "Filter good dogs: OFF"
            resetBar()
            data.forEach(element => {
                const dogName = document.createElement("span");
                dogName.textContent = element.name;
                dogName.setAttribute("id", `${element.id}`);
                dogName.addEventListener("click", () => showPupsInfo(element))
                dogBar.appendChild(dogName);
            });
        } else {
            filterBtn.textContent = "Filter good dogs: ON"
            resetBar()
            data.forEach(element => {
                if (element.isGoodDog === true) {
                    const dogName = document.createElement("span");
                    dogName.textContent = element.name;
                    dogName.setAttribute("id", `${element.id}`);
                    dogName.addEventListener("click", () => showPupsInfo(element))
                    dogBar.appendChild(dogName);
                }
            })
        }
    })
}

function showAllPups(pupData) {
    pupData.forEach(element => {
        const dogName = document.createElement("span");
        dogName.textContent = element.name;
        dogName.setAttribute("id", `${element.id}`);
        dogName.addEventListener("click", () => showPupsInfo(element))
        dogBar.appendChild(dogName);
    });
}



function showPupsInfo(info) {
    //console.log(info)
    // Dog's image:
    const dogImg = document.createElement("img");
    dogImg.setAttribute("src", `${info.image}`);
    dogInfo.appendChild(dogImg);

    //Dog's name:
    const dogName = document.createElement("h2");
    dogName.textContent = info.name;
    dogInfo.appendChild(dogName);

    // Dog button:
    const dogBtn = document.createElement("button");
    dogBtn.setAttribute("id", "dogBtn");
    dogBtn.addEventListener("click", () => updateDogVal(info))

    // Is good dog?
    if (info.isGoodDog === true) {
        dogBtn.textContent = "Good Dog!";
        dogInfo.appendChild(dogBtn)
    } else {
        dogBtn.textContent = "Bad Dog!";
        dogInfo.appendChild(dogBtn)
    }

} 

function updateDogVal(info) {
    const dogBtn = document.getElementById("dogBtn");
    if (info.isGoodDog === true) {
        dogBtn.textContent = "Bad Dog!";
        info.isGoodDog = false;
    } else {
        dogBtn.textContent = "Good Dog!";
        info.isGoodDog = true;
    }
}

function resetBar() {
    dogBar.innerHTML = ""
}
