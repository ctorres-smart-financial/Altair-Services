let htmlFileAnchor = document.getElementsByClassName("htmlFileAnchor");
let placeholders = document.getElementsByClassName("placeholder");

// NAV
let navLink = document.getElementsByClassName("nav-link");

// LATEST REPORT
let iconLatestReport = document.querySelector(".icon-lr")
let namelatestReport = document.getElementById("namelatestReport");
let dateLatestReport = document.getElementById("dateLatestReport");
let testsLastReport = document.getElementById("testsLastReport");
let failuresLastReport = document.getElementById("failuresLastReport");
let errorsLastReport = document.getElementById("errorsLastReport");
let statusLastReport = document.getElementById("statusLastReport");
let timeLastReport = document.getElementById("timeLastReport");

// CARD
let containerLastReport = document.getElementById("lr-container");
let headerLastReport = document.getElementById("lr-header");

// REPORT LIST
let reportsList = document.querySelector(".reports-list");

// HTML
fetch('last-file')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            loadFailure();
            throw new Error(`Error al obtener el último archivo. Código de estado: ${response.status}`);
        }
    })
    .then(data => {
        // console.log(data);
        if ("error" in data ) {
            console.error(data.error);
        } else {
            namelatestReport.innerText = data.fileName;
            dateLatestReport.innerText = data.fileDate;
            //console.log(data.htmlFilePath);
            for (let i = 0; i < htmlFileAnchor.length; i++) {
                htmlFileAnchor[i].setAttribute("href", data.htmlFilePath);
            }


            // XML
            fetch(data.xmlFilePath)
                .then(response => {
                    if (!response.ok) {
                        loadFailure();
                        throw new Error('Ha ocurrido un error cargando un archivo.');
                    }
                    return response.text();
                })
                .then(xmlContent => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
                    //console.log(xmlDoc);
                    const testsuite = xmlDoc.getElementsByTagName('testsuite');
                    const testsuites = xmlDoc.getElementsByTagName('testsuites');

                    let failuresCount = 0;
                    let errorsCount = 0;
                    for (let i = 0; i < testsuite.length; i++) {
                        const failureIterator = parseInt(testsuite[i].getAttribute("failures").toString());
                        const errorIterator = parseInt(testsuite[i].getAttribute("errors").toString());
                        failuresCount += failureIterator;
                        errorsCount += errorIterator;
                    }
                    testsLastReport.innerText = testsuites[0].getAttribute("tests").toString();
                    failuresLastReport.innerText = failuresCount.toString();
                    errorsLastReport.innerText = errorsCount.toString();
                    timeLastReport.innerText = testsuites[0].getAttribute("time").toString();
                    if (failuresCount <= 3 && errorsCount === 0) {
                        statusLastReport.innerText = "Funcionando";
                        iconLatestReport.setAttribute("src", "assets/icons/check-circle-fill.svg");
                        containerLastReport.classList.add("border-success");
                        headerLastReport.classList.add("text-bg-success");
                        for (let i = 0; i < htmlFileAnchor.length; i++) {
                            htmlFileAnchor[i].classList.add("text-bg-success")
                            navLink[i].classList.add("btn-success");
                        }
                    } else if (failuresCount > 3 && failuresCount <= 10 && errorsCount === 0) {
                        statusLastReport.innerText = "Con Algunos Defectos";
                        iconLatestReport.setAttribute("src", "assets/icons/exclamation-circle-fill.svg");
                        containerLastReport.classList.add("border-warning");
                        headerLastReport.classList.add("text-bg-warning")
                        for (let i = 0; i < htmlFileAnchor.length; i++) {
                            htmlFileAnchor[i].classList.add("text-bg-warning")
                            navLink[i].classList.add("btn-warning")
                        }
                    } else {
                        statusLastReport.innerText = "Fallando";
                        iconLatestReport.setAttribute("src", "assets/icons/exclamation-circle-fill.svg")
                        containerLastReport.classList.add("border-danger")
                        headerLastReport.classList.add("text-bg-danger")
                        for (let i = 0; i < htmlFileAnchor.length; i++) {
                            htmlFileAnchor[i].classList.add("text-bg-danger")
                            navLink[i].classList.add("btn-danger");
                        }
                    }
                }).catch(error => {
                console.error('Error al cargar el archivo XML:', error);
            });
        }
    })

// HTML
fetch('/all-files')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error al obtener la lista de archivos. Código de estado: ${response.status}`);
        }
    })
    .then(data => {
        data.slice(0, 10).forEach((fileInfo, index) => {
                const listItem = document.createElement('li');
                listItem.className = "list-group-item d-flex justify-content-between px-3 mx-4 report-item";
                listItem.innerHTML = `
                <div class="me-auto">
                    <div class="fw-bold">Reporte #${index + 1}</div>
                    <p class="m-0">${fileInfo.fileDate}</p>
                </div>
                <a class="text-dark text-decoration-underline h-25" href="${fileInfo.filePath}" target="_blank">${fileInfo.fileName}</a>
                `;
            reportsList.appendChild(listItem);
        });
    })

function loadFailure() {
    for (let i = 0; i < htmlFileAnchor.length; i++) {
        htmlFileAnchor[i].classList.add("d-none");
        dateLatestReport.classList.add("d-none");
        timeLastReport.innerText = "0";
        failuresLastReport.innerText = "0";
        errorsLastReport.innerText = "0";
        testsLastReport.innerText = "0";
        loadingIcon.classList.add("spinner-border");
    }
    setTimeout(() => {
        window.location.reload();
    }, 5000)
}
