// console.log("js file attached");

// --sort button function
const sortedData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) =>
      displaAllData(data.data.tools.sort(sortByDate).slice(0, 6))
    );
};

const sortByDate = (a, b) => {
  const dateA = new Date(a.published_in);
  const dateB = new Date(b.published_in);
  if (dateA < dateB) return 1;
  else if (dateA > dateB) return -1;
  return 0;
};

document.getElementById("sort-data").addEventListener("click", function () {
  sortedData();
});

// ---functions for making data limits
const loadLimited = () => {
  loader(true);
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displaAllData(data.data.tools.slice(0, 6)));
};

const showAll = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displaAllData(data.data.tools));
};

// function for displaying data in UI
const displaAllData = (allData) => {
  const container = document.getElementById("card-container");
  container.innerHTML = "";
  allData.forEach((element) => {
    const innerContainer = document.createElement("div");
    innerContainer.innerHTML = `
      <div class="card card-compact p-3 bg-base-100 h-full shadow relative">
                           <figure><img class='rounded-xl' src="${
                             element.image
                           }" alt="Shoes" /></figure>
           <div class="card-body mb-16">
                         <h2 class="card-title font-bold">Features</h2>
                        <ol class='list-decimal pl-5'>
                            <li>${
                              element.features[0]
                                ? element.features[0]
                                : "And more"
                            }</li>
                            <li>${
                              element.features[1]
                                ? element.features[1]
                                : "And more"
                            }</li>
                        
                            <li>${
                              element.features[2]
                                ? element.features[2]
                                : "And more"
                            }</li>
                        </ol>
                    
             <div class=' absolute bottom-0 right-0 left-0 px-6 py-3'>        
                <div class="card-actions d-flex justify-between items-center border-t py-2">
                      <div>
                            <h1 class="text-xl font-bold">${element.name}</h1>
                             <p><i class="fa-solid fa-calendar-days"></i> ${
                               element.published_in
                             }</p>
                      </div>
                    <div>
                        <label onclick="cardDetail('${element.id}')" 
                            for="my-modal" class="rounded-full text-red-500 font-semibold bg-red-100 px-4 py-3 cursor-pointer"">
                            <i class="fa-solid fa-arrow-right"></i></label>
                    </div>
                </div>
            </div>
          </div>
       </div>
     
      `;
    container.appendChild(innerContainer);
  });
  loader(false); //spiner stopped------

  /*show all and show less button section */
  document.getElementById("show-all").addEventListener("click", function () {
    showAll();
    document.getElementById("show-all").classList.add("hidden");
    document.getElementById("show-less").classList.remove("hidden");
    document.getElementById("sort-data").setAttribute("disabled", "");
    document.getElementById("sort-data").classList.add("cursor-not-allowed");
  });
  document.getElementById("show-less").addEventListener("click", function () {
    loadLimited();
    document.getElementById("show-all").classList.remove("hidden");
    document.getElementById("show-less").classList.add("hidden");
    document.getElementById("sort-data").removeAttribute("disabled");
    document.getElementById("sort-data").classList.remove("cursor-not-allowed");
  });
};

// function for modal ----
const cardDetail = (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showCardDetail(data.data));
};
const modalContainer = document.getElementById("modal-info");
const showCardDetail = (modalData) => {
  modalContainer.innerHTML = "";
  const innerContainer = document.createElement("div");
  innerContainer.classList.add(
    "modal-box",
    "w-11/12",
    "max-w-5xl",
    "h-full",
    "lg:h-fit",
    "max-h-full",
    "lg:max-h-fit",
    "relative",
    "overflow-scroll",
    "lg:overflow-visible"
  );
  innerContainer.innerHTML = `
  
  <label for="my-modal" class="bg-red-500 text-white rounded-2xl px-3 py-2 font-bold  absolute right-0 lg:right-[-40px] top-0 lg:top-0 cursor-pointer">✕</label>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="border-2 border-red-300 rounded-lg p-5 bg-red-50">
                <p class="text-xl font-bold">
                    ${modalData.description}
                </p>
                <div class="flex flex-col lg:flex-row justify-between text-center gap-3 my-6">
                    <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                        <p>${
                          modalData.pricing ? modalData.pricing[0].plan : "Free"
                        }</p>
                        <p>${
                          modalData.pricing
                            ? modalData.pricing[0].price
                            : "Free of cost"
                        }</p>
                    </div>
                    <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                        <p>${
                          modalData.pricing ? modalData.pricing[1].plan : "Free"
                        }</p>
                        <p>${
                          modalData.pricing
                            ? modalData.pricing[1].price
                            : "Free of cost"
                        }</p>
                    </div>
                    <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                        <p>${
                          modalData.pricing ? modalData.pricing[2].plan : "Free"
                        }</p>
                        <p>${
                          modalData.pricing
                            ? modalData.pricing[2].price
                            : "Free of cost"
                        }</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h1 class="text-2xl font-bold p-2">Features</h1>
                        <ul class="list-disc pl-5 ">
                            <li> ${
                              modalData.features
                                ? modalData.features["1"].feature_name
                                : "No data found"
                            }</li>
                            <li>${
                              modalData.features
                                ? modalData.features["2"].feature_name
                                : "No data found"
                            }</li>
                            <li>${
                              modalData.features
                                ? modalData.features["3"].feature_name
                                : "No data found"
                            }</li>
                        </ul>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold p-2">integration</h1>
                        <p class="${
                          modalData.integrations ? "hidden" : "block"
                        }">No data found</p>

                        <ul class="list-disc pl-5  ${
                          modalData.integrations ? "block" : "hidden"
                        }">
                            <li>${
                              modalData.integrations
                                ? modalData.integrations[0]
                                : "No data found"
                            }</li>
                            <li>${
                              modalData.integrations
                                ? modalData.integrations[1]
                                : "No data found"
                            }</li>
                            <li>${
                              modalData.integrations
                                ? modalData.integrations[2]
                                : "No data found"
                            }</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="p-5 border rounded-lg text-center order-first lg:order-last">
               <div class="relative">
               <p id="accuracy" class="bg-red-600 rounded-lg px-3 py-1 text-white w-fit absolute top-1 right-1 ${
                 modalData.accuracy.score ? "block" : "hidden"
               }">
              ${modalData.accuracy.score * 100 + "% accuracy"}
              </p>
               <img class="rounded-xl" src="${
                 modalData.image_link[0]
                   ? modalData.image_link[0]
                   : modalData.image_link[1]
               }" alt="">
               </div>
                <h1 class="text-xl font-bold py-3">${
                  modalData.input_output_examples
                    ? modalData.input_output_examples[0].input
                    : "AI is in development"
                }</h1>
                <p>${
                  modalData.input_output_examples
                    ? modalData.input_output_examples[0].output
                    : " "
                }
                </p>
            </div>
        </div>

  
  `;

  modalContainer.appendChild(innerContainer);
};

// spinner function
const loader = (isLoading) => {
  if (isLoading) {
    document.getElementById("loader").classList.remove("hidden");
  } else {
    document.getElementById("loader").classList.add("hidden");
  }
};

loadLimited();
