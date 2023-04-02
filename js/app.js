const loadAiData = () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(url)
        .then((res) => res.json())
        .then((data) => diaplayAiData(data.data.tools));
};

const diaplayAiData = (ais) => {
    const aiContainer = document.getElementById("ai__container");
    ais.forEach((ai) => {
        const aiDiv = document.createElement("div");
        aiDiv.classList.add("col");
        aiDiv.innerHTML = `
            <div class="card h-100">
                            <img src="${
                                ai.image
                            }" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Features</h5>
                                <p id="ai__features" class="card-text">
                                    ${ai.features.forEach((feature) => {
                                        const featuresContainer =
                                            document.getElementById(
                                                "ai__features"
                                            );
                                        const singleAiFeatures =
                                            document.createElement("ul");
                                        singleAiFeatures.innerHTML = `
                                                <li>
                                                    ${feature}
                                                </li>
                                            `;
                                        featuresContainer.appendChild(
                                            singleAiFeatures
                                        );
                                    })}
                                </p>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary"
                                    >Last updated 3 mins ago</small
                                >
                            </div>
                        </div>
        `;
        aiContainer.appendChild(aiDiv);
    });
};

loadAiData();
