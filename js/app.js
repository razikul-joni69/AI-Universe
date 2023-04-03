let dates = [];

const loadAiData = async (allData) => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();

    diaplayAiData(data.data.tools, allData);
    showAll(data.data.tools);
};
loadAiData(false);

// Load Ai Details By Id
const loadAiDetailsById = (id) => {
    if (id <= 9) {
        id = `0${id}`;
    }
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => showAiDetailsModal(data.data));
};

const diaplayAiData = (ais, allData) => {
    const aiContainer = document.getElementById("ai__container");
    // Show Spinner
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");

    // Show and Hide Show All Button
    const showAll = document.getElementById("show__all");
    if (allData === true) {
        aiContainer.innerHTML = "";
        showAll.classList.add("d-none");
    } else if (allData === false) {
        ais = ais.slice(0, 6);
        showAll.classList.remove("d-none");
    }

    ais?.forEach((ai) => {
        const aiDiv = document.createElement("div");
        aiDiv.classList.add("col");
        aiDiv.innerHTML = `
            <div class="card p-3 h-100">
                <img style="height: 250px; border-radius: 15px" src="${
                    ai.image
                }" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <ol>
                        ${loadInt(ai?.features)}
                    </ol>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <div><h5 class="card-title ">${ai.name}</h5>
                    <div class="text-body-secondary"
                        >
                        🗓
                        ${ai.published_in}</div
                    ></div>
                    <div onclick="loadAiDetailsById(${
                        ai.id
                    })" data-bs-toggle="modal" data-bs-target="#aiDetails" style="color: blue; font-size: 46px; cursor: pointer;"> ➡</div>
                </div>
            </div>
                        
                        
        `;
        aiContainer.appendChild(aiDiv);

        // Hideing Spinner
        spinner.classList.add("d-none");

        // Added Dates To An datesay
        for (let i = 0; i < 1; i++) {
            dates.push(ai.published_in);
        }
    });
};

// Show AI Details Modal
const showAiDetailsModal = (details) => {
    const detailsContainer = document.getElementById("modal__content");
    detailsContainer.innerHTML = "";
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("row");
    cardContainer.innerHTML = `
        <div style="background-color: #fef7f7" class="card p-3 me-4 border border-danger modal__card" class="col">
            <h5 class="card-title">
                    ${details.description}
            </h5>
            <div id="pricing__card" class="d-flex flex-wrap mt-3 mb-3">
            ${showPrice(details?.pricing)}
            </div>
            <div class="d-flex flex-wrap justify-content-around pt-2">
                <div>
                    <h2>Features</h2>
                    <ul>
                        ${showFeatures(details?.features)}
                    </ul>
                </div>
                <div id="integrations">
                    <h2>Integrations</h2>
                    <ul>
                        ${loadInt(details?.integrations)}
                    </ul>
                </div>
            </div>
        </div>

        <div class="card p-3 modal__card col">
            <img
                src="${details.image_link[0]}"
                class="card-img-top"
                alt="..."
            />
            ${
                details?.accuracy?.score == null
                    ? ""
                    : `<button
                        id="accuracy__button"
                        type="button"
                        class="btn btn-danger"
                    >
                        ${details?.accuracy?.score} accuracy
                    </button>`
            }
            ${
                details?.input_output_examples == null
                    ? `<div class="text-danger text-center fw-bold pt-2">No Data Found</div>`
                    : `
                    <div class="card-body text-center">
                        <h5 class="card-title">
                            ${details?.input_output_examples[0]?.input}
                        </h5>
                        <p class="card-text">
                            ${details?.input_output_examples[0]?.output}
                        </p>
                    </div>
                `
            }
        </div>
        
    `;
    detailsContainer.appendChild(cardContainer);
};

// Load Features and Integrations
function loadInt(int) {
    let p = "";
    if (int == null) {
        p += `<p class="text-danger">No Data Found</p>`;
    }
    for (let i = 0; i < int?.length; i++) {
        p += `<li>${int[i]}</li>`;
    }
    return p;
}

// Show Modal Details Features
const showFeatures = (features) => {
    let p = "";
    for (const feature in features) {
        p += `<li>${features[feature].feature_name}</li>`;
    }
    return p;
};

// Showing Price
const showPrice = (prices) => {
    let p = "";
    if (prices == null) {
        p += `<div style="background-color: white" class="p-3 fw-bold m-1 text-danger">Free of Cost.</div>`;
    }
    prices?.forEach((price) => {
        p += `
                <div style="background-color: white" class="p-3 fw-bold m-1">${price.price} 
                <span class="text-danger">${price.plan} </span></div>
            `;
    });
    return p;
};

//! TODO: Fix sort by date
// Sort By Date
document.getElementById("sort__by__date").addEventListener("click", () => {
    dates.sort(function (a, b) {
        var da = new Date(a).getTime();
        var db = new Date(b).getTime();

        return da < db ? -1 : da > db ? 1 : 0;
    });
    console.log(dates);
});

// Show All Button Functionality
const showAll = (data) => {
    document
        .getElementById("show__all__button")
        .addEventListener("click", () => {
            diaplayAiData(data, true);
        });
};
