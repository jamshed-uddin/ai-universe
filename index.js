console.log("js file attached");

const showCard = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};

const displayData = (data) => {
  const container = document.getElementById("card-container");
  console.log(container);
  data.slice(0, 6).forEach((element) => {
    const innerContainer = document.createElement("div");
    innerContainer.innerHTML = `
      <div class="card card-compact p-3 bg-base-100 h-full shadow relative">
                           <figure><img src="${element.image}" alt="Shoes" /></figure>
           <div class="card-body mb-16">
                     <h2 class="card-title font-bold">Features</h2>
                     <ol class='list-decimal'>
                     <li>${element.features[0]}</li>
                     <li>${element.features[1]}</li>
                     <li>${element.features[2]}</li>
                     </ol>
                    
             <div class=' absolute bottom-0 right-0 left-0 p-3'>        
                <div class="card-actions d-flex justify-between border-t py-2">
                      <div>
                            <h1 class="text-xl font-bold">${element.name}</h1>
                             12/12/12
                      </div>
                      <div>
                             <button class="rounded-full text-red-500  bg-red-100 px-4 py-3"><i
                             class="fa-solid fa-arrow-right"></i></button>
                      </div>
                </div>
            </div>
          </div>
       </div>
     
      `;

    container.appendChild(innerContainer);
  });
};

showCard();
