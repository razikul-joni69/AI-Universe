const loadAiData = () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(url)
        .then((res) => res.json())
        .then((data) => diaplayAiData(data.data.tools));
};

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

const diaplayAiData = (ais) => {
    const aiContainer = document.getElementById("ai__container");
    ais.forEach((ai) => {
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
    });
};

// Show AI Details Modal
const showAiDetailsModal = (details) => {
    // console.log(details);
    const detailsContainer = document.getElementById("modal__content");
    detailsContainer.innerHTML = "";
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("d-flex");
    cardContainer.innerHTML = `
        <div style="background-color: #fef7f7" class="card p-3 me-4">
            <h5 class="card-title">
                    ${details.description}
            </h5>
            <div class="d-flex" > ${showPrice(details?.pricing)}
            </div>
            <div class="d-flex justify-content-around pt-2">
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

        <div class="card p-3">
            <img
                src="${details.image_link[0]}"
                class="card-img-top"
                alt="..."
            />
            ${
                details?.accuracy?.score &&
                `<button
                        id="accuracy__button"
                        type="button"
                        class="btn btn-danger"
                    >
                        ${details?.accuracy?.score} accuracy
                    </button>`
            }
            <div class="card-body text-center">
                <h5 class="card-title">
                    ${details.tool_name}
                </h5>
                <p class="card-text">
                    ${details.description}
                </p>
            </div>
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
        p += `<div style="background-color: white" class="p-3 fw-bold m-1">${price.price} <span class="text-danger">${price.plan} </span></div>`;
    });
    return p;
};

loadAiData();
